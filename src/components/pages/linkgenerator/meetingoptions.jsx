import React from "react";
import Link from "next/link";
import { QuickMeetIcon, ClockIcon, ReccMeetIcon } from "@/components/svgs";

function MeetingOptions({ setCurrentPage }) {
  return (
    <div className="w-full p-8 max-[500px]:p-4">
      <div className="flex items-center justify-between gap-4 max-[500px]:flex-col ">
        <div
          onClick={() => setCurrentPage("quickMeetingStep1")}
          className="w-[33%] max-[500px]:w-full h-[200px] bg-[#036231] rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer"
        >
          <QuickMeetIcon h={45} w={45} c={"white"} />
          <p className="text-xl text-white">Quick Meeting</p>
        </div>
        <div
          onClick={() => setCurrentPage("scheduleMeetingStep1")}
          className="w-[33%] max-[500px]:w-full h-[200px] bg-[#036231] rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer"
        >
          <ClockIcon h={45} w={45} c={"white"} />
          <p className=" text-xl text-white">Schedule Meeting</p>
        </div>
        <div
          onClick={() => setCurrentPage("reccuringMeetingStep1")}
          className="w-[33%] max-[500px]:w-full h-[200px] bg-[#036231] rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer"
        >
          <ReccMeetIcon h={45} w={45} c={"white"} />
          <p className="text-xl text-white">Reccuring Meeting</p>
        </div>
      </div>
    </div>
  );
}

export default MeetingOptions;
