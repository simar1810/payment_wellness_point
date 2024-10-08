import React from "react";

function Clienticon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 15 17"
    >
      <path
        fill={c}
        d="M7.207 8.157a3.992 3.992 0 003.993-4.01A3.992 3.992 0 007.207.137 4.003 4.003 0 003.2 4.147c0 2.219 1.79 4.01 4.007 4.01zM0 13.771v1.604c0 .594.479.802 1.062.802h12.276c.586 0 1.062-.211 1.062-.802v-1.604c0-2.406-3.2-4.01-7.2-4.01S0 11.365 0 13.771z"
      ></path>
    </svg>
  );
}

export default Clienticon;
