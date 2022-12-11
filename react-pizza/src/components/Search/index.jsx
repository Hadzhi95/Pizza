import React from 'react'
import {setSearchValue} from '../../redux/slices/filterSlice'
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App'
import styles from './search.module.scss'
import { useDispatch } from 'react-redux'

// const Search = ({searchValue, setSearchValue}) => {было до контекста
const Search = () => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState()
    const inputRef = React.useRef()

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 250), []
    )
        const onChangeInput = (event) => {
            setValue(event.target.value)
            updateSearchValue(event.target.value)
        }


    return (
        <div className={styles.root}>
            <svg className={styles.icon} enableBackground="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M9,4c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S6.2,4,9,4 M9,2C5.1,2,2,5.1,2,9c0,3.9,3.1,7,7,7s7-3.1,7-7C16,5.1,12.9,2,9,2    L9,2z" /></g></g><g><polygon points="22,20.3 20.3,22 14,15.7 14,14 15.7,14  " /><rect height="3.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.9741 14.4227)" width="1.2" x="13.8" y="12.6" /></g></svg>
            <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder='Поиск пиццы ...' />

            {value && (<svg onClick={onClickClear} className={styles.clearIcon} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>)}
        </div>
    )
}



export default Search

