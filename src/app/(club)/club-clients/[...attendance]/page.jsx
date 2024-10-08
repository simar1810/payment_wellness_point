"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { ExportIcon, Backicon } from "@/components/svgs";
import Link from "next/link";
import apiInstance from "@/helpers/api";
import { SITE_URL } from "@/helpers/apiConfig";
import { NoDataPage } from "@/components/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MeetJoiningReport } from "@/components/core/reports";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  // console.log("\params of club-clients/attendance page => ", params, "\n");
  const [, id, name] = params?.attendance ?? [];
  const finalName = (name || "").split("%20").join(" ");
  const router = useRouter();
  // const { meetingid } = params;

  const [loading, setLoading] = useState(false);
  const [attendanceInfo, SetattendanceInfo] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    const fetchAttendanceInfo = async () => {
      setLoading(true);
      try {
        const { data, status } = await apiInstance.getClientAttendance(id);
        if (status === 200) {
          SetattendanceInfo(data.data);
        }
      } catch (error) {
        console.error("fetch All Dashboard error => ", error);
      }
      setLoading(false);
    };
    fetchAttendanceInfo();
  }, [id]);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${finalName}-attendance.pdf`);
  };

  if (loading) {
    return (
      <div className=" w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center overflow-scroll scrollbar-hide py-16 px-20">
      <div className="  bg-white w-full rounded-2xl  p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
        <div className="flex items-center justify-center overflow-scroll scrollbar-hide p-4">
          <div className="overflow-x-auto bg-white w-full rounded-2xl  p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
            <div className="p-5">
              <button
                className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md"
                onClick={() => router.back()}
              >
                <Backicon h={15} w={15} c={"white"} />
                Back
              </button>
            </div>

            <div className=" p-5 -mt-5 flex items-center justify-between">
              <div className=" text-3xl font-bold">{`${finalName ? finalName + "'s" : ""
                } Attendance Report`}</div>
              <button
                onClick={handleDownloadPdf}
                className=" px-3 py-[6px] border-[#036231] border-[2px] border-solid rounded-lg  text-[#036231] flex items-center justify-center gap-2"
              >
                <ExportIcon h={20} w={20} c={"#036231"} />
                Export Record
              </button>
            </div>

            <div className=" px-5 -mt-1 mb-2">
              <div className="w-[270%] sm:w-full h-[1px]  bg-[#00000040]"></div>
            </div>

            <div className="w-[260%] sm:w-full px-5 py-2 flex  font-semibold">
              <p className=" w-[5%]">Sr No.</p>
              <p className=" w-[35%] flex items-center justify-center">
                Meeting Link
              </p>
              <p className=" w-[20%] flex items-center justify-center">Date</p>
              <p className=" w-[20%] flex items-center justify-center">Time</p>
              <p className=" w-[20%] flex items-center justify-center">
                Club Type
              </p>
              {/*   <p className=' w-[10%] flex items-center justify-center'>Club Type</p> */}
            </div>

            <div>
              <div>
                {attendanceInfo.length === 0 ? (
                  <NoDataPage message="No Attendance Info" />
                ) : (
                  attendanceInfo.map((meeting, index) => (
                    <AttendanceInfo
                      key={index}
                      sno={index + 1}
                      info={meeting}
                    />
                  ))
                )}
              </div>
            </div>

            <div className=" h-0 overflow-hidden">
              <MeetJoiningReport
                printRef={printRef}
                attendanceList={attendanceInfo}
                name={finalName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendanceInfo({ info, sno }) {
  return (
    <div className="w-[260%] sm:w-full flex flex-col gap-2">
      <div className="w-full h-[1px] bg-[#EEEEEE]"></div>
      <div className=" px-5  flex  font-medium  w-full text-sm">
        <p className=" w-[5%] ">{sno}</p>
        <p className=" w-[35%] flex items-center justify-center text-center">
          {info?.meet_id}
        </p>
        <p className=" w-[20%] flex items-center justify-center">
          {info?.date}
        </p>
        <p className=" w-[20%] flex items-center justify-center">
          {info?.time}
        </p>
        {/*     <p className=' w-[20%] flex items-center justify-center'>
          {info.attendance}
        </p> */}
        <p className=" w-[10%] flex items-center justify-center">
          {info.clubType}
        </p>
      </div>
    </div>
  );
}
