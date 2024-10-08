import React from "react";

function ClockIcon({ h, w, c = "#86C52F" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 22 21"
    >
      <path
        fill={c}
        d="M10.982.387C5.439.387.932 4.962.932 10.59c0 5.628 4.507 10.204 10.05 10.204 5.542 0 10.049-4.576 10.049-10.204C21.03 4.962 16.524.387 10.98.387zm4.506 12.033H9.63V4.87h1.803v5.491h4.055v2.06z"
      ></path>
    </svg>
  );
}

export default ClockIcon;
