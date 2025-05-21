import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let CartContext = createContext()

export default function CartContextProvider(props){


    const [cart, setCart] = useState(null)


    let headers = {
        token : localStorage.getItem('userToken')
    }

    function addProductToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
            {
                productId : productId 
            },
            {
                headers
            }
        )
        .then((response)=> response)
        .catch((error)=> error)
    }


    function userLoggedCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then((response)=> response)
        .catch((error)=> error)
    }

    function removeCart(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            headers
        }
        )
        .then((response)=> response)
        .catch((error)=> error)
    }

    function removeAllCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then((response)=> response)
        .catch((error)=> error)
    }

    function updateCart(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
        {
            count : count
        },
        {
            headers
        }
        )
        .then((response)=> response)
        .catch((error)=> error)
    }

    function checkOutSession(cartId , url , formValue){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
            shippingAddress : formValue
        },
        {
            headers
        }
        )
        .then((response)=> response)
        .catch((error)=> error)
    }

    function getAllOrders(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
        .then((response)=> response)
        .catch((error)=> error)
    }

    async function getCart(){
        let response = await userLoggedCart()
        setCart(response.data)
    }


    useEffect(()=>{
        getCart()
    },[])



    return <CartContext.Provider value={{addProductToCart , getAllOrders , checkOutSession  , cart , setCart , userLoggedCart , removeCart , removeAllCart , updateCart}}>
            {props.children}
    </CartContext.Provider>

}