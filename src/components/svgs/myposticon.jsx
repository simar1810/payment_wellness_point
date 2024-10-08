import React from "react";

function Myposticon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 18 14"
    >
      <path
        fill={c}
        d="M.362.242v11.25h2.5v2.5h15V2.742h-2.5v-2.5h-15zm1.25 1.25h12.5v8.75h-12.5v-8.75zm1.25 1.25v6.25h10v-6.25h-10zm1.25 1.25h7.5v3.75h-7.5v-3.75zm11.25 0h1.25v8.75h-12.5v-1.25h11.25v-7.5z"
      ></path>
    </svg>
  );
}

export default Myposticon;
