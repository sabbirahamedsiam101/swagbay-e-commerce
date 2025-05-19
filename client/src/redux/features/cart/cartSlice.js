import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
        toast.success("Item added to cart");
        // console.log("Item added to cart" , action.payload);
      } else {
        // console.log("Item already added to cart");
        toast.error("Item already added to cart");
      }
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    updateQuentity: (state, action) => {
      const products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (action.payload.type === "decrement") {
            if (product.quantity > 1) {
              product.quantity -= 1;
            }
          }
        }
        return product;
      });
      // state.products = products;
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    removeItem: (state, action) => {
      console.log(action.payload);
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
  },
});

// utilities

export const setSelectedItems = (state) => {
  return state.products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
};

export const setTotalPrice = (state) => {
  return state.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};

export const setTax = (state) => {
  const total = setTotalPrice(state);
  return total * state.taxRate;
};

export const setGrandTotal = (state) => {
  const total = setTotalPrice(state);
  return total + total * state.taxRate;
};

export const { addToCart, updateQuentity, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
