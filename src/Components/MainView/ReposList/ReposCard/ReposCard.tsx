import c from "./ReposCard.module.css"
import {ReactComponent as ForkIcon} from '../../../../Pictures/source-fork.svg'
import {ReactComponent as StarIcon} from '../../../../Pictures/star.svg'
import Counter from '../../Counter/Counter'

interface Props {
    reposName: string
    reposForks: number
    reposStars: number
}

const ReposCard = (props:Props) => {
    return (
        <li className={c.reposCard}>
            <p className={c.reposName}>{props.reposName}</p>
            <div className={c.reposStats}>
                <Counter title="Forks" icon={() => {return <ForkIcon></ForkIcon>}} count={props.reposForks}/>
                <Counter title="Stars" icon={() => {return <StarIcon></StarIcon>}} count={props.reposStars}/>
            </div>
        </li>
    )
}
export default ReposCard