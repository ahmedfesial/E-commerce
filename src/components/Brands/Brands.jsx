import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Brands() {


  // Get All Brands Call API
  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let {data , isLoading} = useQuery({
    queryKey : ['AllBrands'],
    queryFn : getAllBrands,
    select : (data)=> data.data.data
  })


  // Loading Page
  if(isLoading){
    return <div className='min-h-96 flex items-center justify-center my-12'>
                  <i className='fas fa-spinner fa-spin fa-5x text-green-400'></i>
             </div>
  }

  //So API Return Empty Data
  if(data.length === 0){
    return <div className="min-h-96 flex items-center justify-center my-12">
            <h2 className="text-xl font-semibold text-red-500">Not Available Now!</h2>
        </div>
  }
  
  // Not Found Any Data Return
  return <>
   <div></div>
  </>
}
