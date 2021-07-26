import c from './SearchedUser.module.css'

interface Props {
    user: any
    CheckGitAcc(userGitName:string): void
    setSearchStatus: React.Dispatch<boolean>
}

const SearchedUser = (props:Props) => {
    return(
        <div className={c.searchedUser} onClick={() => {props.CheckGitAcc(props.user.login); props.setSearchStatus(false)}}>{props.user.login}</div>
    )
}
export default SearchedUser