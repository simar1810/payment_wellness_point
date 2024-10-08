import React from "react";

function Editicon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        stroke={c}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.034 5.075L5.671 15.438c-.926.934-3.693 1.362-4.365.742-.673-.62-.184-3.387.742-4.321L12.41 1.495a2.532 2.532 0 013.58 3.58h.043z"
      ></path>
    </svg>
  );
}

export default Editicon;
