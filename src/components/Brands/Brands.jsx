import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {


  // Get All Brands Call API
  function GetAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  
  let { data, isLoading, error, isError } = useQuery({
    queryKey: ["Brnads"],
    queryFn: GetAllBrands,
    select: (data) => data.data.data,
  });

  if (isLoading ) {
    return (
      <div className="min-h-96 flex items-center justify-center my-12">
        <i className="fas fa-spinner fa-spin fa-5x text-green-400"></i>
      </div>
    );
  }

   if(isError){
    return <div>
        <h1 className='text-center font-bold'>{error}</h1>
    </div>
  }

  

  // Not Found Any Data Return
  return (
    <>
      <h1 className='text-center text-4xl font-bold text-green-700 mb-4'>All Brands</h1>
      <div className="flex flex-col flex-wrap md:flex-row gap-4">
        {data?.map((brand) => (
          <div key={brand._id} className="w-[%23]  mx-auto my-2 bg-white">
            <div className=" hover:shadow-2xl duration-300 transition-all rounded-2xl">
              <img
                src={brand.image}
                className="w-full"
                alt="Name Brand"
                loading="lazy"
              />
              <h1 className="border-1 p-2 rounded-2xl text-2xl my-4 text-center font-bold">
                {brand.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
