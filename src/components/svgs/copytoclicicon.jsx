import React from "react";

function CopyToClickIcon({ h, w, c = "white" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 27 29"
    >
      <path
        stroke={c}
        strokeWidth="1.5"
        d="M5.508 13.379c0-3.77 0-5.657 1.172-6.828 1.17-1.172 3.057-1.172 6.828-1.172h4c3.77 0 5.657 0 6.828 1.172 1.172 1.17 1.172 3.057 1.172 6.828v6.667c0 3.77 0 5.657-1.172 6.828-1.17 1.172-3.057 1.172-6.828 1.172h-4c-3.77 0-5.658 0-6.828-1.172-1.172-1.171-1.172-3.058-1.172-6.828v-6.667z"
      ></path>
      <path
        stroke={c}
        strokeWidth="1.5"
        d="M5.508 24.046a4 4 0 01-4-4v-8c0-5.028 0-7.543 1.562-9.104 1.562-1.563 4.076-1.563 9.104-1.563h5.334a4 4 0 014 4"
        opacity="0.5"
      ></path>
    </svg>
  );
}

export default CopyToClickIcon;
