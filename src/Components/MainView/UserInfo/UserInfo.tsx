import c from './UserInfo.module.css'
import {ReactComponent as StarIcon} from '../../../Pictures/star.svg'
import {ReactComponent as RepositoryIcon} from '../../../Pictures/source-repository.svg'
import {ReactComponent as AccountIcon} from '../../../Pictures/account-multiple.svg'
import Counter from '../Counter/Counter'

interface Props {
    userInfo:any
}

const userInfo = (props:Props) => {
    return (
        <div className={c.userInfo}>
            <div className={c.userInfo_mainInfo}>
                <img className={c.userInfo_image} src={props.userInfo.avatar_url} alt="" />
                <span className={c.userInfo_name}>{props.userInfo.name}</span>
                <span className={c.userInfo_login}>{"@"+props.userInfo.login}</span>
            </div>
            <div className={c.userInfo_scores}>
                <Counter title="Repos count" icon={() => {return <RepositoryIcon></RepositoryIcon>}} count={props.userInfo.public_repos}></Counter>
                <Counter title="followers" icon={() => {return <StarIcon></StarIcon>}} count={props.userInfo.followers}></Counter>
                <Counter title="following" icon={() => {return <AccountIcon></AccountIcon>}} count={props.userInfo.following}></Counter>
            </div>
        </div>
    )
}
export default userInfo