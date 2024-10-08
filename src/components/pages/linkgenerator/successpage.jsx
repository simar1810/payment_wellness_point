import React from "react";
import { MeetingSuccessIcon } from "@/components/svgs";
import { CopyToClickIcon } from "@/components/svgs";
import toast from "react-hot-toast";
import Link from "next/link";

function Successpage({ meetingSuccess, generatedLink }) {
  console.log(meetingSuccess);
  function convertToAmPm(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Converts "0" hours to "12" for midnight and "12" hours to "12" for noon
    // Return the formatted time
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  }
  const time = convertToAmPm(meetingSuccess?.time);
  const date = meetingSuccess.schedulueDate.split(" ")[0];
  console.log(date);
  console.log(time); // Output: "7:20 PM"

  return (
    <div className=' w-full flex flex-col items-center justify-center mt-7 p-6'>
      <div className=' -mt-10'>
        <MeetingSuccessIcon h={450} w={450} />
      </div>
      <p className=' font-semibold text-lg -mt-12'>Meeting Scheduled</p>
      {/* <input
        type="text"
        className=" w-[50%] h-full outline-none text-base px-1 font-light placeholder:font-light text-[#00000080]"
        placeholder="https://usc.wellnessz.meet/zoom"
        value={generatedLink}
        readOnly
      /> */}
      {/* <div className=" w-full flex flex-col items-center justify-center mt-2 ">
        <div className=" flex items-center h-[45px] w-[45%] rounded-lg overflow-hidden border-[1px] border-solid border-[#00000040] ">
          <input
            type="text"
            className=" w-[80%] h-full outline-none px-1 font-light placeholder:font-light"
            placeholder="https://usc.wellnessz.meet/zoom"
            value={generatedLink}
            readOnly
            // onChange={(e) => setGeneratedLink(e.target.value)}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedLink);
              toast("Link Copied to Clipboard!");
            }}
            className=" w-[20%] h-full bg-[#036231] text-white rounded-lg flex items-center justify-center gap-2"
          >
            <CopyToClickIcon h={20} w={20} /> Copy
          </button>
        </div>
      </div> */}
      <div className=' w-full items-center justify-center flex gap-3 text-[15px] text-[#00000080] mt-2'>
        <p>Date: {date}</p>
        <p>|</p>
        <p>{time}</p>
        <p>|</p>
        <p>Type: {meetingSuccess.clubType}</p>
        <p>|</p>
        <input
          type='text'
          className=' w-[30%] h-full outline-none text-base px-1 font-light placeholder:font-light cursor-pointer text-[#00000080]'
          placeholder='https://usc.wellnessz.meet/zoom'
          value={generatedLink}
          onClick={() => {
            navigator.clipboard.writeText(generatedLink);
            toast("Link Copied to Clipboard!");
          }}
          readOnly
        />
      </div>
      <Link
        className=' py-[6px] px-4 font-medium text-white bg-[#036231] rounded-md mt-2'
        href='/meeting'
      >
        Done
      </Link>
    </div>
  );
}

export default Successpage;
