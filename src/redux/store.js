"use client";

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import brandSlice from "./slices/brandSlice";
import checkoutSlice from "./slices/checkoutSlice";
import mealKitSlice from "./slices/mealKitSlice";
import vpOrderSlice from "./slices/vpOrderSlice";
import volumePointCheckoutSlice from "./slices/volumePointCheckout";

export const store = configureStore({
  reducer: {
    user: userSlice,
    brand: brandSlice,
    checkout: checkoutSlice,
    mealKit: mealKitSlice,
    vpOrder: vpOrderSlice,
    volumePointCheckout: volumePointCheckoutSlice,
  },
});
