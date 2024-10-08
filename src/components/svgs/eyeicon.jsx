import React from "react";

function EyeIcon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 27 21"
    >
      <path
        stroke={c}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.395 10.395a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      ></path>
      <path
        stroke={c}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13.646 1.645c-5.597 0-10.334 3.678-11.927 8.75 1.593 5.07 6.33 8.75 11.928 8.75 5.597 0 10.334-3.68 11.927-8.75-1.593-5.072-6.33-8.75-11.928-8.75z"
      ></path>
    </svg>
  );
}

export default EyeIcon;
