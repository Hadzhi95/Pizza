import React from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios'

import ReactPaginate from 'react-paginate';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

// function Home({ searchValue }) было до контекста {
function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    // const categoryId = useSelector(state => state.filter.categoryId)
    // const sortType = useSelector(state => state.filter.sort.sortProperty)


    const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
    const items = useSelector((state) => state.pizza.items)




    const { searchValue, setSearchValue } = React.useContext(SearchContext)
    // const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    // const [categoryId, setCategoryId] = React.useState(0) было до тулкит
    // const [currentPage, setCurrentPage] = React.useState(1) было до тулкит


    // const [sortType, setSortType] = React.useState({
    //     name: 'популярности', 
    //     sortProperty: 'rating'
    // }) было до тулкит

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        setIsLoading(true)
        // const order = sortType.sortProperty.includes('-' ? 'asc' : 'desc') было до тулкит
        // const sortBy = sortType.sortProperty.replace('-', '') было до тулкит
        const order = sort.sortProperty.includes('-' ? 'asc' : 'desc')
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

        try {
            dispatch(
                fetchPizzas({
                    sortBy,
                    order,
                    category,
                    search,
                    currentPage
                })
            )
            
        } catch(error) {
            setIsLoading(false)
            alert("Ошибка при получении пицц")
        }finally{
            setIsLoading(false)
        }
        
    }
    // если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort, searchValue, currentPage])


    // если был первый рендер то проверяем URL - парматеры и сохраняем в редуксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }))
            isSearch.current = true
        }
    }, [])

    // если был первый рендер то запрашиваем пиццы
    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
        window.scrollTo(0, 0)
    }, [categoryId, sort, searchValue, currentPage])






    const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)


    return (
        <div className="container">
            <div className="content__top">
                {/* <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} /> */}
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />

                {/* <Sort value={sortType} onChangeSort={(id) => setSortType(id)} /> */}
                <Sort />

            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? sceletons
                        : pizzas
                    // items.map((obj) => isLoading? <Skeleton/> :<PizzaBlock key={obj.id} {...obj}
                    // title={obj.title} 
                    // price={obj.price} 
                    // imageUrl={obj.imageUrl} 
                    // sizes={obj.sizes}
                    // types={obj.types}
                    // />)
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home
