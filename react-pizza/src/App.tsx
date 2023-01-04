import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


import './scss/app.scss'

// export const SearchContext = React.createContext();
// console.log(SearchContext);


function App() {
  // const [searchValue, setSearchValue] = React.useState('')
  const [value, setValue] = React.useState(0)

  React.useLayoutEffect(() => {
    if(value === 0){
      setValue(Math.random() * 99 + 99)
    }
  },[value])


  return (
        // {/* <Header value={searchValue} searchValue={searchValue} setSearchValue={setSearchValue} /> было до контекста */}
        // {/* <Route path='/' element={<Home searchValue={searchValue} />} /> было до контекста */}
        <>

            <div onClick={() => setValue(0)}> value: {value}</div>
          <Routes>
            <Route path='/' element={<MainLayout/>}>
            <Route path='' element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='pizza/:id' element={<FullPizza />} />
            <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
          </>
          // {/* <Home/> */} 
          // {/* <NotFound/> */} 
        
  )
}

export default App;
