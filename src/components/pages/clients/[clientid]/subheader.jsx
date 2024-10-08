"use client";
import React from "react";

function Subheader({ Render, setRender }) {
  function setrender(prop) {
    setRender(() => {
      const newvalue = {
        statistics: "statistics" === prop,
        meals: "meals" === prop,
        retails: "retails" === prop,
      };
      return newvalue;
    });
  }
  //   console.log(Render);
  return (
    <div className="w-full p-3 text-[#B5B5B5] flex gap-10 font-medium">
      <p
        onClick={() => setrender("statistics")}
        className={`" cursor-pointer ${
          Render.statistics
            ? "underline underline-offset-4 text-[#80C522] decoration-[#80C522] decoration-2"
            : ""
        } "`}
      >
        Statistics
      </p>
      <p
        onClick={() => setrender("meals")}
        className={`" cursor-pointer ${
          Render.meals
            ? "underline underline-offset-4 text-[#80C522] decoration-[#80C522] decoration-2"
            : ""
        } "`}
      >
        Meals
      </p>
      <p
        onClick={() => setrender("retails")}
        className={`" cursor-pointer ${
          Render.retails
            ? "underline underline-offset-4 text-[#80C522] decoration-[#80C522] decoration-2"
            : ""
        } "`}
      >
        Retails
      </p>
    </div>
  );
}

export default Subheader;
