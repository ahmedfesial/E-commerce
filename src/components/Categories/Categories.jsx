import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Categories() {


  // get category Call API  
  function getAllCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  // useQuery
  let { data , isLoading , isError , error } = useQuery({
    queryKey: ["AllCategory"],
    queryFn: getAllCategory,
    select: (data) => data.data.data,
  });

  
  // Loading Page
  if(isLoading){
    return   <div className='min-h-96 flex items-center justify-center my-12'>
                  <i className='fas fa-spinner fa-spin fa-5x text-green-400'></i>
             </div>
  }

  // Error
  if(isError){
    return <div>
      <h1 className="text-center font-bold">{error}</h1>
    </div>
  }

 

  // Code CSS
  return <>
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">All Categories</h1>

      {/* Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">

        {data?.map((category) => (<div key={category._id} className="bg-white rounded-lg shadow-lg flex flex-col items-center p-4 hover:shadow-2xl transition-shadow duration-300">

            {/* lint to Category Details Page */}
            <Link to={`/CategoriesDetails/${category._id}`}  className="w-full flex flex-col items-center">

              <img src={category.image} alt={category.name} className="w-full h-48 object-contain mb-4"/>

              {/* Category Name & Slug */}
              <div className="text-center w-full">
                <h1 className="font-bold text-lg">{category.name}</h1>
                <h2 className="text-gray-500">{category.slug}</h2>
              </div>
              
            </Link>
          </div>))}
      </div>  
    </>
}
