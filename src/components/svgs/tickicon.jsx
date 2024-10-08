import React from "react";

function TickIcon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 15 11"
    >
      <path
        stroke={c}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1.445 6.254l3.362 3.361 8.405-8.404"
      ></path>
    </svg>
  );
}

export default TickIcon;
