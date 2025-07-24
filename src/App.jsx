import React, {  useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UseeContextProvider from './Context/UserContext'
import ProductRoute from './components/ProductRoute/ProductRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
const Layout = React.lazy(() => import('./components/Layout/Layout'))
const Home =  React.lazy(() => import('./components/Home/Home'))
const Brands = React.lazy(()=> import('./components/Brands/Brands'))
const Categories = React.lazy(()=> import('./components/Categories/Categories'))
const Porduct = React.lazy(()=> import ('./components/Products/Products'))
const CategoriesDetails = React.lazy(()=>import ('./components/CategoriesDetails/CategoriesDetails'))
const Cart = React.lazy(()=> import('./components/Cart/Cart'))
const Login = React.lazy(()=> import ('./components/Login/Login'))
const Register = React.lazy(()=> import('./components/Register/Register'))
const NotFound = React.lazy(()=> import('./components/NotFound/NotFound'))
const ProductDetails = React.lazy(()=> import('./components/ProductDetails/ProductDetails'))
const CheckOut = React.lazy(()=> import('./components/CheckOut/CheckOut'))
const Orders = React.lazy(()=> import('./components/Orders/Orders'))
const ForgetPassword = React.lazy(()=> import('./components/ForgetPassword/ForgetPassword'))
const VerifyReset = React.lazy(()=> import('./components/VerifyReset/VerifyReset'))
const ResetPassword = React.lazy(()=> import('./components/ResetPassword/ResetPassword'))
const CashOrder = React.lazy(()=> import('./components/CashOrder/CashOrder'))
const WishList = React.lazy(()=> import('./components/WishList/WishList'))
const Logout = React.lazy(()=> import ('./components/Logout/Logout'))




function App() {


  const [cartId, setcartId] = useState(null)

  let query = new QueryClient()

  let router = createBrowserRouter([
       {path : '' , element : <Layout/> , children : [
        {index : true , element : <ProductRoute> <Home/> </ProductRoute> },
        {path : 'Brands' , element : <ProductRoute> <Brands/> </ProductRoute> },
        {path : 'Categories' , element : <ProductRoute> <Categories/> </ProductRoute>},
        {path : 'Products' , element : <ProductRoute> <Porduct/> </ProductRoute>},
        {path : 'CategoriesDetails/:categoryId' , element : <ProductRoute> <CategoriesDetails/> </ProductRoute>},
        {path : 'Cart' , element : <ProductRoute> <Cart setcartId={setcartId}/></ProductRoute>},
        {path : 'ProductDetails/:id/:Category' , element : <ProductRoute> <ProductDetails/> </ProductRoute>},
        {path : 'CheckOut' , element : <ProductRoute> <CheckOut cartsId={cartId}/> </ProductRoute>},
        {path : 'Orders' , element : <ProductRoute> <Orders/> </ProductRoute>},
        {path : 'CashOrder' , element : <ProductRoute> <CashOrder cartsId={cartId}/> </ProductRoute>},
        {path : 'WishList' , element : <ProductRoute> <WishList/> </ProductRoute>},
        {path : 'ForgetPassword' , element : <ForgetPassword/>},
        {path : 'ResetPassword' , element :  <ResetPassword/>},
        {path : 'VerifyReset', element :  <VerifyReset/>},
        {path : 'Register' , element :  <Register/> },
        {path : 'Logout' , element : <Logout/>},
        {path : 'Login' , element :  <Login/> },
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

