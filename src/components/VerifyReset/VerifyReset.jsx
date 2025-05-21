import React, { useState } from 'react'
import { useFormik } from 'formik'
import { data, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import * as Yub from 'yup'


export default function VerifyReset() {


   let navigate =  useNavigate() // path

  const [isLoading, setIsLoading] = useState(false)
  const [codeError, setcodeError] = useState('')


  // Verify Code Call API
  function verifyCode(){
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` ,
    {
        resetCode : formik.values.resetCode
    })
    .then(({data})=> {
      if(data.status === "Success"){
        toast.success('Success')
        setIsLoading(false)
        navigate('/ResetPassword')
      }
    }
    )
    .catch((error)=>{ 
      if(error.response.data.statusMsg === "fail")
      setIsLoading(false)
      toast.error(error.response.data.message)
      setcodeError(error.response.data.message)
    })
  }


  // Validation Reset Code
  let validationSchema = Yub.object().shape({
    resetCode : Yub.string().matches(/^[0-9]{6}$/ , 'Enter a 6 Number').required('Code is requried')
  })


  // get data from user
  let formik = useFormik({
    initialValues : {
      resetCode : ''
    },
    onSubmit : verifyCode,
    validationSchema
  })

  // Code CSS
  return <>
  {/* Main */}
    <div className="border border-black rounded-lg shadow-2xl w-fit mx-auto py-10 px-20"> 

            <div className="max-w-sm mx-auto">

              {/*Form */}
            <form onSubmit={formik.handleSubmit}>
             <div className="mb-5 mt-3">
                <h1 className='font-semibold'>Enter Code :</h1>
                <input onChange={formik.handleChange} name='resetCode' onBlur={formik.handleBlur} value={formik.values.resetCode}  type="tel"  className=" border border-gray-800 text-sm rounded-lg block w-full p-2.5 " />

                {/*Alert invalid  */}

                {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{formik.errors.resetCode}</div>: ''}

                {/* Alert Wrong reset Code */}
                {codeError ? <div className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{codeError}</div> : ''}

             </div>

             {/* Button Verify Code */}
             <button type='submit' className="bg-green-600 py-2 px-4 rounded-lg text-white font-semibold cursor-pointer">
              {isLoading? <i className="fa-solid fa-spinner fa-spin"></i> : 'Verify Code'}</button>
            </form>
            </div>
          </div>
  </>
}
