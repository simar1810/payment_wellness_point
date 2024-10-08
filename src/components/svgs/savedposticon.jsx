import React from "react";

function Savedposticon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 14 18"
    >
      <path
        stroke={c}
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1.065 3.784c0-.934 0-1.4.182-1.757.16-.313.415-.568.728-.728.357-.182.824-.182 1.757-.182h6.333c.934 0 1.4 0 1.757.182.314.16.569.415.728.728.182.357.182.823.182 1.757v12.333L6.9 11.95l-5.834 4.167V3.784z"
      ></path>
    </svg>
  );
}

export default Savedposticon;
