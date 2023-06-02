import { Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useParams } from 'react-router-dom';
import "./cart.css";
import { LoginContext } from '../context/ContextProvider';
const Cart = () => {

  const { id } = useParams("");

  const history = useNavigation("");

  const {account,setAccount} =   useContext(LoginContext);
  const [inddata, setInddata] = useState([]);
  console.log(inddata);

  const getinddata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    });
    const data = await res.json();

    if (res.status !== 201) {
      console.log("no data available")
    } else {
      console.log("get data");
      setInddata(data);
    }

  }

  useEffect(() => {
    getinddata();
  }, [id]);

  //add cart function
const addtocart = async(id)=>{
  const checkres = await fetch(`/addcart/:${id}`,{
    method: "POST",
      headers: {
        Accept:"application/json",
        "Content-type": "application/json"
      },
      body:JSON.stringify({
        inddata
      }),
      credentials:"include"
  });


  
  const data1= await checkres.json();
  console.log(data1);

  if(checkres.status===401 || !data1){
    console.log("Invalid user");
    alert("Invalid User");
  }else{
   // alert("data added in your cart");
   history("/buynow");
    setAccount(data1);
  }
}


  return (
    <div className='cart_section'>
      {inddata && Object.keys(inddata).length &&
        <div className='cart_container'>
          <div className='left_cart'>
            <img src={inddata.url} alt='cart_img' />
            <div className='cart_btn'>
              <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
              <button className='cart_btn2'>Buy Now</button>
            </div>
          </div>
          <div className='right_cart'>
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className='mrp'>M.R.P :{inddata.price.mrp}</p>
            <p>Deal of The Day : <span style={{ color: "#B12704" }}> {inddata.price.cost}.00</span></p>
            <p>You Save : <span style={{ color: "#B12704" }}> {inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span></p>

            <div className='discount_box'>
              <h5>Discount: <span style={{ color: "#111" }}>{inddata.discount}</span></h5>
              <h4>Free Delivery <span style={{ color: "#111", fontWeight: 600 }}>Oct 8-21</span> Details</h4>
              <p>Fastest Delivery: <span style={{ color: "#111", fontWeight: 600 }}>Tommorow 11Am</span></p>
            </div>
            <p className='description'>About the Item :<span style={{ color: "#565959", fontSize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>{inddata.description}</span></p>
          </div>
        </div>
      }
    </div>
  )
}

export default Cart;
