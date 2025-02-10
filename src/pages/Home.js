import { useEffect, useState } from "react"
import { getAllProducts, getCategories, getProductsByCategory } from "../apis/external";
import ProductCard from "../components/ProductCard";
import Dropdown from 'react-bootstrap/Dropdown';
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router";

export default function Home(){

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchList, setSearchList] = useState([]);

  function search(key){
    let searchList = [...products].filter((product) => (
      product['title'].toLowerCase().includes(key.toLowerCase())
    ));

    setSearchList(searchList);
  }

  async function getData() {
    let productsResponse = await getAllProducts();
    
    setProducts(productsResponse['data']);
  }

  async function categoriesAPI() {
    let categoriesResponse = await getCategories();
    setCategories(categoriesResponse['data']);
  }
  useEffect(() => {

    getData();
    categoriesAPI();
  }, []);

  function sortLowToHigh(){
    let list = searchList.length === 0 ? 0 : 1;
    let sorted = (searchList.length !== 0 ? [...searchList] : [...products]).sort((a, b) => (
      parseFloat(a['price']) - parseFloat(b['price'])
    ));

    if(list === 0) {
      setProducts(sorted);
    } else {
      setSearchList(sorted);
    }
  }

  function sortHighToLow(){
    let list = searchList.length === 0 ? 0 : 1;

    let sorted = (searchList.length !== 0 ? [...searchList] : [...products]).sort((a, b) => (
      parseFloat(b['price']) - parseFloat(a['price'])
    ));

    if(list === 0) {
      setProducts(sorted);
    } else {
      setSearchList(sorted);
    }
  }

  function sortByRating(){
    let list = searchList.length === 0 ? 0 : 1;

    let sorted = (searchList.length !== 0 ? [...searchList] : [...products]).sort((b, a) => (
      parseFloat(a['rating']['rate']) - parseFloat(b['rating']['rate'])
    ));

    if(list === 0) {
      setProducts(sorted);
    } else {
      setSearchList(sorted);
    }
  }

  async function getProductByCategory(category){
    setProducts([]);
    let response = await getProductsByCategory(category);
    setProducts(response['data']);
  }

  if(products.length === 0){
    return (
      <div className="d-flex justify-content-center align-items-center full-height">
        <TailSpin/>
      </div>
    )
  }

  return (
    <>
      <div className="home-page p-3 ps-5 pe-5">
        <div className="d-flex justify-content-between">
          <h2>
            Home
          </h2>
          <div>
            <input type="text" placeholder="Search product" className="p-1 ps-2 rounded" onChange={(e) => (search(e.target.value))}/>
          </div>
          <div className="d-flex">
            <div className="me-2">
              <Dropdown>
                <Dropdown.Toggle id='sort-dropdown'>
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={sortLowToHigh}>
                    Price (Low to High)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={sortHighToLow}>
                    Price (High to Low)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={sortByRating}>
                    Rating (Best to Worst)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
            <Dropdown>
                <Dropdown.Toggle id='sort-dropdown'>
                  Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={getData}>
                    All products
                  </Dropdown.Item>
                  {
                    categories.map((category, index) => (
                      <Dropdown.Item key={index} onClick={() => (getProductByCategory(category))}>
                        {category}
                      </Dropdown.Item>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <button className="btn btn-primary ms-3" onClick={() => {
                navigate('/cart')
              }}>My Cart</button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap mt-3">
          {
            (searchList.length !== 0 ? searchList : products).map((product, index) => (
              <div className="mb-3 me-3" key={product['id']}>
                <ProductCard
                  title={product['title']}
                  description={product['description']}
                  image={product['image']}
                  category={product['category']}
                  rating={product['rating']['rate']}
                  ratingCount={product['rating']['count']}
                  price={product['price']}
                  id={product['id']}
                />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}