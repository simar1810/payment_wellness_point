import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

export const vpOrderSlice = createSlice({
  name: "vpOrder",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = vpOrderSlice.actions;

export default vpOrderSlice.reducer;
