import React, { useContext, useState } from "react";
import logo from '../../assets/Images/freshcart-logo.svg'
import {Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {

  let {cart} =  useContext(CartContext)
  let navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false);

  let {userLogin , setUserLogin} =  useContext(UserContext)

  function logOut(){
    localStorage.removeItem('userToken')
    setUserLogin(null)
    navigate('/Login')
  }


  return (
    <>
      <nav className=" bg-gray-400 fixed top-0 right-0 left-0 z-20">
        <div className="container mx-auto p-2 flex justify-between items-center">
          {/* Left */}
          <div className="flex items-center w-full lg:w-auto justify-between lg:justify-start">

            {/* Logo Fresh Cart*/}

            <Link to={'/'}>
              <img src={logo} alt="logo Fresh Cart" />
            </Link>  
            {/* Hamburger Icon (only on small screens) */}

            <button
              className="lg:hidden ml-4 text-3xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            {/* Main Links (hidden on small screens) */}
            <ul className="hidden lg:flex">
              {userLogin !== null ? <>
                <li><NavLink className="ps-3 font-semibold" to="/">Home</NavLink></li>
                <li><NavLink className="ps-3 font-semibold" to="/Categories">Categories</NavLink></li>
                <li><NavLink className="ps-3 font-semibold" to="/Brands">Brands</NavLink></li>
                <li><NavLink className="ps-3 font-semibold" to="/Products">Products</NavLink></li>
                <li><NavLink className="ps-3 font-semibold" to="/Cart">Cart</NavLink></li>
                <li><NavLink className="ps-3 font-semibold" to="/WishList">Wish List</NavLink></li>
              </> : null}
            </ul>
          </div>

          {/* Right (hidden on small screens) */}
          <div className="hidden lg:block">
            <ul className="flex">
              {userLogin === null ? <>
                <li><NavLink className="ps-2 font-semibold" to="/Register">Register</NavLink></li>
                <li><NavLink className="ps-2 font-semibold" to="/Login">Login</NavLink></li>
                 </>
                  :<>
                    <li className="relative">
                    <NavLink>
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    {cart?.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                    {cart.numOfCartItems}
                    </span>
                    )}
                    </NavLink>
                    </li>
                    <li onClick={logOut}><NavLink className="pl-2 font-semibold" style={{color:'red'}}>Logout</NavLink></li>
                   </>}
              <li className="ps-2">
                <i className="fa-brands ps-2 fa-instagram"></i>
                <i className="fa-brands ps-2 fa-facebook"></i>
                <i className="fa-brands ps-2 fa-linkedin"></i>
                <i className="fa-brands ps-2 fa-youtube"></i>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-gray-400 px-4 pb-4">
            <ul>
              {userLogin !== null ? <>
                <li><NavLink className="block py-2 font-semibold" to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
  
                <li><NavLink className="block py-2 font-semibold" to="/Categories" onClick={() => setMenuOpen(false)}>Categories</NavLink></li>
  
                <li><NavLink className="block py-2 font-semibold" to="/Brands" onClick={() => setMenuOpen(false)}>Brands</NavLink></li>
  
                <li> <NavLink className="block py-2 font-semibold" to="/Products" onClick={() => setMenuOpen(false)}
                  >Products </NavLink></li>
                  
                <li> <NavLink className="block py-2 font-semibold" to="/Cart" onClick={() => setMenuOpen(false)}
                >Cart</NavLink></li>

                <li> <NavLink className="block py-2 font-semibold" to="/WishList" onClick={() => setMenuOpen(false)}
                >Wish List</NavLink></li>
              
              </> : null}

                 {userLogin === null ? <>
                <li><NavLink className="ps-2 font-semibold" to="/Register">Register</NavLink></li>
                <li><NavLink className="ps-2 font-semibold" to="/Login">Login</NavLink></li>
                 </>
                  :<>
                    <li className="relative">
                    <NavLink>
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    {cart?.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                    {cart.numOfCartItems}
                    </span>
                    )}
                    </NavLink>
                    </li>
                    <li onClick={logOut}><NavLink className="pl-2 font-semibold" style={{color:'red'}}>Logout</NavLink></li>
                   </>}


              <li className="flex space-x-2 py-2">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-youtube"></i>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
