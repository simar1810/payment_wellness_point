import React, { useState, useEffect, useRef } from "react";

const ProgressBar = ({ points }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const handleMouseEnter = () => {
    setShowProgress(true);
  };
  const handleMouseLeave = () => {
    setShowProgress(false);
  };
  const total = 100;

  useEffect(() => {
    if (points >= 100) {
      setDisplayProgress(100);
    } else {
      const showPoints = (points / total) * 100;
      setDisplayProgress(showPoints);
    }
  }, [points]);
  // const displayProgress = (points / total) * 100;
  // console.log(points);

  return (
    <div className="w-[110%] h-2  bg-[#D9D9D9] rounded-lg relative mb-5">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h-full bg-[#036231] rounded-lg"
        style={{ width: `${displayProgress}%` }}
      ></div>
      {showProgress && (
        <div
          className="absolute top-[30px] left-0 right-0 bottom-0 flex items-center justify-center text-green-500 font-bold"
          style={{ fontSize: "1rem" }}
        >
          {`${points}`}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
