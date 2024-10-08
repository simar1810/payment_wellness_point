"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import dayjs from "dayjs";

function MeetJoiningReport({ printRef, attendanceList, name }) {
  const today = dayjs();
  const day = String(today.$D).padStart(2, "0");
  const month = String(today.$M + 1).padStart(2, "0"); // Adding 1 since months are zero-indexed
  const year = today.$y;

  // Format date into dd/mm/yyyy
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div
      ref={printRef}
      className=" w-[1500px] min-h-screen bg-white p-5 flex flex-col items-center"
    >
      <div className=" w-[1300px] flex items-center justify-between">
        <Image src="/logo.png" alt="img" width={120} height={120} />
        <div className=" text-3xl font-bold">
          {name ? name + "'s" : ""} Attendance Report
        </div>
        <div className=" mr-4 font-semibold text-lg">
          <p className=" font-semibold text-lg">Meet Link</p>
          <p className=" font-semibold mt-[2px] text-lg">
            Date:<span>{formattedDate}</span>
          </p>
        </div>
      </div>
      <div className=" px-5 -mt-1">
        <div className=" w-[1300px] h-[2px] bg-[#00000040]"></div>
      </div>
      <div className=" px-5 py-2 flex  items-center justify-around w-[1250px] font-semibold text-lg ">
        <p className=" w-[150px]">Sr No.</p>
        <p className=" w-[450px] flex items-center justify-center">
          Meeting Link
        </p>
        <p className=" w-[250px] flex items-center justify-center">Date</p>
        <p className=" w-[250px] flex items-center justify-center">Time</p>
        {/* <p className=' w-[18%] flex items-center justify-center'>Attendance</p> */}
        <p className=" w-[250px] flex items-center justify-center">Club Type</p>
      </div>
      {attendanceList.map((attendance, index) => (
        <AttendanceInfo key={index} info={attendance} sno={index + 1} />
      ))}
    </div>
  );
}
function AttendanceInfo({ info, sno }) {
  return (
    <div className=" w-[1500px] flex flex-col items-center gap-2 ">
      <div className=" w-[1300px] h-[1px] bg-[#EEEEEE]"></div>
      <div className=" px-5 py-2 flex items-center justify-around w-[1250px] font-medium text-sm">
        <p className=" w-[150px] ">{sno}</p>
        <p className=" w-[450px] flex items-center justify-center text-center">
          {info.meet_id}
        </p>
        <p className=" w-[250px] flex items-center justify-center">
          {info.date}
        </p>
        <p className=" w-[250px] flex items-center justify-center">
          {info.time}
        </p>
        {/*   <p className=' w-[18%] flex items-center justify-center'>
          {info.attendance}
        </p> */}
        <p className=" w-[250px] flex items-center justify-center">
          {info.clubType}
        </p>
      </div>
    </div>
  );
}

export default MeetJoiningReport;
