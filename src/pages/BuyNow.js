import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function BuyNow({setCustomerList, customerList}){
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { product } = location.state || {};

  function checkout(e){
    e.preventDefault();
    if((name.trim() === '') || (email.trim() === '') || (address.trim() === '')){
      alert('Name, email and address can not be empty');
      return;
    }
    const check = window.confirm('Order Confirm?');
    if (!check) return;
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
      <div className="mt-2 p-3">
        <div className="">
          <div>Product: {product['title']}</div>
          <div>Quantity: <input type="number" value={quantity} onChange={(e) => {
            setQuantity(e.target.value)
          }}/></div>
          <div>Price: {(product['price'] * quantity).toFixed(2)}</div>
        </div>
        <div className="mt-4">
          <form onSubmit={(e) => (
            checkout(e)
          )}>
            <div>
              Your name: <input type="text" min={1} name="username" value={name} onChange={(e) => {
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
      </div>
    </>
  );
}