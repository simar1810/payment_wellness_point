"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const { setBrands } = brandSlice.actions;

export default brandSlice.reducer;
