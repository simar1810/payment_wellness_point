import React from "react";

function Menuicon({h,w}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 6 21"
    >
      <path
        fill="#BBB"
        fillRule="evenodd"
        d="M5.217 3.324a2.609 2.609 0 11-5.217 0 2.609 2.609 0 015.217 0zm0 7.39a2.609 2.609 0 11-5.217 0 2.609 2.609 0 015.217 0zm-2.608 10a2.609 2.609 0 100-5.217 2.609 2.609 0 000 5.218z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Menuicon;