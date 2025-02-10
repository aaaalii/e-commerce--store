import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router';
import Detail from './pages/Detail';
import { useState } from 'react';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BuyNow from './pages/BuyNow';

export default function App(){

  // let [cartList, setCartList] = useState(new Map());
  let [customerList, setCustomerList] = useState([]);
  return (
    <>
      <h1 className='p-2'>
        E-commerce Store
      </h1>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            exact
            element={
              <Home/>
            }
          />
          <Route
            path='/product/:id'
            exact
            element={
              <Detail/>
            }
          />
          <Route
            path='/cart'
            exact
            element={
              <Cart/>
            }
          />
          <Route
            path='/checkout'
            exact
            element={
              <Checkout
                setCustomerList={setCustomerList}
                customerList={customerList}
               />
            }
          />
          <Route
            path='/buy-now'
            exact
            element={
              <BuyNow
                customerList={customerList}
                setCustomerList={setCustomerList}
              />
            }
          />
          <Route
            path='*'
            element={
              <h2>No page found</h2>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}