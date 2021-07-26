import c from './Counter.module.css'

interface Props {
    icon: any
    count: number
    title: string
}

const Counter = (props:Props) => {
    return(
        <div className={c.counter} title={props.title}>
            {props.icon()}
            {props.count}
        </div>
    )
}
export default Counter