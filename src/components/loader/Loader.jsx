"use client";
import React from "react";
import Spinner from "./Spinner";

export default function Loader({ py }) {
  return (
    <div className={`w-full py-${py}  items-center justify-center flex my-36`}>
      <Spinner color="green" />
    </div>
  );
}
