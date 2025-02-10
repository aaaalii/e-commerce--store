import { useEffect, useState } from "react";
import { getProductById } from "../apis/external";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from 'react-redux'
import { updateCart } from "../store/cartSlice";
export default function Detail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  let [product, setProduct] = useState({});
  const navigate = useNavigate();

  async function getProduct() {
    let response = await getProductById(id);
    setProduct(response["data"]);
  }

  useEffect(() => {
    getProduct();
  }, []);

  function add(){
    let payload = {
      'product': product,
      'quantity': 0
    }
    dispatch(updateCart(payload));
  }

  return (
    <>
      <div className="p-3 pb-3 bg-dark text-light m-3 rounded">
        <div className="d-flex justify-content-between">
          <div>Product Details</div>
          <div>
          <button className="btn btn-primary ms-3" onClick={() => {
                  navigate('/cart')
          }}>My Cart</button>
        </div>
        </div>
        <div className="mt-3 p-3">
          <img src={product["image"]} width="200px" height="200px" alt="" />
          <div>Product name: {product["title"]}</div>
          <div>Product description: {product["description"]}</div>
          <div>Product price: {product["price"]} $</div>
          <div>Product rating: {product?.rating?.rate}</div>
          <div>Number of reviews: {product?.rating?.count}</div>
          <button className="btn btn-primary mt-2" onClick={() => {
            navigate('/');
          }}>Home</button>
          <div className="position-relative float-end mt-2">
            <button className="btn btn-primary me-4" onClick={() => {
              add();
              alert('Product added to cart');
            }}>Add to cart</button>
            <button className="btn btn-primary" onClick={() => {
              navigate('/buy-now', { state: { product } });
            }}>Buy now</button>
          </div>
        </div>
      </div>
    </>
  );
}
