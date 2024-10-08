import React from "react";
import { NodataIcon } from "../svgs";

function NoDataPage({ message = "No Data Available" }) {
  return (
    <div className=" h-[50vh] flex flex-col items-center justify-center">
      <NodataIcon h={150} w={150} />
      <p className=" font-semibold text-lg">{message}</p>
    </div>
  );
}

export default NoDataPage;
