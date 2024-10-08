import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  volumePointCheckout: {
    brand: "",
    client: {},
    products: [],
    order: "",
  },
};

export const volumePointCheckoutSlice = createSlice({
  name: "volumePointCheckout",
  initialState,
  reducers: {
    setVolumePointCheckout: (state, action) => {
      // console.log("action.payload", action.payload);
      if (action.payload.client) {
        state.volumePointCheckout.client = action.payload.client;
      }
      if (action.payload.brand) {
        state.volumePointCheckout.brand = action.payload.brand;
      }
      if (action.payload.products) {
        state.volumePointCheckout.products = action.payload.products;
      }
    },
  },
});

export const { setVolumePointCheckout } = volumePointCheckoutSlice.actions;

export default volumePointCheckoutSlice.reducer;
