import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'


export default function WishList() {


  // get a Token
   let headers = {
    token : localStorage.getItem('userToken')
  }

  // Use Query
  let queryClient =  useQueryClient()


  const [loading, setLoading] = useState(false)
  const [currentId, setcurrentId] = useState(0)


  // Import Cart Context
  let {addProductToCart , setCart} =  useContext(CartContext)



  // Add to cart Call API
  async function addToCart(productId){
    setLoading(true)
    setcurrentId(productId)
    let {data} = await addProductToCart(productId)
    if(data.status === "success"){
      toast.success(data.message)
      setCart(data)
      setLoading(false)
    }
    
  }



  // Get Products Call API
  function getWishlist(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
      headers
    })
  }



  // Use useQuery
  let {data , isLoading , isError , error} = useQuery({
    queryKey : ['getWishList'],
    queryFn : getWishlist , 
    select : (data)=> data.data.data
  })



  //delete Products Call API
  function delItem(itemId){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, 
      {
        headers
      })
      .then(({data})=>{
        queryClient.invalidateQueries(['getWishList'])
        toast.success(data.message)
      })
      .catch((error)=>{
        toast.error(error.response.data.message)
        return error
      })
  }


  // Loading Page
   if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center my-12">
        <i className="fas fa-spinner fa-spin fa-5x text-green-400"></i>
      </div>
    );
  }



  // Error
   if (isError) {
    return (
      <div>
        <h1 className="text-center font-bold">{error}</h1>
      </div>
    );
  }


  // Code CSS
  return <>


    <h1 className='text-center text-2xl text-green-600 font-bold'>Your Favorite Products</h1>
      <div className='flex flex-row flex-wrap'>
          {data.length === 0 ? <div className='w-full text-center mt-52 text-4xl font-bold text-red-600'> Your wishlist is currently empty! </div> : <>
          {data?.map((item) =>  <div key={item.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-2 py-2 px-4 shadow-lg hover:shadow-2xl'>

          {/* Image */}
          <img src={item.imageCover} alt="" className='w-full h-48 object-cover rounded' />

          {/* Category Name */}
          <h1 className='font-bold mt-1 text-green-600'>{item.category?.name}</h1>

          {/* Title */}
          <h1 className='my-2 font-semibold'>{item?.title?.split(' ').slice(0, 2).join(' ')}</h1>

          {/* Price & ratings */}
          <div className='flex justify-between items-center'>
            <h1>{item.price}</h1>
            <h1>{item.ratingsAverage}<i className="fa-solid fa-star text-yellow-400"></i></h1>
          </div>

          {/* Button Add to cart */}
          <button
            onClick={() => addToCart(item.id)}
            className='bg-green-600 hover:bg-green-700 px-4 py-2 cursor-pointer text-white font-semibold rounded-lg mt-2 w-full'> {currentId === item.id && loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add to cart'}
          </button>


          {/* Button Delete Products */}
          <button onClick={() => delItem(item.id)} className='bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2       text-white font-semibold rounded-lg mt-2 w-full'> Remove Product
          </button>

        </div>
      )}
    </>
  }
</div>

</>
}
