import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yub from 'yup'
import toast from "react-hot-toast";


export default function ForgetPassword() {


  let navigate =  useNavigate()  //Path

  const [isLoading, setisLoading] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')


  // Send Email Call API
  function restePassword() {
    setisLoading(true)
    axios .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email: formik.values.email,
      })
      .then(({data}) => {
        if(data.statusMsg === 'success'){
          setisLoading(false)
          navigate('/VerifyReset')
          toast.success(data.message)
        }
      })
      .catch((error)=>{
        toast.error('No account found with this email')
        setErrorEmail('No account found with this email')
        setisLoading(false)
      })
  }


  // Validation Email
  let validationSchema = Yub.object().shape({
    email : Yub.string().email('Enter A Valid Email').required('Email Is Required')
  })


  // get data from User
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: restePassword,
    validationSchema
  });

  // Code CSS
  return <>
          <div className="border border-black rounded-lg shadow-2xl w-fit mx-auto py-10 px-20"> 

            {/* Main */}
            <div className="max-w-sm mx-auto">

              {/* Header */}
              <h1 className="text-center text-3xl font-bold text-red-600">Reset Password</h1> 
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5 mt-3">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Enter Your Email : </label>

                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" className=" border border-gray-800 text-sm rounded-lg block w-full p-2.5 " />

                  {/* Validtion Email */}
                  {formik.errors.email && formik.touched.email ?<div className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{formik.errors.email} </div> : ''}

                  {/* Alert Erro Email */}
                  {errorEmail ? <div className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{errorEmail}</div> :''}            

             </div>

             {/* Button Send Code */}
             <button className="bg-green-600 py-2 px-4 rounded-lg text-white font-semibold cursor-pointer">
              {isLoading? <i className="fa-solid fa-spinner fa-spin"></i> : 'Send A Code'}</button>

              {/* path To Login */}
              <h1 className="mt-2">Remember your password? <NavLink className='font-bold' to={'/Login'}>Login</NavLink></h1>
            </form>
            </div>
          </div>
    </>
}
