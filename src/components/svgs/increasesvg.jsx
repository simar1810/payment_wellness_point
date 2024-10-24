import React from "react";

function Increasesvg({ h, w, c }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={w}
      height={h}
      fill='none'
      viewBox='0 0 19 10'
    >
      <path
        fill={c}
        d='M18.166.2h-4.09a.233.233 0 00-.217.14.225.225 0 00.05.25l1.604 1.567-4.962 5.93L6.06 3.695a.226.226 0 00-.172-.067.236.236 0 00-.167.076L.46 9.417a.225.225 0 00.008.315c.088.085.228.09.321.01l5.095-4.429 4.52 4.42a.237.237 0 00.165.066h.009a.235.235 0 00.168-.08l5.82-6.66 1.428 1.523c.065.07.167.093.257.06a.23.23 0 00.149-.214v-4A.231.231 0 0018.166.2z'
      ></path>
    </svg>
  );
}
export default Increasesvg;
