import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { resetCart } from "../store/cartSlice";

export default function Checkout({ setCustomerList, customerList }){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartList.value);
  let totalPrice = 0;

  function checkout(e){
    e.preventDefault();
    if((name.trim() === '') || (email.trim() === '') || (address.trim() === '')){
      alert('Name, email and address can not be empty');
      return;
    }
    dispatch(resetCart());
    setCustomerList([
      ...customerList,
      {
        name,
        email,
        address
      }
    ])
    alert('Order confirmed');
    navigate('/');
  }

  return (
    <>
      <div className="p-3">
        {
          (cartList?.size === 0) ? (
            <div>
              <div>No product added to Cart</div>
              <button className="btn btn-primary" onClick={() => {
                navigate('/')
              }}>Home</button>
            </div>
          ) : (
            <div>
              <div>
                {
                  [...cartList.entries()].map(([key, value], index) => {
                    totalPrice += Number((key['price'] * value).toFixed(2));
                    return (
                      <div className="mt-2">
                        <div>Product: {key['title']}</div>
                        <div>Quantity: {value}</div>
                        <div>Price: {(key['price'] * value).toFixed(2)}</div>
                      </div>
                    )
                })
                }
              </div>
              <div>
                <form onSubmit={(e) => (
                  checkout(e)
                )}>
                  <div>
                    Your name: <input type="text" name="username" value={name} onChange={(e) => {
                      setName(e.target.value)
                    }} required/>
                  </div>
                  <div>
                    Your email: <input type="email" name="email" value={email} onChange={(e) => {
                      setEmail(e.target.value)
                    }} required/>
                  </div>
                  <div>
                    Your address: <input type="text" name="address" value={address} onChange={(e) => {
                      setAddress(e.target.value)
                    }} required/>
                  </div>
                  <button type="submit" className="btn btn-success">Checkout</button>
                </form>
              </div>
              <div className="mt-4">Total Price: {totalPrice}</div>
            </div>
          )
        }
      </div>
    </>
  );
}