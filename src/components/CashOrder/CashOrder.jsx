import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yub from 'yup'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'

export default function CashOrder({cartsId}) {


  //Import Cart Context
  let {setCart} =  useContext(CartContext)


  const [isLoading, setisLoading] = useState(false)


  // get a token
  let headers = {
    token : localStorage.getItem('userToken')
  }


  // Cash Order Call API
   function PayCash(orderId){

    setisLoading(true)

    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${orderId}` ,
    {
      "shippingAddress": {
      details : formik.values.details ,
      phone :  formik.values.phone,
      city : formik.values.city,
        }
    },{
      headers
    })
    .then(({data})=>{
      if(data.status === "success"){
        setisLoading(false)
        toast.success('Order placed successfully')
        setCart(data)
      }
    })
    .catch(()=>{
      setisLoading(false)
      toast.error('An error occurred. Your order could not be completed')
    })
  }


  // Validtion Details
  let validationSchema = Yub.object().shape({
    details : Yub.string().min(5 , 'Details must be at least 5 characters').max(20 , 'Details must be at most 20 characters').required('Details is required'),
    phone : Yub.string().matches(/^01[0125][0-9]{8}$/, 'Enter a valid phone number').required('Phone is required'),
    city : Yub.string().required('City is required')
  })


  // get Details User
  let formik = useFormik({
    initialValues : {
      details : '',
      phone : '',
      city : ''
    },
    onSubmit : ()=>PayCash(cartsId),
    validationSchema
  })


  // Code CSS
  return <>
       {/*Main  */}
       <div className='container max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mb-21'>

        {/* Header */}
        <h1 className='text-center text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-3'>CheckOut Order</h1>

          {/* Form Details */}
          <form onSubmit={formik.handleSubmit}>


            {/* Input Details*/}
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="details" id="details"
              value={formik.values.details} className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              />
              <label  htmlFor="details" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your Details :</label>
            </div>

            {/* Validation Details */}

            {formik.errors.details && formik.touched.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{formik.errors.details}</div> : ''}


            {/*Input Phone */}

            <div className="relative z-0 w-full mb-5 group">
                <input type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone"
                value={formik.values.phone} className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                />
                <label  htmlFor="phone" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your Phone :</label>
            </div>

            {/* Validation Phone  */}

            {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{formik.errors.phone}</div> : ''}    

            {/*Input City */}
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="city" id="city"
                value={formik.values.city} className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                />
                <label  htmlFor="city" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your City :</label>
            </div>

            {/* Validation City */}

            {formik.errors.city && formik.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{formik.errors.city}</div> : ''}


          {/*Button Submit  */}
          <button className='bg-green-600 py-2 px-4 text-white rounded-lg font-semibold cursor-pointer'>
          {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Submit'}</button>   


        </form>
      </div>
  </>
}
