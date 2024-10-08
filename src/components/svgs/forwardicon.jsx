import React from "react";

function ForwardIcon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={h}
      height={w}
      fill="none"
      viewBox="0 0 26 26"
    >
      <path
        stroke={c}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14.256 16.852l3.75-3.75m0 0l-3.75-3.75m3.75 3.75h-10m16.25 0c0 6.213-5.037 11.25-11.25 11.25s-11.25-5.037-11.25-11.25c0-6.214 5.037-11.25 11.25-11.25s11.25 5.036 11.25 11.25z"
      ></path>
    </svg>
  );
}

export default ForwardIcon;
