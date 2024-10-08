import React from "react";

function Backicon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 20 17"
    >
      <path
        fill={c}
        d="M18.864 7.445H4.254l4.603-4.603c.5-.5.5-1.301 0-1.752-.5-.5-1.301-.5-1.752 0L.35 7.795c-.25.25-.35.6-.35.9 0 .301.1.652.35.901l6.705 6.705c.5.5 1.301.5 1.752 0 .5-.5.5-1.3 0-1.751L4.203 9.946h14.611c.65 0 1.15-.55 1.15-1.25s-.45-1.251-1.1-1.251z"
      ></path>
    </svg>
  );
}

export default Backicon;
