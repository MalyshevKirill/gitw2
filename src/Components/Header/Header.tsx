import c from './Header.module.css'
import {RequestStatus} from '../../App'
import Search from './Search/Search'


interface Props {
    requestStatus: RequestStatus
    setRequestStatus: React.Dispatch<RequestStatus>
    loadingStatus: boolean
    CheckGitAcc: (userGitName:string) => void
}

const Header = (props:Props) => {
    return(
        <header className={c.header}>
            <Search setRequestStatus={props.setRequestStatus} CheckGitAcc={props.CheckGitAcc}/>
            {props.loadingStatus&&<p className={c.userGitLoadingStatus}>Loading...</p>}
            {props.requestStatus.code!==200&&<p className={c.userGitLoadingStatus}>{props.requestStatus.text}</p>}
        </header>
    )
}
export default Header