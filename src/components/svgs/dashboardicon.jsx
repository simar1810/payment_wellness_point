import React from "react";

function Dashboardicon({ h, w, c }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 13 13"
    >
      <path
        fill={c}
        d="M.375.63v11.392h10.792c.644 0 1.166-.524 1.166-1.17V.622L.375.63zm4.083 9.638H1.842l-.009-4.679h2.625v4.678zm6.125 0H5.657l-.032-4.679h4.958v4.678zm0-5.849h-8.75V2.08h8.75v2.34z"
      ></path>
    </svg>
  );
}

export default Dashboardicon;
