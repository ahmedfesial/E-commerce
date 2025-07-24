import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function Products() {


  // Import Cart Context
  let {addProductToCart , setCart} =  useContext(CartContext)


  const [loading, setLoading] = useState(false)
  const [currentId, setcurrentId] = useState(0)



  // Add Product to cart 'import from Cart Contex'
  async function addProduct(productId){

    setLoading(true) // Spin Loading
    setcurrentId(productId) //Get Product Id

    let {data} = await addProductToCart(productId)

    if(data.status === "success"){
      setLoading(false)
      toast.success(data.message)
      setCart(data)
    }
    else
    {
      setLoading(false)
      toast.error(data.message)
    }
  }

  // Get All Products 'get From API'
  function getAllProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }


  // use a usequery to get a data
  let {data , isError , error , isLoading} = useQuery({
    queryKey:['AllPorduct'],
    queryFn : getAllProducts,
    select : (data)=> data.data.data
  })

  // Loading Page
  if(isLoading){
    return   <div className='min-h-96 flex items-center justify-center my-12'>
                  <i className='fas fa-spinner fa-spin fa-5x text-green-400'></i>
             </div>
  }
  // If an error appears
  if(isError){
    return <div>
        <h1 className='text-center font-bold'>{error}</h1>
    </div>
  }


  //Code CSS
  return <>
      {/* Main Div */}
       <h1 className='text-center text-4xl font-bold text-green-700 mb-4'>All Products</h1> 
       <div className='flex flex-row flex-wrap'>
        {data?.map((product) => <div className='shadow-lg rounded-md hover:shadow-2xl w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 duration-300 transition-all' key={product._id}>

        {/*Card  */}
        <div className='product py-2 px-4'>

          {/* To go Product Details Page */}
          <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>

          <img src={product.imageCover} alt={product.title} className="w-auto max-w-full sm:w-52" loading='lazy'/>

          <h1 className='text-green-600'>{product.category.name}</h1>

          <h1 className='my-2 font-bold'>{product.title.split(' ').slice(0, 1).join(' ')}</h1>

          {/* Price & Ratings */}
          <div className='flex justify-between items-center'>
            <h1 className='font-semibold'>{product.price} EGP</h1>
            <h1>{product.ratingsAverage}<i className='fa-solid fa-star text-yellow-400'></i></h1>
          </div>

          </Link>

          {/*Button  Add to card  */}
          <button onClick={()=>addProduct(product.id)} className='w-full bg-green-600 p-2 px-4 text-white cursor-pointer font-semibold rounded-lg my-2 hover:bg-green-700'>
          {currentId === product.id && loading? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add to cart'}
          </button>
      </div>
      </div>)}
 </div>
</>
}
