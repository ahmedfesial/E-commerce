import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart({setcartId}) {
  
  // Import Cart Context
  let { userLoggedCart , removeCart , removeAllCart , updateCart , setCart } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true)
  const [cartDetails, setCartDetails] = useState(null)

  // get data Call API
  async function getCartProduct() {
    setIsLoading(true)
    let {data} = await userLoggedCart();
    setCartDetails(data.data)
    setIsLoading(false)
    setcartId(data.data._id)
  }

   
  //Delete Product From Cart 
   async function delCart(productId){
    let response = await removeCart(productId)
    setCartDetails(response.data.data)
    setCart(response.data)
  }

  // Delete All Products
  async function delAllCart(){
    let response = await removeAllCart()
    setCartDetails(response.data.data)
    setCart(response.data)
  }


  // Update Product Count + & -
  async function updateCartProduct(productId , count){
    let response = await updateCart(productId , count)
    setCartDetails(response.data.data)
    console.log(response);
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


  // Code CSS
  return <>
      {/* Main */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

        {/* Header */}
        <h1 className="text-center font-bold text-2xl sm:text-3xl my-4 text-green-600">Shopping Cart</h1>

        {/* Table Cart */}
        <table className="w-full text-base sm:text-lg text-left rtl:text-right text-black">

        {/*Table Head  */}
        <thead className="text-sm sm:text-md uppercase bg-gray-300">
          <tr>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">Image</th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">Product</th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">Qty</th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">Price</th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-center">Action</th>
         </tr>
        </thead>

        {/*Body Table */}
        <tbody>
          {cartDetails?.products.map((product) => <tr key={product.id} className="bg-white border-b hover:bg-gray-100">
          <td className="p-2 sm:p-4 text-center">

            {/* Image */}
            <img src={product.product.imageCover} className="w-12 sm:w-16 md:w-32 max-w-full max-h-full mx-auto" alt={product.product.title}/>
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
              <button onClick={() => updateCartProduct(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-6 w-6 text-black bg-white borde border-gray-300 rounded-full hover:bg-gray-100">
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
  
  {/* Total Price */}
  <h1 className="text-2xl sm:text-4xl px-2 text-green-600 my-2 font-bold">
    Total Price: <span className="text-black">{cartDetails?.totalCartPrice} EGP</span>
  </h1>

  {/* Button Clear Cart */}
  <button onClick={delAllCart} className="cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-2 my-2 mx-2 rounded-lg text-white font-bold">
    Clear Cart
  </button>

  {/* Button Pay Cash Or Card */}
  <div className="flex flex-col sm:flex-row gap-2">

    {/* To Pay Card to checkout Page */}
    <Link to={"/CheckOut"}>
      <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white cursor-pointer font-bold w-full sm:w-auto">
        CheckOut By Card
      </button>
    </Link>

    {/* To Pay Cash to Cash Order Page */}
    <Link to={"/CashOrder"}>
      <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white cursor-pointer font-bold w-full sm:w-auto">
        CheckOut By Cash
      </button>
    </Link>
  </div>
</div>
</>
}
