import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function MainLayout() {
  return (
    <div>
        <Navbar />
        <div>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default MainLayout