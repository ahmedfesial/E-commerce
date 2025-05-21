import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Logout from './components/Logout/Logout'
import NotFound from './components/NotFound/NotFound'
import UseeContextProvider from './Context/UserContext'
import ProductRoute from './components/ProductRoute/ProductRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Categories from './components/Categories/Categories'
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './components/CheckOut/CheckOut'
import Orders from './components/Orders/Orders'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyReset from './components/VerifyReset/VerifyReset'
import ResetPassword from './components/ResetPassword/ResetPassword'
import CashOrder from './components/CashOrder/CashOrder'
import WishList from './components/WishList/WishList'




function App() {


  const [cartId, setcartId] = useState(null)

  let query = new QueryClient()

  let router = createBrowserRouter([
    {path : '' , element : <Layout/> , children : [
      {index : true , element : <ProductRoute> <Home/></ProductRoute>},
      {path : 'Brands' , element : <ProductRoute><Brands/></ProductRoute>},
      {path : 'Products' , element : <ProductRoute><Products/></ProductRoute>},
      {path : 'Categories' , element : <ProductRoute><Categories/></ProductRoute>},
      {path : 'CategoriesDetails/:categoryId' , element : <ProductRoute><CategoriesDetails/></ProductRoute> },
      {path : 'Cart' , element : <ProductRoute><Cart setcartId={setcartId}/></ProductRoute>},
      {path : 'ProductDetails/:id/:category' , element : <ProductRoute><ProductDetails/></ProductRoute>},
      {path : 'CheckOut' , element : <ProductRoute><CheckOut cartsId={cartId} /></ProductRoute>},
      {path : 'WishList' , element : <ProductRoute><WishList/></ProductRoute>},
      {path : 'CashOrder' , element : <ProductRoute><CashOrder cartsId={cartId} /></ProductRoute>},
      {path:  'allorders' , element : <Orders/>},
      {path : 'Login' , element : <Login/>},
      {path : 'VerifyReset' , element : <VerifyReset/>},
      {path : 'ResetPassword' , element : <ResetPassword/>},
      {path : 'ForgetPassword' , element : <ForgetPassword/>},
      {path : 'Register' , element : <Register/>},
      {path : 'Logout' , element : <Logout/>},
      {path : '*' , element : <NotFound/>}
    ]}
  ])

  return <>
          <CartContextProvider>
           <QueryClientProvider client={query}>
             <UseeContextProvider>
               <RouterProvider router={router}></RouterProvider>
               <Toaster/>
             </UseeContextProvider>
           </QueryClientProvider> 
          </CartContextProvider>
         </>
  
}

export default App
