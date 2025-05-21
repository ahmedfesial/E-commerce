import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./RecentProduct.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";





export default function RecentProduct() {
  
  //get a Token
  let headers = {
    token : localStorage.getItem('userToken')
  }

    // Import Cart Context
    let { addProductToCart , setCart } = useContext(CartContext);


    
    const [loading, setLoading] = useState(true)
    const [currentId, setcurrentId] = useState(0)
    const [favProducts, setFavProducts] = useState([])



    // use useEffect set Product WishList in localStorage
    useEffect(()=>{
    const savedWishList = localStorage.getItem('wishlist');
    if(savedWishList){
      setFavProducts(JSON.parse(savedWishList));
    }
  },[])



  // Wish List API Get & Delete
  function addProductToWishlist(favId){

    const isFav = favProducts.includes(favId)

    if(isFav){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${favId}` ,
          {
            headers
          }
        )
        .then(({data})=>{
          if(data.status === 'success'){
            toast.success(data.message)
            setFavProducts(prev => {
              const updated = prev.filter(id => id !== favId);
              localStorage.setItem('wishlist' , JSON.stringify(updated));
              return updated
            })
          }
        })
        .catch((error)=>{
          toast.error('Error')
        })
    }else
    {
        axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId : favId
        },
        {
          headers
        })
        .then(({data})=>{
          if(data.status === "success")
          toast.success(data.message)
          setFavProducts(prev =>{
            const updated = [...prev , favId];
            localStorage.setItem('wishlist' , JSON.stringify(updated));
            return updated;
          })
        }
        )
        .catch((error)=>{
          toast.error('Error! No Add Product To Wish List')
        })
    }
  }


  // Add Product To Cart 'Button => Add To Cart'
  async function addProduct(productId) {

    setcurrentId(productId)
    setLoading(true)

    let response = await addProductToCart(productId);
    if (response.data.status === 'success') {
      toast.success(response.data.message);
      setCart(response.data)
      setLoading(false)

    } else {
      toast.error(response.data.message);
      setLoading(false)
    }
  }


  // Get Product From API
  function GetProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["recentProduct"],
    queryFn: GetProduct,
    select: (data) => data.data.data,
  });


  // Loading Page
  if (isLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center my-12">
        <i className="fas fa-spinner fa-spin fa-5x text-green-400"></i>
      </div>
    );
  }

  // Show Error
  if (isError) {
    return (
      <div>
        <h1 className="text-center font-bold">{error}</h1>
      </div>
    );
  }


  


  // CSS Code
  return (
    <>
      <div className="flex flex-row flex-wrap">
        {/* For Loop */}
        {data?.map((product) =>  <div className=" shadow-lg hover:shadow-2xl sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 mb-4" key={product.id}>
              {/* Card */}
              <div className="product py-2">

                {/* Imaage and to Product Details */}
                <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className="w-full" alt={product.title}/>
                </Link>

                {/* Category Name & Wish List   */}
                <div className="flex justify-between items-center mt-2">

                <h1 className="text-green-500">{product.category.name}</h1>

                
                {/* Icon WishList */}
                <i className={`fa-${favProducts.includes(product.id) ? 'solid' : 'regular'} fa-heart text-2xl cursor-pointer transition-colors duration-300 ${favProducts.includes(product.id) ? 'text-red-500' : 'text-gray-400'}`} 
                onClick={ ()=> addProductToWishlist(product.id)}></i>



                </div>
                
                {/* Title */}
                <h1 className="font-bold my-1.5"> {product.title.split(" ").slice(0, 2).join(" ")}</h1>

                {/* Price & Rating Average */}
                <div className="flex justify-between items-center">
                  <h1>{product.price} EGP</h1>
                  <h1> {product.ratingsAverage}<i className="fa-solid fa-star text-yellow-400"></i></h1>
                </div>

              </div>

                {/* Button Add To Cart */}
                <button onClick={()=> addProduct(product.id)} className="btn p-2 px-4 w-full bg-green-600 rounded-lg cursor-pointer mt-2 text-white hover:bg-green-700">
                {currentId===product.id&&loading ? <i class="fa-solid fa-spinner fa-spin"></i>: 'Add To Cart'}
                </button>
          </div>
        )}
      </div>
    </>
  );
}
