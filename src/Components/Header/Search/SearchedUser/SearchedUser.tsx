import { useCallback, useEffect, useRef } from 'react'
import c from './SearchedUser.module.css'

interface Props {
    index: number
    user: any
    active: boolean
    searchStatus: boolean
    CheckGitAcc: (userGitName:string) => void
    setFocus: (e: any) => void
    setCurrentFocus: React.Dispatch<number>
    setSearchStatus: React.Dispatch<boolean>
}

const SearchedUser = (props:Props) => {
    const ref = useRef<HTMLLIElement>(null)

    useEffect(() => {
        if(props.active) {
            ref.current?.focus()
        }
    },[props.active])

    const handleKeyPress = (e:React.KeyboardEvent) => {
        handleSelect()
        if (e.key === "Enter" ) {
            props.CheckGitAcc(props.user.login)
            props.setCurrentFocus(-1)
            props.setSearchStatus(false)
        }
    }
    
    const handleClick = (e:React.MouseEvent) => {
        props.CheckGitAcc(props.user.login)
        props.setCurrentFocus(-1)
        props.setSearchStatus(false)
    }

    const handleSelect = useCallback(() => {
        props.setFocus(props.index)
      }, [props]);

    return (
        <li ref={ref} 
            role="button"
            className={c.searchedUser} 
            tabIndex={props.active?0:-1} 
            onKeyPress={e => handleKeyPress(e)} 
            onClick={handleClick}>
                {props.user.login}
        </li>
    )
}
export default SearchedUser
