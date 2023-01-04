import React, {Suspense} from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
// import Cart from './pages/Cart';
// import FullPizza from './pages/FullPizza';
// import NotFound from './pages/NotFound';

import './scss/app.scss'
const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart'*/'./pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: 'FullPizza'*/'./pages/FullPizza'));
const NotFound = React.lazy(() => import(/*webpackChunkName: 'NotFound'*/'./pages/NotFound'));

// export const SearchContext = React.createContext();
// console.log(SearchContext);


function App() {
  // const [searchValue, setSearchValue] = React.useState('')
  const [value, setValue] = React.useState(0)

  React.useLayoutEffect(() => {
    if (value === 0) {
      setValue(Math.random() * 99 + 99)
    }
  }, [value])


  return (
    // {/* <Header value={searchValue} searchValue={searchValue} setSearchValue={setSearchValue} /> было до контекста */}
    // {/* <Route path='/' element={<Home searchValue={searchValue} />} /> было до контекста */}
    <>

      <div onClick={() => setValue(0)}> value: {value}</div>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='cart' element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart/>
            </Suspense>} />
          <Route path='pizza/:id' element={<Suspense fallback={<div>Идет загрузка...</div>}>
              <FullPizza/>
            </Suspense>} />
          <Route path='*' element={<Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound/>
            </Suspense>} />
        </Route>
      </Routes>
    </>
    // {/* <Home/> */} 
    // {/* <NotFound/> */} 

  )
}

export default App;
