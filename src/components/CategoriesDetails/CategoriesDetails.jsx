import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function CategoriesDetails() {


    const [loading, setloading] = useState(false)
    const [current, setcurrent] = useState(0)
    const [getCategoreDetails, setgetCategoreDetails] = useState([])
    const [isLoading, setisLoading] = useState(true)

    // Parameter
    let {categoryId} = useParams()

    // Import Cart Context 
    let { addProductToCart , setCart}=  useContext(CartContext)


    // Add Product to cart
    async function addProduct(productId){

      setcurrent(productId)
      setloading(true)  

      let {data} = await  addProductToCart(productId)

      if(data.status === "success"){
          setloading(false)
          toast.success(data.message)
          setCart(data)  
      }
      else {
        toast.error(data.message)
        setloading(false)
      }
    }

    // Get Products CAll API
    function getCategoriesDetails(categoryId){
        setisLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
        .then(({data})=>{
            setgetCategoreDetails(data.data)
            setisLoading(false)
        })
        .catch((error)=>{
            setisLoading(false)
            toast.error(error.response.data.message)
        })
    }


    useEffect(()=>{
        getCategoriesDetails(categoryId)
    },[categoryId])


    // Loading Page
    if(isLoading){
        return   <div className='min-h-96 flex items-center justify-center my-12'>
                    <i className='fas fa-spinner fa-spin fa-5x text-green-400'></i>
                 </div>
    }
    if (getCategoreDetails.length === 0) {
    return (
        <div className="min-h-96 flex items-center justify-center my-12">
            <h2 className="text-xl font-semibold text-gray-500">There are no other products.</h2>
        </div>
    );
}

 //Code CSS 
  return <>

        {/*Main Div  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">


        {getCategoreDetails.map((category) => <div key={category._id} className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-end p-4 hover:shadow-2xl transition-shadow duration-300">

            {/* Card */}
            <div className="w-full flex flex-col items-center">
              <img src={category.imageCover} alt={category.title} className="w-full h-48 object-contain mb-4" loading='lazy'/>
                <div>
                    {/* Title */}
                    <h1 className="font-bold text-lg">{category.title.split(' ').slice(0,2).join(' ')}</h1>

                    {/* Description */}
                    <h1 className='font-light my-2'>{category.description.split(' ').slice(0,20).join(' ')}</h1>

                    {/* Price & Rating */}
                    <div className='flex justify-between items-center'> 
                        <h1 className='font-semibold'>{category.price} EGP</h1>
                        <h1>{category.ratingsAverage}<i className="fa-solid fa-star text-yellow-400"></i></h1>
                    </div>

                {/* button Add to Card  */}
                <button onClick={()=> addProduct(category.id)}  className='bg-green-600 w-full rounded-lg text-white py-2 px-4 mt-2 cursor-pointer hover:bg-green-700 font-semibold'>
                {current === category.id && loading? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add to cart'}</button>
              </div>
            </div>
          </div>)}
      </div>      
  </>
}
