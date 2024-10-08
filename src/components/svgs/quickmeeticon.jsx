import React from "react";

function QuickMeetIcon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 60 60"
    >
      <path
        fill={c}
        d="M30.001 59.57A29.571 29.571 0 1159.573 30 29.606 29.606 0 0130 59.57zm0-54.857A25.286 25.286 0 1055.287 30 25.32 25.32 0 0030 4.713z"
      ></path>
      <path
        fill={c}
        d="M40.061 32.143H29.998A2.143 2.143 0 0127.855 30V18.137a2.143 2.143 0 114.286 0v9.72h7.92a2.143 2.143 0 010 4.286z"
      ></path>
    </svg>
  );
}

export default QuickMeetIcon;
