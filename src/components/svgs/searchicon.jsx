import React from "react";

function Searchicon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 18 18"
      // strokeWidth={0.5}
      // stroke={c} // Set the stroke color
    >
      <path
        fill={c}
        d="M8.031.473a7.354 7.354 0 00-5.953 3.044 7.395 7.395 0 00-1.043 6.617 7.37 7.37 0 004.726 4.737c2.24.73 4.694.34 6.6-1.049l3.667 3.676a1.154 1.154 0 001.933-.52 1.16 1.16 0 00-.3-1.118l-3.666-3.675a7.388 7.388 0 00-1.032-9.824A7.344 7.344 0 008.032.473zm0 12.444a5.045 5.045 0 01-3.572-1.483 5.07 5.07 0 010-7.163 5.045 5.045 0 017.145 0 5.07 5.07 0 01-.002 7.16 5.05 5.05 0 01-3.57 1.486z"
      ></path>
    </svg>
  );
}

export default Searchicon;
