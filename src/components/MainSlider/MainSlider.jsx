import React from 'react'
import slider1 from '../../assets/Images/slider-1.png'
import slider2 from '../../assets/Images/slider-2.jpeg'
import slider3 from '../../assets/Images/slider-3.jpeg'
import slider4 from '../../assets/Images/slider-4.jpeg'
import slider5 from '../../assets/Images/slider-5.jpeg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function MainSlider() {


  // Main Slider
  var settings = {
        dots: false,
        infinite: true,
        speed: 15000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
  }


  return <>
      {/* Main Div */}
      <div className='flex flex-col md:flex-row flex-wrap'>

        {/* Main Slider */}
        <div className='w-full md:w-3/4'>
          <Slider {...settings}>
           <img src={slider1} alt="" className='w-full h-[200px] md:h-[400px] object-cover' loading='lazy'/>
           <img src={slider2} alt="" className='w-full h-[200px] md:h-[400px] object-cover' loading='lazy'/>
           <img src={slider3} alt="" className='w-full h-[200px] md:h-[400px] object-cover' loading='lazy'/>
          </Slider>
        </div>

        {/* Two Images */}
        <div className='w-full md:w-1/4 flex md:flex-col'>
          <img src={slider4} alt="" className='w-1/2 md:w-full h-[100px] md:h-[200px] object-cover' />
          <img src={slider5} alt="" className='w-1/2 md:w-full h-[100px] md:h-[200px] object-cover' />
        </div>

      </div>
  </>
}
