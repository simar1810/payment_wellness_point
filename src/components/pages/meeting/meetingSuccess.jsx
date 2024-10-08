import { MeetingSuccessIcon } from "@/components/svgs";
import React from "react";

function MeetingSuccess() {
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className=" -mt-10">
        <MeetingSuccessIcon h={450} w={450} />
      </div>
      <p className=" font-semibold text-lg -mt-12">Meeting Scheduled</p>
      <div className=" flex gap-3 text-[15px] text-[#00000080]">
        <p>Date: 01-01-2024</p>
        <p>|</p>
        <p>Time:01:00 PM</p>
        <p>|</p>
        <p>Type: Training</p>
      </div>
    </div>
  );
}

export default MeetingSuccess;
