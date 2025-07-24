import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';


export default function ProductDetails() {

    // Slider Images
    var settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false,
    autoplay : true,
    };

     let {addProductToCart , setCart} =useContext(CartContext)
    const [getCategory, setGetCategory] = useState([])
    const [productDetail, setProductDetail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isLoading, setisLoading] = useState(true)

    // Set ID
    let {id , category} =  useParams()


    // Add ProductTo cart
    async function addProduct(ProductId){
      setLoading(true)
      let response = await addProductToCart(ProductId)
      if(response.data.status === "success"){
        setCart(response.data)
        setLoading(false)
        toast.success(response?.data?.message || 'Add Product To Cart')
        console.log(response);
      }
      else{
        toast.error(response?.data?.statusMsg || 'Unexpected Error')
        setLoading(false)
      }
    }


    // get Prodtuct Details Call API
    function getProductDetails(id , signal){
      setisLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}` , {signal})
        .then(({data})=>{
            setProductDetail(data.data)
            setisLoading(false)
        })
        .catch((error)=>{
            toast(error.response.data.message)
            setisLoading(false)
        })
        
    }


    // get Category = Name Call API
    function getCategoryProducts(category){
      setisLoading(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({data})=>{
            let allProduct = data.data
            let  categories = allProduct.filter((product)=> product.category.name == category)
            setGetCategory(categories)
            // console.log(categories);
            setisLoading(false)
        })
        .catch((error)=>{
          setisLoading(false)
          toast(error.response.data.message)
        })
    }



    useEffect(()=>{

        const controller = new AbortController();

        getProductDetails(id , controller.signal)
        getCategoryProducts(category)

        return ()=> controller.abort()
    },[id , category])




    // Loading Page
    if(isLoading){
    return <div className='min-h-96 flex items-center justify-center my-12'>
                  <i className='fas fa-spinner fa-spin fa-5x text-green-400'></i>
            </div>
    }

  //  Code CSS
  return <>

  {/* Main Div */}
  <div className="flex flex-col md:flex-row flex-wrap items-center">

    {/* Map Images Products */}
    <div className="w-full md:w-1/4 px-2 pl-2 mb-4 md:mb-0">
      <Slider {...settings}>
        {productDetail?.images?.map((image, idx) => (
          <div key={idx} className='w-full'>
            <img src={image} alt={image.title} className="w-[50%] mx-auto md:w-full h-auto object-contain" loading='lazy'/>
          </div>))}
      </Slider>
    </div>

    {/*Product Details */}
    <div className="w-full md:w-3/4 px-2">

      {/* Title  */}
      <h1 className="font-bold text-lg md:text-2xl">{productDetail?.title.split(" ").slice(0, 2).join(" ")}</h1>

      {/* Description */}
      <h1 className="font-light my-2 text-sm md:text-base">{productDetail?.description}</h1>

      {/* Quantity */}
      <h1 className="text-green-600 font-semibold mt-2">Quantity : {productDetail?.quantity} </h1>

      {/*Sold  */}
      <h1 className="text-red-600 font-semibold my-2">Sold : {productDetail?.sold}</h1>

      {/*Price & rating  */}
      <div className="flex flex-row my-2 flex-wrap justify-between">
        <h1 className=" font-bold">Price : {productDetail?.price} EGP </h1>
        <h1>{productDetail?.ratingsAverage}{" "} <i className="fa-solid fa-star text-yellow-400"></i></h1>
      </div>

      {/* Button Add to card */}
      <button onClick={()=> addProduct(productDetail._id)} className="font-bold my-2 py-2 px-4 w-full bg-green-600 text-white cursor-pointer rounded-lg mt-2 hover:bg-green-800 duration-300 transition-all">
          {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add To Cart'}
      </button>
    </div>
  </div>


  {/*Main Category  */}
  <div className="flex flex-wrap">
    {getCategory?.map((product) => <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 px-2 mb-4" key={product.id}>

        {/*Card  */}
        <div className="product py-4 h-full flex flex-col">

          <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>

            {/* Image */}
            <img src={product.imageCover} className="w-full h-40 object-contain" alt={product.title}/>

            {/* Category Name */}
            <h1 className="text-xs md:text-sm">{product.category.name}</h1>

            {/* Title */}
            <h1 className="text-sm md:text-base"> {product.title.split(" ").slice(0, 2).join(" ")}</h1>

            {/*Price & ratings  */}
            <div className="flex justify-between items-center">
              <h1>{product.price} EGP</h1>
              <h1> {product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></h1>
            </div>

            {/* Button Add To Card */}
            <button className="py-2 px-4 w-full my-2 bg-green-600 text-white rounded-lg">
              Add to cart
            </button>
          </Link>
        </div>
      </div>
    )}
  </div>
  
</>
}
