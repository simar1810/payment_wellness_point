import React from "react";
import Image from "next/image";
import Footer from "@/components/core/Footer";
import Link from "next/link";

const meetingDetail = [
  {
    commonDate: "03-07-2024",
    details: [
      {
        attendance: {
          name: "full name 33",
          rollno: "ful9717",
          time: "5:29:16 PM",
          _id: "667ab6cf0b33d91ea54a7685",
        },
      },
      {
        attendance: {
          name: "full name 33",
          rollno: "ful9717",
          time: "5:29:16 PM",
          _id: "667ab6cf0b33d91ea54a7685",
        },
      },
    ],
  },
  {
    commonDate: "03-07-2024",
    details: [
      {
        attendance: {
          name: "full name 33",
          rollno: "ful9717",
          time: "5:29:16 PM",
          _id: "667ab6cf0b33d91ea54a7685",
        },
      },
      {
        attendance: {
          name: "full name 33",
          rollno: "ful9717",
          time: "5:29:16 PM",
          _id: "667ab6cf0b33d91ea54a7685",
        },
      },
    ],
  },
  {
    commonDate: "03-07-2024",
    details: [
      {
        attendance: {
          name: "full name 33",
          rollno: "ful9717",
          time: "5:29:16 PM",
          _id: "667ab6cf0b33d91ea54a7685",
        },
      },
      {
        attendance: {
          name: "full name 33",
          rollno: "ful9717",
          time: "5:29:16 PM",
          _id: "667ab6cf0b33d91ea54a7685",
        },
      },
    ],
  },
];

function Page({ }) {
  // console.log("meetingDetail => ", meetingDetail);

  // Format date into dd/mm/yyyy
  const formattedDate = "11/07/2024";

  return (
    <>
      <div className=" w-[1450px] min-h-screen bg-white p-5 flex flex-col items-center ">
        <div className=" w-[1300px] px-12 flex items-center justify-between">
          <Link href="https://www.thewellnesspoint.club/" target="_blank" className='flex-shrink-0 flex items-center'>
            <Image src="/logo.png" alt="" height={120} width={120} />
          </Link>
          <p className=" text-3xl font-extrabold">Meeting Attendance</p>
        </div>

        <div className=" px-5 -mt-1">
          <div className="  w-[1300px] h-[2px] bg-[#00000040]"></div>
        </div>

        <div className=" px-5 py-2 flex justify-between  font-semibold text-lg  w-[1350px] ">
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
      <Footer />
    </>
  );
}
function ReocurrMeetingInfo({ info }) {
  return (
    // <div className=" w-[1300px] flex flex-col items-center gap-2">
    //   <div className=" w-[1300px] h-[1px] bg-[#EEEEEE]"></div>
    //   <div
    //     className=" px-5 py-2 flex items-center justify-around w-[1450px] font-medium text-sm
    //  "
    //   >
    //     <p className=" w-[200px] flex items-center justify-center">
    //       12/07/2024
    //     </p>
    //     <p className=" w-[100px] ">1</p>
    //     <p className=" w-[400px] flex items-center justify-center">rama</p>
    //     <p className=" w-[280px] flex items-center justify-center">1</p>

    //     <p className=" w-[280px] flex items-center justify-center">999999</p>
    //   </div>
    // </div>
    <div className="font-semibold text-lg  w-[1350px] flex flex-col items-center justify-around">
      <div className="h-[1px] bg-black  opacity-35  w-[1300px] "></div>

      <div className=" px-5 py-2 flex items-center justify-between  w-[1350px] font-medium text-sm">
        <p className="w-[200px] flex items-center justify-center ml-5">
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
                <p className="w-[380px] text-center pl-3 ml-3">
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

export default Page;
