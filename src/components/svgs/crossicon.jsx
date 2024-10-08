import React from "react";

function CrossIcon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      //   stroke={c}
      //   strokeWidth={0.2}
      viewBox="0 0 21 21"
    >
      <path
        fill={c}
        strokeWidth={2}
        d="M18.003 3.227a.833.833 0 00-1.179 0l-6.079 6.078-6.078-6.079a.833.833 0 10-1.179 1.179l6.079 6.079-6.079 6.078a.833.833 0 001.179 1.179l6.078-6.079 6.079 6.079a.833.833 0 001.178-1.179l-6.078-6.078 6.079-6.079a.833.833 0 000-1.179z"
      ></path>
    </svg>
  );
}

export default CrossIcon;
