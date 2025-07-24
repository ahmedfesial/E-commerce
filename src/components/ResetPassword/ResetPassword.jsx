import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yub from 'yup'

export default function ResetPassword() {

      let naviaget =  useNavigate() //Path  


      const [isLoading, setisLoading] = useState(false)
      const [errorReset, seterrorReset] = useState('')


    //Change Pssword Call API 
    function changePassword(){

      setisLoading(true)

      axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
       {
        email : formik.values.email , 
        newPassword : formik.values.newPassword
       })
       .then(()=> {
        toast.success('The password has been changed successfully')
        setisLoading(false)
        naviaget('/Login')
       })
       .catch((error)=>{
        setisLoading(false)
        toast.error(error.response.data.message)
        seterrorReset(error.response.data.message)
       })
    }


    // Validation email & password
    let validationSchema = Yub.object().shape({
      email : Yub.string().email('Please enter a valid email address.').required('ُEmail is Required'),
      newPassword : Yub.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , "Password must start with an uppercase letter and be 6-11 characters long, using only lowercase letters and numbers").required('Pssword is required')
    })


    // get data from user
    let formik = useFormik({
      initialValues : {
        email : '',
        newPassword : ''
      },
      onSubmit : changePassword,
      validationSchema
    })  


  // Code CSS
  return <>
    <section>
      <div className="flex flex-col items-center justify-start mt-1.5 px-6 py-8 mx-auto mb-8 lg:py-0">

         <div className="w-[400px]  bg-[#f6f6f6] rounded-lg md:mt-0 sm:max-w-md sm:p-8 shadow hover:shadow-2xl duration-300 transition-all">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl ">Change Password</h2>

              {/* Error Email */}
              {errorReset ? <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{errorReset}</div> : ''}

              {/* Form Reset Password */}
              <form onSubmit={formik.handleSubmit} className="lg:mt-5 md:space-y-5">


              {/*Input Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email :</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5  dark:border-gray-600 "/>
              </div>

              {/*Input Password */}
              <div>
                <label htmlFor="Password" className="block mb-2 text-sm font-medium">Enter New Password :</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" name="newPassword" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 " />
              </div>
        
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-medium rounded-lg text-sm mt-6 md:mt-0 px-5 py-2.5 text-center">{isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Reset Password'}</button>
           </form>
           </div>
           </div>
         </section>

  </>
}
