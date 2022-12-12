import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import '../scss/app.scss'



function MainLayout() {
  return (
    <div className='wrapper'>
      <Header/>
      <div className='content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
