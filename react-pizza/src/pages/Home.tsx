import React from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Categories, Pagination, PizzaBlock, Skeleton, Sort } from '../components'

import { sortList } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)
    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage)
            })
        )
        window.scrollTo(0, 0)
    }

    React.useEffect(() => {
        getPizzas()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />

            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? <div className='content__error-info'>
                <h2>Произошла Ошибка 😕</h2>
                <p>К сожалению, Не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
            </div> :
                (<div className="content__items">
                    {status === 'loading'
                        ? sceletons
                        : pizzas}
                </div>)}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home
