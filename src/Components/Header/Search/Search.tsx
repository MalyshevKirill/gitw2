import c from "./Seach.module.css"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import SearchedUser from "./SearchedUser/SearchedUser"
import { token } from "../../../Scripts/Token"
import debounce from "lodash.debounce"
import { RequestStatus } from "../../../App"
import { isNumber } from "lodash"

interface Props {
    setRequestStatus: React.Dispatch<RequestStatus>
    CheckGitAcc(userGitName: string): void
}

interface SearchData{
    text: string, 
    count: number
}

const Search = (props: Props) => {
    const InputRef = useRef<HTMLInputElement>(null)
    const [userGitSearchList, setUserGitSearchList] = useState<Array<any>>([])
    const [searchStatus, setSearchStatus] = useState<boolean>(false)
    const [currentFocus, setCurrentFocus] = useState<number>(-1)
    const [searchData, setSearchData] = useState<SearchData>({
        text: "",
        count: 10
    }) 

    const Search = (userName: string, count: number) => {
        if (userName !== "" && !isNaN(count)) {
            fetch("https://api.github.com/search/users?&per_page=" + count + "&order=desc&q=" + userName, {
                method: 'GET',
                headers: new Headers({
                    "Authorization": token,
                })
            })
            .then(responce => {
                if (responce.status !== 200) {
                    responce.status === 403 ? props.setRequestStatus({ code: responce.status, text: "API limit" }):
                    props.setRequestStatus({ code: responce.status, text: responce.statusText })
                    return null
                } else {
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
        debounce((value:string, count:number) => Search(value, count), 700),
    [])

    const handleKeyDown = useCallback(
      e => {
        if (e.key === "ArrowDown") {
          e.preventDefault()    
          setCurrentFocus(currentFocus === userGitSearchList.length - 1 ? -1 : currentFocus + 1)
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setCurrentFocus(currentFocus < 0 ? userGitSearchList.length - 1 : currentFocus - 1)
        }
      },
      [userGitSearchList.length, currentFocus, setCurrentFocus]
    )

    useEffect(() => {
        if(currentFocus===-1) {
            InputRef.current?.focus()
        }
    }, [currentFocus])
  
    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown, false)
      return () => {
        document.removeEventListener("keydown", handleKeyDown, false)
      };
    }, [handleKeyDown])

    useEffect(() => {
        debouncedSave(searchData.text, searchData.count)
    },[searchData, debouncedSave])

    const handleChangeCount = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(Number(e.target.value) < 100 || e.target.value === "") {
            setSearchData({text:searchData.text, count: Number(e.target.value)})
            console.log(searchData.count)

        }  
    }

    return (
        <div className="search">
            <input
                ref={InputRef}
                type="text"
                tabIndex={2}
                className={c.userGitName_input}
                placeholder="Type username"
                id="userGitNameInput"
                onClick={() => setCurrentFocus(-1)}
                onFocus={() => setSearchStatus(true)}
                onChange={(e) => setSearchData({text: e.target.value, count: searchData.count})}
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
            <input 
                className={c.userCountInput}
                type="number"
                min="0"
                max="99"
                autoComplete="off"
                value={Number(searchData.count)}
                onChange={(e) => handleChangeCount(e)}
            />
        </div>
    )
}
export default Search
