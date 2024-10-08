"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { ExportIcon, Backicon } from "@/components/svgs";
import Link from "next/link";
import apiInstance from "@/helpers/api";
import { SITE_URL } from "@/helpers/apiConfig";
import { MeetingInfoReport, NoDataPage } from "@/components/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import ReocurringMeetReport from "@/components/core/reports/reocurringMeetReport";

export default function Page({ params }) {
  const { meetingid } = params;
  const [loading, setLoading] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState({});
  // console.log("meetingInfo => ", meetingInfo);
  const printRef = useRef();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.getMeetingDetails(
        `${SITE_URL}/meet/${meetingid}`
      );
      if (status === 200) {
        // console.log("getMeetingDetails api response => ", data);
        setMeetingInfo(data?.data || {});
      }
    } catch (error) {
      console.error("fetch All Meeting error => ", error);
    }
    setLoading(false);
  }, [meetingid]);

  const handleDownloadPdf = async () => {
    if (!meetingInfo || Object.keys(meetingInfo).length === 0) {
      toast.error("No Data Available");
      return;
    } else {
      const element = printRef.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Meet-Attendance-${meetingid}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className=" w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center overflow-scroll scrollbar-hide py-2 px-5 pt-10">
      <div className="overflow-x-scroll scrollbar-hide bg-white w-full rounded-2xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
        <div className="p-5">
          {/* <Link href={"/meeting"}> */}
          <button
            onClick={() => router.back()}
            className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md"
          >
            <Backicon h={15} w={15} c={"white"} />
            Back
          </button>
          {/* </Link> */}
        </div>
        <div className=" p-5 -mt-5 flex items-center justify-between">
          <div>
            <p className=" font-semibold text-lg">Meet Link</p>
            {/* <p className=" font-semibold mt-[2px]">
              Date: <span>01/12/2024</span>
            </p> */}
          </div>
          <button
            onClick={handleDownloadPdf}
            className=" px-3 py-[6px] border-[#036231] border-[2px] border-solid rounded-lg  text-[#036231] flex items-center justify-center gap-2"
          >
            <ExportIcon h={20} w={20} c={"#036231"} />
            Export Record
          </button>
        </div>
        <div className=" px-5 -mt-2">
          <div className="w-[190%] sm:w-full h-[2px] bg-[#00000040]"></div>
        </div>

        {meetingInfo?.meetingType === "reocurr" ? (
          <div className="w-[270%] sm:w-full px-5 py-2 flex  font-semibold text-lg">
            <p className=" w-[15%] flex items-center justify-center">Date</p>
            <p className=" w-[5%]">Sr No.</p>
            <p className=" w-[15%] flex items-center justify-center">
              Client Name
            </p>
            <p className=" w-[15%] flex items-center justify-center">
              Roll Number
            </p>
            <p className=" w-[15%] flex items-center justify-center">
              Joining Time
            </p>
          </div>
        ) : (
          <div className="w-[270%] sm:w-full px-5 py-2 flex  font-semibold text-lg ">
            <p className=" w-[5%]">Sr No.</p>
            <p className=" w-[15%] flex items-center justify-center">
              Client Name
            </p>
            <p className=" w-[15%] flex items-center justify-center">
              Roll Number
            </p>
            <p className=" w-[15%] flex items-center justify-center">
              Joining Date
            </p>
            <p className=" w-[15%] flex items-center justify-center">
              Joining Time
            </p>
          </div>
        )}

        <div>
          {meetingInfo && meetingInfo?.attendenceList && (
            <div>
              {meetingInfo.attendenceList.length === 0 ? (
                <NoDataPage message="No Attendance Info" />
              ) : meetingInfo?.meetingType === "reocurr" ? (
                meetingInfo.attendenceList.map((meeting, idx) => (
                  <ReocurrMeetingInfo key={idx} info={meeting} />
                ))
              ) : (
                meetingInfo.attendenceList.map((meeting, index) => (
                  <SingleMeetingInfo
                    key={index}
                    sno={index + 1}
                    info={meeting}
                  />
                ))
              )}
            </div>
          )}
        </div>
        <div className=" overflow-hidden h-0">
          {meetingInfo?.meetingType === "reocurr" ? (
            <ReocurringMeetReport
              printRef={printRef}
              meetingDetail={meetingInfo.attendenceList}
            />
          ) : (
            <MeetingInfoReport
              printRef={printRef}
              meetingDetail={meetingInfo.attendenceList}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SingleMeetingInfo({ info, sno }) {
  return (
    <div className="w-[270%] sm:w-full flex flex-col gap-2">
      <div className=" w-full h-[1px] bg-[#EEEEEE]"></div>
      <div className=" px-5  flex  font-medium  w-full ">
        <p className=" w-[5%] ">{sno}</p>
        <p className=" w-[15%] flex items-center justify-center">
          {info?.name ?? "N/A"}
        </p>
        <p className=" w-[15%] flex items-center justify-center">
          {info?.rollno ?? "N/A"}
        </p>
        <p className=" w-[15%] flex items-center justify-center">
          {info?.attendance?.date ?? "N/A"}
        </p>
        <p className=" w-[15%] flex items-center justify-center">
          {info?.attendance?.time ?? "N/A"}
        </p>
      </div>
    </div>
  );
}

export function ReocurrMeetingInfo({ info }) {
  // console.log("Reocurr Meeting Info => ", info);
  // console.log('rama')
  // console.log(info)
  return (
    <div className="px-5 py-2 flex flex-col font-semibold text-lg w-full ">
      <div className="h-[1px] bg-black w-[180%] sm:w-[65%] opacity-35 translate-x-4"></div>

      <div className="w-[290%] sm:w-full flex">
        <p className="w-[15%] flex items-center justify-center">
          {info?.commonDate || "N/A"}
        </p>
        <div className="w-[85%]">
          {info?.details &&
            info?.details.length > 0 &&
            info.details.map((item, idx) => (
              <div key={idx} className="flex w-full">
                <p className="w-[5%] text-center">{idx + 1}</p>
                <p className="w-[18%] pl-4 text-center">
                  {item?.name ?? "N/A"}
                </p>
                <p className="w-[18%]  text-center">{item?.rollno ?? "N/A"}</p>
                <p className="w-[18%]  text-center">{item?.time ?? "N/A"}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
