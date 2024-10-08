import React from "react";

function ExportIcon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 20 23"
    >
      <path
        fill={c}
        d="M9.271 21.497a1 1 0 002-.01l-2 .01zm1.634-15.899a1 1 0 00-1.414.007l-6.335 6.393a1 1 0 001.421 1.408l5.63-5.683 5.684 5.63a1 1 0 101.407-1.42l-6.393-6.335zm.367 15.89L11.2 6.304l-2 .01.07 15.183 2-.01z"
      ></path>
      <path
        stroke={c}
        strokeLinecap="round"
        strokeWidth="2"
        d="M18.648 1.055l-16.923.078"
      ></path>
    </svg>
  );
}

export default ExportIcon;
