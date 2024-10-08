"use client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Footer from "../Footer";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { analytics } from "@/helpers/firebase";

export default function RootProvider({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      analytics;
    }
  }, []);

  return (
    <Provider store={store}>
      <Toaster />
      {children}
      {/* <Footer /> */}
    </Provider>
  );
}
