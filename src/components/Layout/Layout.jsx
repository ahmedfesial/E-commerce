import React from 'react'
const Navbar = React.lazy(()=> import('../Navbar/Navbar'))
const Footer = React.lazy(()=> import('../Footer/Footer'))
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
  <div className='flex flex-col'>

  <Navbar/>
  <div className='w-[90%] mx-auto  py-4'>
    <Outlet></Outlet>
  </div>
  <Footer/>

  </div>

  </>
}
