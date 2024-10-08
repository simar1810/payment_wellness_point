import React from "react";

function WeightIcon({h,w}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 26 26"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.985 6.668h4.063c.345 0 .625.28.625.625V22.71c0 .345-.28.625-.625.625h-17.5a.625.625 0 01-.625-.625V7.293c0-.345.28-.625.625-.625H8.61"
      ></path>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M17.754 8.052l.213-1.281a.633.633 0 000-.206l-.213-1.281a2.083 2.083 0 00-2.055-1.741h-4.804a2.083 2.083 0 00-2.055 1.74l-.213 1.282a.625.625 0 000 .206l.213 1.281a2.083 2.083 0 002.055 1.741H15.7a2.083 2.083 0 002.055-1.74zM13.299 9.792l-1.042-2.604M8.089 19.168h10.417"
      ></path>
    </svg>
  );
}

export default WeightIcon;