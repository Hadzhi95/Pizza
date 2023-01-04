import React from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

// import Categories from '../components/Categories';
// import Pagination from '../components/Pagination';
// import PizzaBlock from '../components/PizzaBlock';
// import Skeleton from '../components/PizzaBlock/Skeleton';
// import Sort from '../components/Sort';

import {Categories, Pagination, PizzaBlock, Skeleton, Sort} from '../components'

import { sortList } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

// function Home({ searchValue }) было до контекста {
const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    // const categoryId = useSelector(state => state.filter.categoryId)
    // const sortType = useSelector(state => state.filter.sort.sortProperty)


    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    // const { categoryId, sort, currentPage } = useSelector((state) => state.filter) было до создания селекторов в редаксе
    // const { items, status } = useSelector((state) => state.pizza) было до создания селекторов в редаксе
    const { items, status } = useSelector(selectPizzaData)


    // const [items, setItems] = React.useState([])
    // const [isLoading, setIsLoading] = React.useState(true) было до тулкит
    // const [categoryId, setCategoryId] = React.useState(0) было до тулкит
    // const [currentPage, setCurrentPage] = React.useState(1) было до тулкит


    // const [sortType, setSortType] = React.useState({
    //     name: 'популярности', 
    //     sortProperty: 'rating'
    // }) было до тулкит

    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        // const order = sortType.sortProperty.includes('-' ? 'asc' : 'desc') было до тулкит
        // const sortBy = sortType.sortProperty.replace('-', '') было до тулкит
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        // fetch(`https://6329d2b14c626ff832cb763a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then((res) => res.json())
        //     .then((arr) => setItems(arr))
        // setIsLoading(false) было до аксиоса

        // axios
        //     .get(`https://6329d2b14c626ff832cb763a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then((res) => {
        //         setItems(res.data)
        //         setIsLoading(false)
        //     }) до асинк эвейта

        dispatch(
            // {@ts-ignore}//
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
    // если изменили параметры и был первый рендер
    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const params = {
    //             categoryId: categoryId > 0 ? categoryId : null,
    //             sortProperty: sort.sortProperty,
    //             currentPage
    //         }
    //         const queryString = qs.stringify(params, { skipNulls: true })
    //         navigate(`?${queryString}`)
    //     }
    //     if(!window.location.search) {
    //         dispatch(fetchPizzas({}as SearchPizzaParams))
    //     }

    // }, [categoryId, sort.sortProperty, searchValue, currentPage])


    // если был первый рендер то проверяем URL - парматеры и сохраняем в редуксе
    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
    //         const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)

    //         dispatch(
    //             setFilters({
    //                 searchValue: params.search,
    //                 categoryId:Number( params.category),
    //                 currentPage: Number(params.currentPage),
    //                 sort: sort ||sortList[0]
    //             }))
    //         isSearch.current = true
    //     }
    // }, [])

    // если был первый рендер то запрашиваем пиццы
    React.useEffect(() => {
        getPizzas()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])






    const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)


    return (
        <div className="container">
            <div className="content__top">
                {/* <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} /> */}
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />

                {/* <Sort value={sortType} onChangeSort={(id) => setSortType(id)} /> */}
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

            {/*             
                    // items.map((obj) => isLoading? <Skeleton/> :<PizzaBlock key={obj.id} {...obj}
                    // title={obj.title} 
                    // price={obj.price} 
                    // imageUrl={obj.imageUrl} 
                    // sizes={obj.sizes}
                    // types={obj.types}
                    // />) */}


            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home
