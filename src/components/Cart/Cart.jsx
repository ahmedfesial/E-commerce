/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart({setcartId}) {
  
  // Import Cart Context
  let { userLoggedCart , removeCart , removeAllCart , updateCart , setCart } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true)
  const [cartDetails, setCartDetails] = useState(null)
  const [error, setError] = useState('')

  // get data Call API
  async function getCartProduct() {
    try{
      setIsLoading(true)
      let {data} = await userLoggedCart();
      setCartDetails(data.data)
      setIsLoading(false)
      setcartId(data.data._id)
    }catch(error){
      setError(error)
      toast.error('ERROR')
    }finally{
        setIsLoading(false)
    }
  }

   
  //Delete Product From Cart 
   async function delCart(productId){

    try{
      let response = await removeCart(productId)
      // Has anything changed ?
      setCartDetails(response.data.data)
      setCart(response.data)
    }catch(error){
      setError(error)
      toast.error('Error')
    }
  }

  // Delete All Products
  async function delAllCart(){
      try{
        let response = await removeAllCart()
        setCartDetails(response.data.data)
        setCart(response.data)
      }catch(error){
        setError(error)
        toast.error('Error')
      }
  }


  // Update Product Count + & -
  async function updateCartProduct(productId , count){
    try{
      let response = await updateCart(productId , count)
      setCartDetails(response.data.data)
    }catch(error){
      setError(error)
      toast.error('Error')
    }
  }

  useEffect(() => {
    getCartProduct();
  }, []);


  // Loading
  if(isLoading){
    return <div className='min-h-96 flex items-center justify-center my-12'>
                  <i className='fas fa-spinner fa-spin fa-5x text-green-400'></i>
            </div>
  }
  if(error){
      return <div className='min-h-96 flex items-center justify-center my-12'>
                <h1>{error}</h1>
            </div>
  }


  // Code CSS
  return <>
      {/* Main */}
      <div className="relative overflow-x-auto sm:rounded-lg mb-20">

        {/* Header */}
        <h1 className="text-center font-bold text-2xl sm:text-3xl my-4 text-green-600">Shopping Cart</h1>

        {/* Table Cart */}
        
        {cartDetails?.products.length === 0 ? <div className="w-full text-center text-gray-500 my-8 text-4xl font-bold">Your cart is empty 🛒</div> : 
          <table className="w-[80%] md:w-full text-base sm:text-lg text-left rtl:text-right text-black">

        {/*Table Head  */}
        <thead className="text-sm sm:text-md uppercase bg-gray-300">
          <tr>
            <th scope="col" className="px-2 py-2 md:px-6 sm:py-3 text-center">Image</th>
            <th scope="col" className="px-2 py-2 md:px-6 sm:py-3 text-center">Product</th>
            <th scope="col" className="px-2 py-2 md:px-6 sm:py-3 text-center">Qty</th>
            <th scope="col" className="px-2 py-2 md:px-6 sm:py-3 text-center">Price</th>
            <th scope="col" className="px-2 py-2 md:px-6 sm:py-3 text-center">Action</th>
         </tr>
        </thead>

        {/*Body Table */}
        <tbody>
          {cartDetails?.products.map((product) => <tr key={product.id} className="bg-white border-b hover:bg-gray-100">
          <td className="p-2 sm:p-4 text-center">

            {/* Image */}
            <img src={product.product.imageCover} className="object-cover   sm:w-16 md:w-32 max-w-full max-h-full mx-auto" alt={product.product.title} loading="lazy"/>
          </td>
          {/* Title */}
          <td className="px-4 py-2 sm:px-6 sm:py-4 font-semibold text-center">
            {product.product.title.split(" ").slice(0, 2).join(" ")}
          </td>

          {/* Button Count + & - */}
          <td className="px-4 py-2 sm:px-6 sm:py-4">

            {/* Main Div Count */}
            <div className="flex items-center justify-center">

              {/* Button Count - */}
              <button onClick={() => {if(product.count > 1){ updateCartProduct(product.product.id , product.count -1)}} } className="inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-6 w-6 text-black bg-white borde border-gray-300 rounded-full hover:bg-gray-100">
                <span className="sr-only">Decrease Quantity</span>
                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 18 2" stroke="currentColor"  strokeWidth="2" strokeLinecap="round">
                <path d="M1 1h16" />
                </svg>
              </button>

              {/* Count */}
              <span className="font-bold text-black px-2">{product.count}</span>

              {/* Button Count + */}
              <button onClick={() => updateCartProduct(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-full hover:bg-gray-100">
                <span className="sr-only">Increase Quantity</span>
                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 1v16M1 9h16" />
                </svg>
              </button>

            </div>
          </td>
          
          {/* Price */}
          <td className="px-4 py-2 sm:px-6 sm:py-4 font-semibold text-center">{product.price} EGP</td>

          {/* Delete Product From Cart */}
          <td className="px-4 py-2 sm:px-6 sm:py-4 text-center">
            <span onClick={() => delCart(product.product.id)} className="font-medium text-red-600 cursor-pointer hover:underline">Remove</span>
          </td>

        </tr>
      )}
    </tbody>
        </table>
        }
  
  {/* Total Price */}
  <h1 className="text-2xl sm:text-4xl px-2 text-green-600 my-2 font-bold">
    Total Price: <span className="text-black">{cartDetails?.totalCartPrice} EGP</span>
  </h1>

  {/* Button Clear Cart */}
  <button onClick={delAllCart} className="cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-2 my-2 mx-2 rounded-lg text-white font-bold">
    Clear Cart
  </button>

  {/* Button Pay Cash Or Card */}
  <div className="flex flex-col sm:flex-row gap-2 ms-2">

    {/* To Pay Card to checkout Page */}
    <Link to={"/CheckOut"}>
      <button disabled={cartDetails?.products.length === 0} className={`${cartDetails?.products.length === 0 ? 'opacity-50 cursor-not-allowed' : ''} bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white cursor-pointer font-bold md:my-4 w-full sm:w-auto`}>
        CheckOut By Card
      </button>
    </Link>

    {/* To Pay Cash to Cash Order Page */}
    <Link to={"/CashOrder"}>
      <button disabled={cartDetails?.products.length === 0} className={`${cartDetails?.products.length === 0 ? 'opacity-50 cursor-not-allowed' : ''} bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white cursor-pointer font-bold w-full sm:w-auto md:my-4`}>
        CheckOut By Cash
      </button>
    </Link>
  </div>
      </div>
</>
}
