"use client";
import DatePickerComponent from "@/components/core/datePicker";
import React, { useState } from "react";
import { TimePickerComponent } from "@/components/core";
import { Downarrowicon } from "@/components/svgs";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";
import dayjs from "dayjs";
import { LINK_GENERATOR_CLIENT_NAME } from "@/helpers/apiConfig";

function ScheduleMeetingForm({
  baseLink,
  setCurrentPage,
  setGeneratedLink,
  setMeetingSuccess,
}) {
  const [JoiningDate, setJoiningDate] = useState("");
  const [time, setTime] = useState("");
  const [club, setClub] = useState("Club Type");
  const [showDropDown, setShowDropDown] = useState(false);
  const [remarks, setRemarks] = useState("");
  const today = dayjs();

  function handleDate() {
    const day =
      JoiningDate.$D <= 9 ? `0${JoiningDate.$D}` : `${JoiningDate.$D}`;
    const month =
      JoiningDate.$M + 1 <= 9
        ? `0${JoiningDate.$M + 1}`
        : `${JoiningDate.$M + 1}`;
    const year = `${JoiningDate.$y}`;
    const newDate = `${day}-${month}-${year}`;
    return newDate;
  }

  function handleTime() {
    const hour = time.$H <= 9 ? `0${time.$H}` : `${time.$H}`;
    const minute = time.$m <= 9 ? `0${time.$m}` : `${time.$m}`;
    const newTime = `${hour}:${minute}`;
    return newTime;
  }

  async function scheduleMeeting() {
    if (JoiningDate == "") {
      toast.error("Please enter Date");
      return;
    } else if (time === "") {
      toast.error("Please enter Time");
      return;
    } else if (club === "Club Type") {
      toast.error("Please enter club type ");
      return;
    }
    try {
      const data = {
        baseLink: baseLink,
        clubType: club,
        topics: remarks,
        schedulueDate: `${handleDate()} ${handleTime()}:00`,
        time: handleTime(),
        linkGeneratorClientName: LINK_GENERATOR_CLIENT_NAME,
        meetingType: "scheduled",
      };
      const response = await apiInstance.generateLink(data);
      if (response.status) {
        toast.success("Meeting Scheduled");
        setGeneratedLink(response.data.data.wellnessZLink);
        setCurrentPage("scheduleMeetingStep3");
        setMeetingSuccess(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleClubDropDown(val) {
    setClub(val);
    setShowDropDown(false);
  }

  return (
    <div className="flex items-center justify-center w-full h-full py-10 ">
      <div className="w-[90%] sm:w-[35%] rounded-xl border-[1px] border-solid border-[#00000040] p-3 flex flex-col items-center">
        <p className=" text-[20px] font-semibold">Schedule Meeting</p>
        <div className=" w-full flex flex-col gap-4 mt-5">
          <div>
            <DatePickerComponent setvalue={setJoiningDate} mindate={today} />
          </div>
          <div className=" mt-4">
            <TimePickerComponent setTime={setTime} className=" w-full" />
          </div>
          <div
            className={` border-[1.4px] border-solid border-[#c8c8c8]   -mt-2 rounded overflow-hidden relative transition-all duration-200 ${
              showDropDown ? " h-[150px]" : "h-[55px]"
            } `}
          >
            <input
              type="text"
              readOnly
              value={club}
              className={`w-full h-[55px] text-[16px] font-medium px-3 outline-none cursor-pointer ${
                club === "Club Type" && "opacity-40"
              }`}
              onClick={() => setShowDropDown((prev) => !prev)}
            />
            <div className="text-[#c4c4c4] text-[15px] font-medium px-2 flex flex-col gap-[2px] -mt-1">
              <p
                onClick={() => handleClubDropDown("Training")}
                className=" cursor-pointer"
              >
                Training
              </p>
              <p
                onClick={() => handleClubDropDown("Morning Club")}
                className=" cursor-pointer"
              >
                Morning Club
              </p>
              <p
                onClick={() => handleClubDropDown("Evening Club")}
                className=" cursor-pointer"
              >
                Evening Club
              </p>
              <p
                onClick={() => handleClubDropDown("Others")}
                className=" cursor-pointer"
              >
                Others
              </p>
            </div>
            <div
              onClick={() => setShowDropDown((prev) => !prev)}
              className=" absolute right-3 z-20 top-5 cursor-pointer "
            >
              <Downarrowicon h={15} w={15} c={"#c4c4c4"} />
            </div>
          </div>
        </div>
        <div className=" w-full mt-1">
          <textarea
            id="remarks"
            name="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Topics"
            rows="3"
            className="mt-1 py-1 px-2  w-full border-[#c8c8c8] border rounded-md resize-none focus:outline-none  placeholder:text-[#c4c4c4] "
          ></textarea>
        </div>
        <button
          onClick={scheduleMeeting}
          className=" h-[45px] bg-[#509613] mt-2 px-6 text-white rounded-lg"
        >
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}

export default ScheduleMeetingForm;
