import React from "react";

function ReccMeetIcon({ h, w, c }) {
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
        d="M42.75 59.5L31 52.5l6.75-12L42 43l-4.25 7.75 7.5 4.5-2.5 4.25zm-28.5-32L10 20l-7.25 4.25L.25 20 12 13l6.75 12-4.5 2.5zM55 15H41.25v-5H50V1.25h5V15z"
      ></path>
      <path
        fill={c}
        d="M38.5 53.75l-1-5c10-2.25 17.25-11.25 17.25-21.5 0-1.5-.25-3.25-.5-4.75l5-1c.5 2 .75 4 .75 5.75 0 13-9 24-21.5 26.5zM24.5 53.25c-11.25-3.5-19-13.75-19-25.75 0-3.25.5-6.5 1.75-9.5L12 19.75c-1 2.5-1.5 5-1.5 7.75 0 9.75 6.25 18 15.25 21l-1.25 4.75zM49 12.5C44.75 7.75 38.75 5 32.5 5c-5.25 0-10.25 2-14.25 5.25L15 6.5C19.75 2.25 26 0 32.5 0c7.75 0 15 3.25 20.25 9L49 12.5z"
      ></path>
    </svg>
  );
}

export default ReccMeetIcon;
