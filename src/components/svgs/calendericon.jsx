import React from "react";

function Calendericon({ h, w }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 25 23"
    >
      <path
        fill="#036231"
        d="M21.025 2.3h-2.363V1.159c0-.303-.124-.593-.346-.808a1.202 1.202 0 00-.835-.334c-.314 0-.614.12-.836.334a1.124 1.124 0 00-.346.808v1.143H9.211V1.158c0-.303-.124-.593-.346-.808A1.202 1.202 0 008.03.016c-.314 0-.614.12-.836.334a1.124 1.124 0 00-.346.808v1.143H4.486c-.94 0-1.842.36-2.507 1.004A3.371 3.371 0 00.941 5.728v13.71c0 .91.374 1.781 1.038 2.424a3.606 3.606 0 002.507 1.004h16.539c.94 0 1.841-.361 2.506-1.004a3.371 3.371 0 001.038-2.424V5.728c0-.909-.373-1.78-1.038-2.423A3.606 3.606 0 0021.025 2.3zm1.181 17.138c0 .303-.124.594-.346.808a1.202 1.202 0 01-.835.335H4.485c-.313 0-.613-.12-.835-.335a1.124 1.124 0 01-.346-.808v-7.997h18.902v7.997zm0-10.282H3.304V5.728c0-.303.125-.593.346-.808.222-.214.522-.334.836-.334h2.362v1.142c0 .303.125.594.346.808.222.214.522.335.836.335.313 0 .614-.12.835-.335.222-.214.346-.505.346-.808V4.586H16.3v1.142c0 .303.125.594.346.808.222.214.523.335.836.335.313 0 .614-.12.835-.335.222-.214.346-.505.346-.808V4.586h2.363c.313 0 .614.12.835.334.222.215.346.505.346.808v3.428z"
      ></path>
    </svg>
  );
}

export default Calendericon;