import c from "./Seach.module.css"
import { useCallback, useEffect, useMemo, useState } from "react"
import SearchedUser from "./SearchedUser/SearchedUser"
import { token } from "../../../Scripts/Token"
import debounce from "lodash.debounce"
import { RequestStatus } from "../../../App"

interface Props {
    setRequestStatus: React.Dispatch<RequestStatus>
    CheckGitAcc(userGitName: string): void
}

const Search = (props: Props) => {
    const [userGitSearchList, setUserGitSearchList] = useState<Array<any>>([])
    const [searchStatus, setSearchStatus] = useState<boolean>(false)
    const [currentFocus, setCurrentFocus] = useState<number>(-1);

    const Search = (userName: string) => {
            if (userName !== "") {
                fetch("https://api.github.com/search/users?&per_page=10&order=desc&q=" + userName, {
                    method: 'GET',
                    headers: new Headers({
                        "Authorization": token,
                    })
                })
                    .then(responce => {
                        if (responce.status !== 200) {
                            responce.status === 403 ? props.setRequestStatus({ code: responce.status, text: "API limit" }) :
                                props.setRequestStatus({ code: responce.status, text: responce.statusText })
                            return null
                        } else {
                            props.setRequestStatus({ code: 0, text: "" })
                            return responce.json()
                        }
                    })
                    .then(result => {
                        if (result !== null) {
                            setUserGitSearchList(result.items)
                        } else {
                            setUserGitSearchList([])
                        }
                    })
            } else {
                setUserGitSearchList([])
            }
        }
    
    const debouncedSave = useMemo(() => 
        debounce(value => Search(value), 700),
    [])

    const handleKeyDown = useCallback(
      e => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setCurrentFocus(currentFocus === userGitSearchList.length - 1 ? 0 : currentFocus + 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setCurrentFocus(currentFocus === 0 ? userGitSearchList.length - 1 : currentFocus - 1);
        }
      },
      [userGitSearchList.length, currentFocus, setCurrentFocus]
    )
  
    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown, false);
      return () => {
        document.removeEventListener("keydown", handleKeyDown, false);
      };
    }, [handleKeyDown]);

    return (
        <div className="search">
            <input
                type="text"
                tabIndex={2}
                className={c.userGitName_input}
                placeholder="Type username"
                id="userGitNameInput"
                onClick={() => setCurrentFocus(-1)}
                onFocus={() => setSearchStatus(true)}
                onChange={e => debouncedSave(e.target.value)}
                autoComplete="off"
            />
            <ul className={c.userList}>
                {userGitSearchList.length !== 0 && searchStatus === true &&
                    userGitSearchList.map((value, idx) => {
                        return <SearchedUser 
                            key={idx} 
                            index={idx}
                            user={value} 
                            setFocus={handleKeyDown} 
                            searchStatus={searchStatus}
                            setSearchStatus={setSearchStatus} 
                            CheckGitAcc={props.CheckGitAcc} 
                            active={idx===currentFocus}
                            setCurrentFocus={setCurrentFocus}
                        />
                    })
                }
            </ul>
        </div>
    )
}
export default Search
