"use client";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setOrder } from "./vpOrderSlice";

const initialState = {
  isLoggedIn: false,
  isAppConnected: false,
  isCopyToClipBoard: Cookies.get("copyToClipBoard") ?? false,
  featurePreference: Cookies.get("featurePreference") ?? "club",
  user: {},
  tabPreference: {
    clubClientDetailsTab: Cookies.get("clubClientDetailsTab") ?? "Subscription",
  },
  clubSystem: 0,
  orderDetails: {},

  // user: {
  //   name: "",
  //   profilePhoto: "",
  //   email: "",
  // },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsAppConnected: (state, action) => {
      state.isAppConnected = action.payload;
    },
    setFeaturePreference: (state, action) => {
      state.featurePreference = action.payload;
      Cookies.set("featurePreference", action.payload);
    },
    setUser: (state, action) => {
      // console.log("action.payload", action.payload);
      state.user = action.payload;
    },
    setDetailsTab: (state, action) => {
      // console.log("action.payload", action.payload);
      state.tabPreference[action.payload.tab] = action.payload.value;
      Cookies.set(action.payload.tab, action.payload.value);
    },
    setClubSystem: (state, action) => {
      // console.log("action.payload", action.payload);
      state.clubSystem = action.payload;
    },
    setIsCopyToClipBoard: (state, action) => {
      state.isCopyToClipBoard = action.payload;
    },
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
});

export const {
  setIsLoggedIn,
  setIsAppConnected,
  setFeaturePreference,
  setUser,
  setDetailsTab,
  setClubSystem,
  setIsCopyToClipBoard,
  setOrderDetails,
} = userSlice.actions;

export default userSlice.reducer;
