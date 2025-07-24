import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Register() {


  // import User Context
  let {setUserLogin} =  useContext(UserContext)


  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate(); //Path


  // Register Call API
  function callRegister(formValue) {

    setIsLoading(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValue)
      .then((responese) => {
        if (responese.data.message === "success") {
          localStorage.setItem("userToken", responese.data.token);
          setIsLoading(false);
          navigate("/Login");
          setUserLogin(responese.data.token)
        }
      })
      .catch((error) => {
        setapiError(error.response.data.message);
        setIsLoading(false);
      });
  }


  // Validaton Register
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(10, "Name must be at most 10 characters")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid phone number")
      .required("Number is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,9}$/,"Password must start with an uppercase letter and be 5-20 characters long")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });


  // get data from User
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: callRegister,
    validationSchema,
  });


  // Code CSS
  return (
    <>
      <div className="container max-w-xl mx-auto px-2 sm:px-4 md:px-8">
        {/* Header */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-3">Register Now</h1>

        {/*Alert Error Register  */}
        {apiError ? <div className="p-2 sm:p-4 mb-4 text-xs sm:text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert"> {apiError} </div> : ""}


        {/* Form Register */}
        <form onSubmit={formik.handleSubmit}>

          {/*Input Name */}
          <div className="relative z-0 w-full mb-4 sm:mb-5 group">
              <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" id="name"
              value={formik.values.name} className="block py-2 px-2 sm:py-2.5 sm:px-0 w-full text-xs sm:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
              <label htmlFor="name" className="peer-focus:font-medium absolute text-xs sm:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
          </div>

          {/* Alert Name */}

          {formik.errors.name && formik.touched.name ? <div className="p-2 sm:p-4 mb-4 text-xs sm:text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert"> {formik.errors.name} </div> : ""}

          {/*Input Email */}
          <div className="relative z-0 w-full mb-4 sm:mb-5 group">
              <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email"
              value={formik.values.email}className="block py-2 px-2 sm:py-2.5 sm:px-0 w-full text-xs sm:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>

             <label htmlFor="email" className="peer-focus:font-medium absolute text-xs sm:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your Email : </label>
          </div>

          {/* ALert Email */}
          {formik.errors.email && formik.touched.email ? <div className="p-2 sm:p-4 mb-4 text-xs sm:text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert"> {formik.errors.email} </div> : ""}


          {/*Input Phone */}
          <div className="relative z-0 w-full mb-4 sm:mb-5 group">
              <input type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone"
              value={formik.values.phone} className="block py-2 px-2 sm:py-2.5 sm:px-0 w-full text-xs sm:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>

             <label htmlFor="phone" className="peer-focus:font-medium absolute text-xs sm:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your Phone :</label>
          </div>

          {/* Alert Phone */}
          {formik.errors.phone && formik.touched.phone ? <div className="p-2 sm:p-4 mb-4 text-xs sm:text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert"> {formik.errors.phone} </div> : ""}


          {/*input Password */}
          <div className="relative z-0 w-full mb-4 sm:mb-5 group">
              <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="password"
              id="password" value={formik.values.password} className="block py-2 px-2 sm:py-2.5 sm:px-0 w-full text-xs sm:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
              <label htmlFor="password" className="peer-focus:font-medium absolute text-xs sm:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your Password :
              </label>
          </div>

          {/* Alert Password */}
          {formik.errors.password && formik.touched.password ? <div className="p-2 sm:p-4 mb-4 text-xs sm:text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert"> {formik.errors.password}</div> : ""}


          {/*Input rePassword */}
          <div className="relative z-0 w-full mb-4 sm:mb-5 group">
            <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" id="rePassword" value={formik.values.rePassword} className="block py-2 px-2 sm:py-2.5 sm:px-0 w-full text-xs sm:text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"/>
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-xs sm:text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Your rePassword :</label>
          </div>

          {/* Alert rePassowrd */}
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-2 sm:p-4 mb-4 text-xs sm:text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">{formik.errors.rePassword}
          </div> : ""}



          <div className="flex flex-col sm:flex-row justify-start items-center gap-2">

            {/* Button Register */}
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Register Now"}
            </button>

            {/* path To login */}
            <p className="pl-0 sm:pl-2 font-semibold"> You Have Account Ready?<span> <NavLink className="font-bold text-green-800" to="/Login">Login</NavLink></span></p>
          </div>
        </form>
      </div>
    </>
  );
}
