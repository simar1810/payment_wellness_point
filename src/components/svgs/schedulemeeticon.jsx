import React from "react";

function ScheduleMeetIcon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 56 56"
    >
      <path
        fill={c}
        d="M55.5 28c0 .886-.042 1.763-.124 2.628a17.536 17.536 0 00-4.908-3.46C50.03 15.138 40.138 5.519 28 5.519 15.583 5.517 5.517 15.582 5.517 28c0 12.139 9.62 22.03 21.652 22.468a17.536 17.536 0 003.459 4.908A27.83 27.83 0 0128 55.5C12.812 55.5.5 43.188.5 28S12.812.5 28 .5 55.5 12.812 55.5 28z"
      ></path>
    </svg>
  );
}

export default ScheduleMeetIcon;
