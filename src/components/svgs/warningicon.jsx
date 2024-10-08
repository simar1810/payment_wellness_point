import React from "react";

function WarningIcon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={c}
        fillRule="evenodd"
        d="M.27 10.142a9.583 9.583 0 0119.167 0 9.583 9.583 0 01-19.167 0zm8.625.958a.958.958 0 001.917 0V6.31a.958.958 0 00-1.917 0V11.1zm1.917 2.864a.958.958 0 00-1.917 0v.011a.958.958 0 001.917 0v-.01z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default WarningIcon;
