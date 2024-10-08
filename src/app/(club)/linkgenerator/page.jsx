"use client";
import React, { useState } from "react";
import {
  LinkPage,
  MeetingOptions,
  RecurringMeeting,
  ScheduleMeetingForm,
  Successpage,
} from "@/components/pages/linkgenerator";
function Page() {
  const [currentPage, setCurrentPage] = useState("MeetingOptions");
  const [baseLink, setBaseLink] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [meetingSuccess, setMeetingSuccess] = useState("");

  return (
    <div className="h-full w-full p-2 overflow-scroll scrollbar-hide max-[400px]:p-8">
      <div className="min-h-full w-full bg-white rounded-lg border-[#0000001A] border-[1px] border-solid flex flex-col items-center">
        {currentPage === "MeetingOptions" && (
          <MeetingOptions setCurrentPage={setCurrentPage} />
        )}

        {(currentPage === "quickMeetingStep1" ||
          currentPage === "scheduleMeetingStep1" ||
          currentPage === "reccuringMeetingStep1") && (
          <LinkPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            baseLink={baseLink}
            setBaseLink={setBaseLink}
            generatedLink={generatedLink}
            setGeneratedLink={setGeneratedLink}
          />
        )}

        {currentPage === "scheduleMeetingStep2" && (
          <ScheduleMeetingForm
            baseLink={baseLink}
            setCurrentPage={setCurrentPage}
            setGeneratedLink={setGeneratedLink}
            setMeetingSuccess={setMeetingSuccess}
          />
        )}

        {currentPage === "scheduleMeetingStep3" && (
          <Successpage
            meetingSuccess={meetingSuccess}
            generatedLink={generatedLink}
          />
        )}

        {currentPage === "reccuringMeetingStep2" && (
          <RecurringMeeting
            baseLink={baseLink}
            setCurrentPage={setCurrentPage}
            setGeneratedLink={setGeneratedLink}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
