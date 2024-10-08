import React from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";

function MeetingInfoReport({ printRef, meetingDetail }) {
  // console.log("meetingDetail => ", meetingDetail);

  return (
    <div
      ref={printRef}
      className=" w-[1500px] min-h-screen bg-white p-5 flex flex-col items-center "
    >
      <div className="  w-[1300px] flex items-center justify-between">
        <Image src="/logo.png" alt="" height={120} width={120} />
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
      <div className=" px-5 py-2 flex  font-semibold text-lg  w-[1250px] ">
        <p className=" w-[200px]">Sr No.</p>
        <p className=" w-[400px] flex items-center justify-center">
          Client Name
        </p>
        <p className=" w-[250px] flex items-center justify-center">Client Id</p>
        <p className=" w-[250px] flex items-center justify-center">
          Joining Date
        </p>
        <p className=" w-[250px] flex items-center justify-center">
          Joining Time
        </p>
      </div>
      <div>
        {meetingDetail &&
          meetingDetail.map((meeting, index) => (
            <SingleMeetingInfo key={index} sno={index + 1} info={meeting} />
          ))}
      </div>
    </div>
  );
}
function SingleMeetingInfo({ info, sno }) {
  // console.log("info => ", info);

  return (
    <div className=" w-[1500px] flex flex-col items-center gap-2">
      <div className=" w-[1300px] h-[1px] bg-[#EEEEEE]"></div>
      <div className="px-5 py-2 flex items-center justify-around w-[1250px] font-medium text-sm ">
        <p className=" w-[200px] ">{sno}</p>
        <p className=" w-[400px] flex items-center justify-center">
          {info?.name ?? "N/A"}
        </p>
        <p className=" w-[250px] flex items-center justify-center">
          {info?.rollno ?? "N/A"}
        </p>
        <p className=" w-[250px] flex items-center justify-center">
          {info?.attendance?.date ?? "N/A"}
        </p>
        <p className=" w-[250px] flex items-center justify-center">
          {info?.attendance?.time ?? "N/A"}
        </p>
      </div>
    </div>
  );
}

export default MeetingInfoReport;
