import c from "./Seach.module.css"
import { useState } from "react"
import SearchedUser from "./SearchedUser/SearchedUser"
import { token } from "../../../Scripts/Token"
import { RequestStatus } from "../../../App"

interface Props {
    setRequestStatus: React.Dispatch<RequestStatus>
    CheckGitAcc(userGitName:string): void
}

const Search = (props:Props) => {
    const [userGitSearchList, setUserGitSearchList] = useState<Array<any>>([])
    const [searchStatus, setSearchStatus] = useState<boolean>(false)

    const Search = (userName: string) => {
        fetch("https://api.github.com/search/users?&per_page=10&order=desc&q=" + userName, {
            method:'GET',
            headers: new Headers({
                "Authorization": token,
            })
        })
        .then(responce => {            
            if(responce.status!==200) {
                responce.status===403?props.setRequestStatus({code: responce.status, text: "API limit"}):
                props.setRequestStatus({code: responce.status, text: responce.statusText})
                return null
            } else {
                return responce.json()
            }
        })
        .then(result => {
            if(result !== null) {
                setUserGitSearchList(result.items)
            } else {
                setUserGitSearchList([])
            }
        })
    }

    return (
        <div className="search">
                <input
                    type="text"
                    className={c.userGitName_input}
                    placeholder="Type username"
                    id="userGitNameInput"
                    onFocus={() => setSearchStatus(true)}
                    onChange={e => {
                        Search(e.target.value)
                    }}
                    autoComplete="off"
                />
                <ul className={c.userList}>
                    {userGitSearchList.length!==0&&searchStatus===true&&
                        userGitSearchList.map((value, idx)=>{
                            return <SearchedUser key={idx} user={value} setSearchStatus={setSearchStatus} CheckGitAcc={props.CheckGitAcc}></SearchedUser>
                        })
                    }
                </ul>
            </div>
    )
}
export default Search