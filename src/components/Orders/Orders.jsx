import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
export default function Orders() {

  const [getOrders, setgetOrders] = useState([])
  const [isLoading, setisLoading] = useState(false)

  // Import Cart Context
  let {getAllOrders} =  useContext(CartContext)

  // Get All Order Call API
  async function getOrder(){
    setisLoading(true)
    let {data} = await getAllOrders()
    setgetOrders(data.data)
    setisLoading(false)
  }


  useEffect(()=>{
    getOrder()
  },[])

  // Loading Page
  if(isLoading){
    return <div className='min-h-96 flex items-center justify-center my-12'>
                  <i className='fas fa-spinner fa-spin fa-5x text-green-400'></i>
            </div>
  }

    //Code 
   return <>
    {/* Header */}
    <h1 className='text-center font-bold text-green-600 text-3xl my-2'>All Orders were successfully completed.</h1>

    {/* Main Div */}
    <div className='flex flex-row flex-wrap'>
      {getOrders.map((order)=> 
        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 py-2 px-4 shadow-xl hover:shadow-2xl' key={order._id}>
        <div className='py-2'>
          <h1><span className='font-bold text-red-600'>Order :</span> #{order.id}</h1>
          <h1><span className='font-semibold'>Name :</span> {order.user.name}</h1>
          <h1><span className='font-semibold'>Email : </span>{order.user.email}</h1>
          <h1><span className='font-semibold'>Phone :</span> {order.user.phone}</h1>
          <h1><span className='font-semibold'>City :</span> {order.shippingAddress?.city}</h1>
          <h1><span className='font-semibold'>Total Price :</span> {order.totalOrderPrice} EGP</h1>
          <h1><span className='font-semibold'>Payment method :</span> {order.paymentMethodType}</h1>
      </div>
      </div>)}
      </div>
   </>
}
