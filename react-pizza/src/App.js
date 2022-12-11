import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss'

// export const SearchContext = React.createContext();
// console.log(SearchContext);


function App() {
  // const [searchValue, setSearchValue] = React.useState('')


  return (
    <div className="wrapper">
        {/* <Header value={searchValue} searchValue={searchValue} setSearchValue={setSearchValue} /> было до контекста */}
        <Header />
        <div className="content">

          <Routes>
            {/* <Route path='/' element={<Home searchValue={searchValue} />} /> было до контекста */}
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          {/* <Home/> */}
          {/* <NotFound/> */}
        </div>
    </div>
  );
}

export default App;
