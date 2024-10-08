import React from "react";

function ClubIcon({h,w,c}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 17 15"
    >
      <path
        fill={c}
        d="M16.833 1.756v.88L.5 2.648v-.892c0-.646.522-1.17 1.167-1.17h14c.644 0 1.166.524 1.166 1.17zM.5 3.23h3.792v11.39H1.667A1.168 1.168 0 01.5 13.45V3.23zM4.875 3.227V14.62h10.792c.644 0 1.166-.524 1.166-1.17V3.219l-11.958.009zm4.083 9.638H6.342l-.009-4.678h2.625v4.678zm6.125 0h-4.926l-.032-4.678h4.958v4.678zm0-5.848h-8.75v-2.34h8.75v2.34z"
      ></path>
    </svg>
  );
}

export default ClubIcon;