import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? new Map(JSON.parse(savedCart)) : new Map();
};

const initialState = {
  value: loadCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: 'cartList',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const { product, quantity } = action.payload;
      let tempQuantity = state.value.get(product);
      let updatedQuantity = tempQuantity ? tempQuantity + 1 : 1;
      state.value.set(product, quantity ? quantity : updatedQuantity);
      
      localStorage.setItem('cart', JSON.stringify(Array.from(state.value)));
    },
    resetCart: (state) => {
      state.value.clear();
      
      localStorage.removeItem('cart');
    },
  },
});

export const { updateCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
