import React from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
// import { ReocurrMeetingInfo } from "@/app/(club)/meeting/[meetingid]/page";

function ReocurringMeetReport({ printRef, meetingDetail }) {
  // console.log("meetingDetail => ", meetingDetail);
  console.log("sita");
  console.log(meetingDetail);

  return (
    <div
      ref={printRef}
      className=" w-[1450px] min-h-screen bg-white p-5 flex flex-col items-center  "
    >
      <div className="  w-[1300px] px-12 flex items-center justify-between">
        <Image src={logo} alt="" height={120} width={120} />
        <p className=" text-3xl font-extrabold">Meeting Attendance</p>
        <div>
          {/* <p className=" font-semibold text-lg">Meet Link</p> */}
          {/* <p className=" font-semibold mt-[2px]">
            Date: <span>01/12/2024</span>
          </p> */}
        </div>
      </div>

      <div className=" px-5 -mt-1">
        <div className=" w-[1300px] h-[2px] bg-[#00000040]"></div>
      </div>

      <div className=" px-5 py-2 flex justify-around  font-semibold text-lg  w-[1350px] ">
        <p className=" w-[200px] flex items-center justify-center">Date</p>
        <p className=" w-[100px]">Sr No.</p>
        <p className=" w-[400px] flex items-center justify-center">
          Client Name
        </p>
        <p className=" w-[200px] flex items-center justify-center">
          Roll Number
        </p>
        <p className=" w-[200px] flex items-center justify-center">
          Joining Time
        </p>
      </div>

      <div>
        {meetingDetail &&
          meetingDetail.map((meeting, index) => (
            <ReocurrMeetingInfo key={index} info={meeting} />
          ))}
      </div>
    </div>
  );
}

function ReocurrMeetingInfo({ info, sno }) {
  // console.log("info => ", info);

  return (
    <div className="font-semibold text-lg  w-[1350px] flex flex-col items-center justify-around">
      <div className="h-[1px] bg-black  opacity-35  w-[1300px] "></div>

      <div className=" px-5 py-2 flex items-center justify-between  w-[1350px] font-medium text-sm">
        <p className="w-[200px] flex items-center justify-center ml-8">
          {info?.commonDate || "N/A"}
        </p>
        <div className="w-[1150px] flex flex-col gap-3 ">
          {info?.details &&
            info?.details.length > 0 &&
            info.details.map((item, idx) => (
              <div
                key={idx}
                className="flex w-[1150px]  items-center justify-between gap-5   pl-16"
              >
                <p className="w-[100px] text-center ">{idx + 1}</p>
                <p className="w-[380px] text-center pl-3 ml-6">
                  {item?.attendance.name ?? "N/A"}
                </p>
                <p className="w-[200px]  text-center ">
                  {item?.attendance.rollno ?? "N/A"}
                </p>
                <p className="w-[200px]  text-center ">
                  {item?.attendance.time ?? "N/A"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ReocurringMeetReport;
