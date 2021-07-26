import c from './MainView.module.css'
import UserInfo from './UserInfo/UserInfo'
import ReposList from './ReposList/ReposList'

interface Props {
    userInfo: any
    userReposList: Array<any>
}

const MainView = (props:Props) => {
    return(
        <main className={c.main}>
            <UserInfo userInfo={props.userInfo}></UserInfo>
            <ReposList userReposList={props.userReposList}></ReposList>
        </main>
    )
}
export default MainView