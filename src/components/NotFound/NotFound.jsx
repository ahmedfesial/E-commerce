import React from 'react'

import error from '../../assets/Images/error.svg'

export default function NotFound() {


  return <>
        <section className='flex justify-center items-center'>
          <img src={error} alt='404 Not Found' style={{width:'60%'}} loading='lazy'/>
        </section>

  </>
}
