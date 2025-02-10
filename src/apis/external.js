import axios from "axios";

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getAllProducts = async() => {
  let response;

  try {
    response = await api.get('/products');
  } catch (error) {
    return error;
  }

  return response;
}

export const getCategories = async() => {
  let response;

  try {
    response = await api.get('products/categories');
  } catch (error) {
    return error;
  }

  return response;
}

export const getProductsByCategory = async category => {
  let response;

  try {
    response = await api.get(`/products/category/${category}`);
  } catch (error) {
    return error;
  }

  return response;
}

export const getProductById = async id => {
  let response;

  try {
    response = await api.get(`/products/${id}`);
  } catch (error) {
    return error;
  }

  return response;
}