import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'


export default function Login() {

  // Import Cart Context
  let {setUserLogin} =  useContext(UserContext)

  const [apiError, setapiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate() // Cahnge Path

  function callLogin(formValue){
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , formValue)
    .then((responese)=>{
      if(responese.data.message === 'success'){
        localStorage.setItem('userToken' , responese.data.token)
        setIsLoading(false)
        navigate('/')
        setUserLogin(responese.data.token)
      }
    })
    .catch((error)=>{
     setapiError(error.response.data.message)
     setIsLoading(false)
    })
  }

  // Valdation Login
  let validationSchema = Yup.object().shape({
    email : Yup.string().email('Email is invalid').required('Email is required'),
    password : Yup.string().matches(/^[A-Z][a-z0-9]{5,9}$/ , 'Password must start with an uppercase letter and be 5-20 characters long').required('Password is required'),
  })



  // get data from User
  let formik = useFormik({
    initialValues : {
      email : '',
      password : '',
    },
    onSubmit : callLogin,
    validationSchema
  })


  // Code CSS
  return <>
      {/*Main Div  */}
      <div className='container max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mb-35'>

      {/* Header */}
      <h1 className='text-center text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-3'>Login Now</h1>

      {/* Alert Error */}
      {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{apiError}</div> : ''}

    {/* Form Login */}
    <form onSubmit={formik.handleSubmit}>


    {/*Inout Email */}
    <div className="relative z-0 w-full mb-5 group">
        <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email"
        value={formik.values.email}className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        <label htmlFor="email"className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
    </div>

    {/* Validation Email */}
    {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert"> {formik.errors.email} </div> : ''}

    {/*Input Password */}
    <div className="relative z-0 w-full mb-5 group">
        <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="password"id="password"
        value={formik.values.password} className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>

        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
      
    </div>

    {/* Valid Password */}
    {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert"> {formik.errors.password} </div> : ''}


    <div className='flex flex-col sm:flex-row justify-start items-center gap-2'>

      {/* button Login */}
      <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm md:text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Login Now'}
      </button>

      {/*Forget Password & Register  */}
      <div>
        <p className='pl-0 sm:pl-2 font-semibold text-center sm:text-left'>Don't you already have an account? <span><NavLink className='font-bold text-green-600' to='/Register'> Register</NavLink></span></p>
        <p className='pl-0 sm:pl-2 font-semibold  text-center sm:text-left'>Forgot your password?<span><NavLink className='font-bold text-red-600' to='/ForgetPassword'> Forget Password</NavLink></span></p>
      </div>
    </div>
  </form>
</div>
  </>
}
