import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderCategory() {


    // Slider Category
     var settings = {
        dots: true,
        infinite: true,
        speed: 10000,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1200, 
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 992, 
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480, 
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    };

    // Get Category From API
    function getSliderCategory(){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let {data , isLoading , isError , error} = useQuery({
        queryKey : ['SliderCategory'],
        queryFn : getSliderCategory,
        select : (data)=> data.data.data
    })

    
    if(isLoading){
      return <div></div>
    }

    if(isError){
      return <div>
        <h1 className='text-center font-bold'>{error}</h1>
      </div>
    }

    

  return <>
    <div className='my-8'>
        <h1 className='text-center my-2 font-bold text-green-600 text-2xl'>Shop Popular Category</h1>
        <Slider {...settings}>
            {data?.map((category)=> <div>
                <img src={category.image} className='w-full object-contain' style={{height:'150px'}} alt={category.name} loading='lazy'/>
            </div>)}
        </Slider>
    </div>
  </>
}
