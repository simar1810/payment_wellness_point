import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkout: {
    brand: "",
    client: {},
    products: [],
    order: "",
  },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckout: (state, action) => {
      // console.log(action.payload);
      if (action.payload.client) {
        state.checkout.client = action.payload.client;
      }
      if (action.payload.brand) {
        state.checkout.brand = action.payload.brand;
      }
      if (action.payload.products) {
        state.checkout.products = action.payload.products;
      }
      if (action.payload.order) {
        state.checkout.order = action.payload.order;
      }
    },
  },
});

export const { setCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
