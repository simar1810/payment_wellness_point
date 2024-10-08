"use client";

import { DatePickerComponent } from "@/components/core";
import { Backicon, Downarrowicon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { LINK_GENERATOR_CLIENT_NAME } from "@/helpers/apiConfig";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RecurringMeeting = ({ baseLink, setCurrentPage, setGeneratedLink }) => {
  const today = dayjs();
  const [date, setDate] = useState(today);
  const { isCopyToClipBoard } = useSelector((state) => state.user);

  const [days, setDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const [description, setDescription] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [repeatOption, setRepeatOption] = useState("");
  const [customDropdownOpen, setCustomDropdownOpen] = useState(false);
  const [club, setClub] = useState("Club Type");
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const customDropdownRef = useRef(null);
  const router = useRouter();

  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  useOutsideClick(dropdownRef, () => setDropdownOpen(false));
  useOutsideClick(customDropdownRef, () => setCustomDropdownOpen(false));

  const handleCheckboxChange = (day) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const handleRepeatOptionChange = (option) => {
    setRepeatOption(option);
    setDropdownOpen(false);
    if (option === "Custom") {
      setCustomDropdownOpen(true);
    } else {
      setCustomDropdownOpen(false);
    }
  };

  const handleClubDropDown = (val) => {
    setClub(val);
    setShowDropDown(false);
  };

  const handleCreateMeeting = async () => {
    let reOcurred = [];
    if (repeatOption === "Daily") {
      reOcurred = [0, 1, 2, 3, 4, 5, 6];
    } else if (repeatOption === "Mon-Fri") {
      reOcurred = [1, 2, 3, 4, 5];
    } else if (repeatOption === "Custom") {
      let i = 0;
      for (const key of Object.keys(days)) {
        if (days[key]) {
          reOcurred.push(i);
        }
        i++;
      }
    }

    const payload = {
      baseLink,
      schedulueDate: date,
      reOcurred,
      topics: description,
      meetingType: "reocurr",
      clubType: club,
      linkGeneratorClientName: LINK_GENERATOR_CLIENT_NAME,
    };
    console.log("payload => ", payload);

    try {
      const { data, status } = await apiInstance.generateLink(payload);
      if (status === 200) {
        console.log("response data of generate recurring Link => ", data);
        setGeneratedLink(data?.data?.wellnessZLink || "");
        toast.success("Recurring meeting created successfully");
        if (isCopyToClipBoard) {
          console.log("link generated");
          navigator.clipboard.writeText(data?.data?.wellnessZLink);
          toast("Link Copied to Clipboard!");
        }
        setCurrentPage("reccuringMeetingStep1");
      }
    } catch (err) {
      toast.error("Error while creating reocurring meet");
    }
  };

  const selectedDays = Object.keys(days)
    .filter((day) => days[day])
    .join(", ");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-1">
      <div className="bg-white p-1 rounded-lg shadow-md w-full max-w-5xl min-h-[550px] flex items-center justify-center relative -translate-y-10">
        <div className="flex gap-4 items-center absolute left-4 top-2 sm:left-8 sm:top-8">
          <button className="focus:outline-none" onClick={() => setCurrentPage("reccuringMeetingStep1")}>
            <Backicon h={20} w={20} c={"#000"} />
          </button>
          <p className="text-xl font-semibold">Meeting</p>
        </div>
        <div className="bg-white rounded-lg border p-6 w-full max-w-md flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Recurring Meeting</h2>
          <div>
            <DatePickerComponent setvalue={setDate} mindate={today} />
          </div>
          <div className="relative w-full mb-4 mt-4">
            <div
              className="w-full p-2 border rounded shadow-sm cursor-pointer focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {repeatOption || "Repeat"}
            </div>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1"
              >
                {["Daily", "Mon-Fri", "Custom"].map((option) => (
                  <div
                    key={option}
                    className="flex justify-between items-center p-2 px-4 cursor-pointer"
                    onClick={() => handleRepeatOptionChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          {repeatOption === "Custom" && (
            <div className="relative w-full mb-4">
              <div
                className="w-full p-2 border rounded shadow-sm cursor-pointer focus:outline-none"
                onClick={() => setCustomDropdownOpen(!customDropdownOpen)}
              >
                {selectedDays || "Select Days"}
              </div>
              {customDropdownOpen && (
                <div
                  ref={customDropdownRef}
                  className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1 max-h-[200px] overflow-y-auto scrollbar-hide"
                >
                  {Object.keys(days).map((day) => (
                    <div
                      key={day}
                      className="flex justify-between items-center p-2 px-4"
                    >
                      <label>{day}</label>
                      <div className="relative flex items-center rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          checked={days[day]}
                          onChange={() => handleCheckboxChange(day)}
                          className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-gray-400"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Topics"
            className="w-full mb-4 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 h-28 resize-none"
          />
          <div
            className={`border-[1.4px] border-solid border-[#c8c8c8] -mt-2 mb-4 rounded overflow-hidden relative transition-all duration-200 ${
              showDropDown ? " h-[150px]" : "h-[55px]"
            }`}
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
                className="cursor-pointer"
              >
                Training
              </p>
              <p
                onClick={() => handleClubDropDown("Morning Club")}
                className="cursor-pointer"
              >
                Morning Club
              </p>
              <p
                onClick={() => handleClubDropDown("Evening Club")}
                className="cursor-pointer"
              >
                Evening Club
              </p>
              <p
                onClick={() => handleClubDropDown("Others")}
                className="cursor-pointer"
              >
                Others
              </p>
            </div>
            <div
              onClick={() => setShowDropDown((prev) => !prev)}
              className="absolute right-3 z-20 top-5 cursor-pointer"
            >
              <Downarrowicon h={15} w={15} c={"#c4c4c4"} />
            </div>
          </div>
          <button
            onClick={handleCreateMeeting}
            className="bg-green-700 text-white py-2 px-5 mt-4 rounded-md shadow-sm self-center"
          >
            Create Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringMeeting;
