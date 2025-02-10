import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../store/cartSlice";

export default function Cart(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartList.value);
  let totalPrice = 0;

  function updateQuantity(product, quantity){
    dispatch(updateCart({'product': product, 'quantity': quantity}))
  }

  function removeFromCart(product){
    
  }

  return (
    <>
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <h3>Cart Products</h3>
          <div>
            <button className="btn btn-primary me-2" onClick={() => {
              navigate('/');
            }}>Home</button>
            <button className="btn btn-primary" onClick={() => {
              navigate('/checkout')
            }}>Proceed to checkout</button>
          </div>
        </div>
        <div className="mt-2">
          {
            (cartList?.size === 0) ? 'No Product added to cart' : ([...cartList.entries()].map(([key, value], index) => {
              totalPrice += Number((key['price'] * value).toFixed(2));
              return (
                <div key={index} className="bg-dark text-light p-2 rounded mt-2 d-flex justify-content-between align-items-center">
                  <div>
                    <div>Product Name: {key['title']}</div>
                    Quantity: <input type="number" min='1' value={value} onChange={(e) => {
                      updateQuantity(key, e.target.value);
                    }}/>
                    <div>Price: {(key['price'] * value).toFixed(2)}</div>
                  </div>
                  <button className="btn btn-danger h-25" onClick={() => {
                    removeFromCart(key);
                  }}>Remove</button>
                </div>
              )
            }))
          }
        </div>
        <div>Total Price: {totalPrice}</div>
      </div>
    </>
  );
}