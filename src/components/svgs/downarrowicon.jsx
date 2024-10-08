import React from "react";

function Downarrowicon({ h, w,c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 16 10"
    >
      <path
        fill={c}
        fillRule="evenodd"
        strokeWidth={.5}
        d="M9.042 8.806a1.25 1.25 0 01-1.768 0l-6.25-6.25A1.25 1.25 0 012.792.788l5.366 5.366L13.524.788a1.25 1.25 0 011.768 1.768l-6.25 6.25z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Downarrowicon;
