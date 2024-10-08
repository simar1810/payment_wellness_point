"use client";

import { useEffect, useState } from "react";
import Joyride from "react-joyride";
import Cookies from "js-cookie";

const Tour = ({ steps }) => {
  const [runTour, setRunTour] = useState(false);
  const coachId = Cookies.get("coachId");

  useEffect(() => {
    const tourData = JSON.parse(localStorage.getItem("tourData"));
    console.log("tourData", tourData);

    if (!tourData || !coachId) {
      setRunTour(true);
    } else if (coachId) {
      setRunTour(false);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      const tourData = {
        tourStatus: true,
        coachId,
      };
      localStorage.setItem("tourData", JSON.stringify(tourData));
      setRunTour(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      run={runTour}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 1000,
          backgroundColor: "#036231",
          textColor: "#fff",
          arrowColor: "#036231",
          primaryColor: "#036231",
          overlayColor: "rgba(0, 0, 0, 0.5)",
          width: "240px",
        },
        buttonNext: {
          backgroundColor: "#1f7837",
          outline: "none",
          color: "#fff",
          fontSize: "14px",
        },
        beacon: {
          height: "50px",
          width: "50px",
        },
      }}
    />
  );
};

export default Tour;
