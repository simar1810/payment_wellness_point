import apiInstance from "@/helpers/api";
import React, { useState, useEffect, useRef } from "react";
import { ThreeCircles } from "react-loader-spinner";
import Link from "next/link";
import { CopyToClickIcon, DeleteIcon, EyeIcon } from "@/components/svgs";
import toast from "react-hot-toast";
import { NoDataPage } from "@/components/core";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineDateRange } from "react-icons/md";
import { IoFilter, IoWarning } from "react-icons/io5";
import useOutsideClick from "@/hooks/useOutsideClick";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Loader from "@/components/loader/Loader";
import { Modal } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Meetingdetails({ showEntries }) {
  const [loading, setLoading] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [meetingType, setMeetingType] = useState("");
  const [showType, setShowType] = useState(false);
  const [date, setDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [mutateDep, setMutateDep] = useState(false)

  const [editMeetingId, setEditMeetingId] = useState(null)
  const [selectedEditMeeting, setSelectedEditMeeting] = useState(null)
  const router = useRouter();
  const pathName = usePathname();

  const meetingTypeRef = useRef(null);
  const filterDateRef = useRef(null);

  useOutsideClick(meetingTypeRef, () => {
    setShowType(false);
  });

  useOutsideClick(filterDateRef, () => {
    setDatePickerOpen(false);
  });

  async function Fetchdata() {
    setLoading(true);
    try {
      const formattedDate = date ? formatDate(date) : "";
      const { data, status } = await apiInstance.getMeetings(
        formattedDate,
        meetingType
      );
      if (status === 200) {
        setMeetingDetails(data.data);
        // console.log(data.data);
      }
    } catch (error) {
      console.error("fetch All Dashboard error => ", error);
      setMeetingDetails([]);
    }
    setLoading(false);
  }

  function handleViewRecord() {
    router.push("/meeting");
  }

  // edit meeting id
  const onChangeMeetingId = (val) => {
    const meeting = meetingDetails.find(meeting => val === meeting._id)
    setEditMeetingId(val)
    setSelectedEditMeeting(meeting)
  }

  const onRemoveMeetingId = (val) => {
    setEditMeetingId(null)
    setSelectedEditMeeting(null)
  }

  function updateMeetings(id, payload) {
    setMutateDep(prev => !prev)
    setSelectedEditMeeting(null)
    setEditMeetingId(null)
  }

  useEffect(() => {
    Fetchdata();
  }, [meetingType, date, mutateDep]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  if (loading) {
    return (
      <div className=" w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // console.log(date);

  return (
    <>
      {pathName === "/meeting" && (
        <div
          className="w-full flex justify-end gap-4 relative"
          ref={meetingTypeRef}
        >
          {(date !== null || meetingType !== "") && (
            <button
              className="border border-[#036231] text-[#036231] px-3 py-1 rounded-lg"
              onClick={() => {
                setDate(null);
                setMeetingType("");
                setShowType(false);
                setDatePickerOpen(false);
              }}
            >
              Reset
            </button>
          )}

          {/* <button
            className="px-4 py-2 bg-[#036231] text-white font-medium rounded-lg flex items-center gap-2 relative"
            onClick={() => {
              setDatePickerOpen(!datePickerOpen);
              setShowType(false);
            }}
          >
            <MdOutlineDateRange fontSize={20} color="#fff" />
            Filter by Date
            <div
              className="absolute right-[50%] top-5 z-50"
              ref={filterDateRef}
            >
              <DatePicker
                selected={date ? new Date(date) : new Date()}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
                open={datePickerOpen}
                className="hidden "
              />
            </div>
          </button>

          <button
            className="px-4 py-2 bg-[#036231] text-white font-medium rounded-lg flex items-center gap-2"
            onClick={() => setShowType(!showType)}
          >
            <IoFilter fontSize={20} color="#fff" />
            Filter by Type
          </button> */}
          {showType && (
            <div className="absolute right-0 top-12 shadow-md rounded-lg bg-[#c9faa6] p-4 w-[220px] h-[220px] z-50">
              <div className="flex items-center  border-b border-gray-400 mb-1">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#036231] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 "
                    checked={meetingType === ""}
                    onChange={(e) => setMeetingType(e.target.checked ? "" : "")}
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-1/4 -translate-y-2/4 -translate-x-[18px] peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <p className="text-sm ml-3">All Meetings</p>
                </label>
              </div>
              <div className="flex items-center  border-b border-gray-400 mb-1">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border  transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-[#036231]"
                    checked={meetingType === "quick"}
                    onChange={(e) =>
                      setMeetingType(e.target.checked ? "quick" : "")
                    }
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-1/4 -translate-y-2/4 -translate-x-6 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <p className="text-sm ml-3">Quick Meetings</p>
                </label>
              </div>
              <div className="flex items-center  border-b border-gray-400 mb-1">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-[#036231]"
                    checked={meetingType === "scheduled"}
                    onChange={(e) =>
                      setMeetingType(e.target.checked ? "scheduled" : "")
                    }
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-1/4 -translate-y-2/4 -translate-x-[30px] peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <p className="text-sm ml-3">Scheduled Meetings</p>
                </label>
              </div>
              <div className="flex items-center ">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    checked={meetingType === "reocurr"}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border  transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-[#036231]"
                    onChange={(e) =>
                      setMeetingType(e.target.checked ? "reocurr" : "")
                    }
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-1/4 -translate-y-2/4 -translate-x-[30px] peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <p className="text-sm ml-3">Recurring Meetings</p>
                </label>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="w-[250%] sm:w-full">
        <div className="w-full mt-4 px-3 text-sm font-bold flex">
          <p className="w-[3%] flex justify-center text-center ">Sr.no</p>
          <p className="w-[23%] flex justify-center text-center">Base Link</p>
          <p className="w-[23%] flex justify-center text-center">
            Wellnessz Link
          </p>
          <p className="w-[8%] flex justify-center text-center">Date</p>
          <p className="w-[8%] flex justify-center text-center">Time</p>
          <p className="w-[10%] flex justify-center text-center">Attendance</p>
          <p className="w-[10%] flex justify-center text-center">
            Meeting Type
          </p>
          <p className="w-[10%] flex justify-center text-center">Club Type</p>
          <p className="w-[10%] flex justify-center text-center">Topics</p>
          <p className="w-[6%] flex justify-center text-center"></p>
        </div>

        <div className=" w-full h-[1.2px] bg-[#EEEEEE] my-2"></div>

        {!meetingDetails || meetingDetails.length === 0 ? (
          <div className="w-[45%] sm:w-full">
            <NoDataPage />
          </div>
        ) : (
          <div>
            {meetingDetails.map((meeting, index) => {
              if (showEntries === undefined) {
                return (
                  <SingleMeetingInfo
                    key={index}
                    index={index}
                    meetingInfo={meeting}
                    Fetchdata={Fetchdata}
                    onSetEditMeetingId={onChangeMeetingId}
                  />
                );
              } else {
                if (showEntries > index) {
                  return (
                    <SingleMeetingInfo
                      key={index}
                      index={index}
                      meetingInfo={meeting}
                      Fetchdata={Fetchdata}
                      onSetEditMeetingId={onChangeMeetingId}
                    />
                  );
                }
              }
            })}
            {pathName.includes("meeting") ? (
              ""
            ) : (
              <div className="w-[40%] sm:w-full flex items-center justify-center mt-8">
                <button
                  onClick={handleViewRecord}
                  className="px-3 py-[6px] border-[2px] border-solid border-[#036231] text-[#036231] font-medium  rounded-lg"
                >
                  View all Records
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {editMeetingId !== null && <EditModal onDiscardEditing={onRemoveMeetingId} meeting={selectedEditMeeting} onUpdateMeetings={updateMeetings} />}
    </>
  );
}

function SingleMeetingInfo({ index, meetingInfo, Fetchdata, onSetEditMeetingId }) {
  const [warningModal, setWarningModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(meetingInfo.wellnessZLink);
    toast.success("Link Copied to Clipboard!");
  }

  function separateDateTimeAndConvertToAmPm(dateTimeStr) {
    if (!dateTimeStr) return { date: "", time: "" };

    const isISOFormat = dateTimeStr.includes("T");
    let date, timePart;

    if (isISOFormat) {
      const dateObj = new Date(dateTimeStr);
      date = dateObj
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("-");
      timePart = dateObj.toTimeString().split(" ")[0];
    } else {
      [date, timePart] = dateTimeStr.split(" ");
    }

    if (!timePart) {
      return { date, time: "00:00 AM" };
    }

    let [hours, minutes = "00"] = timePart.split(":");
    const amPmFormat = parseInt(hours) < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    const convertedTime = `${hours}:${minutes} ${amPmFormat}`;

    return { date, time: convertedTime };
  }

  let { date, time } = separateDateTimeAndConvertToAmPm(
    meetingInfo?.schedulueDate && typeof meetingInfo?.schedulueDate === "string"
      ? meetingInfo?.schedulueDate
      : ""
  );
  const wellnesszMeetArray = meetingInfo.wellnessZLink.split("/");
  const wellnesszMeetId = wellnesszMeetArray[wellnesszMeetArray.length - 1];

  const handleDelete = () => {
    setWarningModal(true);
  };

  const handleConfirmDelete = async () => {
    setBtnLoading(true);
    try {
      const { status } = await apiInstance.deleteMeetLink(
        meetingInfo._id ?? ""
      );

      if (status === 200) {
        toast.success("Meeting Link Deleted Successfully");
        Fetchdata();
      }
    } catch (error) {
      console.error("error in deleting Meeting Link => ", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete Meeting Link"
      );
    }
    setWarningModal(false);
    setBtnLoading(false);
  };

  return (
    <>
      <div className="w-full px-3">
        <div className="w-full text-sm py-1 text-[#292D32] font-medium flex gap-1">
          <p className="w-[3%] flex justify-center">{index + 1}</p>

          <div className="w-[23%] flex justify-center break-all normal-case underline underline-offset-1 text-[12px]">
            {meetingInfo.baseLink}
          </div>

          <div className="w-[23%] h-auto flex justify-center gap-2 break-all normal-case underline underline-offset-1 text-[12px]">
            <Link
              className="cursor-pointer"
              href={`/meeting/${wellnesszMeetId}`}
            >
              {meetingInfo.wellnessZLink}
            </Link>
            <div onClick={handleCopy} className="mt-2 cursor-pointer">
              <CopyToClickIcon h={15} w={15} c="gray" />
            </div>
          </div>

          <p className="w-[8%] flex justify-center">{date}</p>

          <p className="w-[8%] flex justify-center">{time}</p>

          <p className="w-[10%] flex justify-center items-center gap-2">
            {meetingInfo.attendence}
            <Link href={`/meeting/${wellnesszMeetId}`}>
              <EyeIcon h={15} w={15} c="#000" />
            </Link>
          </p>

          <p className="w-[10%] flex justify-center">
            {meetingInfo?.meetingType}
          </p>

          <p className="w-[10%] flex justify-center">{meetingInfo.clubType}</p>

          <p className="w-[10%] flex justify-center">
            {meetingInfo.remarks || meetingInfo.topics || ""}
          </p>
          <p className="w-[3%] text-center">
            <button onClick={() => onSetEditMeetingId(meetingInfo._id)} className="cursor-pointer">
              <FaEdit c="green" w={20} h={20} />
            </button>
          </p>
          <p className="w-[3%] text-center">
            <button onClick={() => handleDelete()} className="cursor-pointer">
              <DeleteIcon c="red" w={20} h={20} />
            </button>
          </p>
        </div>
        <div className="w-full h-[1px] bg-[#EEEEEE]"></div>
      </div>

      <Modal
        open={warningModal}
        className="flex justify-center items-center"
        onClose={() => setWarningModal(false)}
      >
        <div className="bg-[#036231] flex flex-col items-center gap-2 p-5 rounded-lg w-[90%] sm:w-[30%]">
          <div className="flex flex-col items-center gap-2">
            <IoWarning size={30} color={"#fff"} />
            <h1 className="text-lg font-semibold text-white">Are you sure?</h1>
            <p className="text-white text-center">
              The Meeting Link will be permanently deleted.
            </p>
            <div className="flex items-center gap-5 mt-2">
              <button
                onClick={() => setWarningModal(false)}
                className="border-2 border-white text-white p-2 px-6 rounded-lg font-semibold min-w-[110px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-white text-[#036231] p-2 px-6 rounded-lg font-semibold min-w-[110px]"
              >
                {btnLoading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

function EditModal({ meeting, onDiscardEditing, onUpdateMeetings }) {

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(e.currentTarget.baseLink.value)
    try {

      const data = {
        baseLink: e.currentTarget.baseLink.value,
        meetingType: e.currentTarget.meetingType.value,
        clubType: e.currentTarget.clubType.value,
        schedulueDate: e.currentTarget.schedulueDate.value,
        joinedTime: `${e.currentTarget.schedulueDate.value}T${e.currentTarget.joinedTime.value}:00.000+05:30`
      }
      const response = await apiInstance.editMeeting(data, meeting._id);
      if (response.data.success) {
        onUpdateMeetings();
        toast.success("Meeting Updated Successfully!");
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(function () {
    document.body.style.overflowY = "hidden"
    return () => document.body.style.overflowY = "auto"
  }, [])

  return <div className="fixed top-0 left-0 h-screen w-screen bg-[#00000051] flex items-center justify-center z-[1000]">
    <div className="max-w-[600px] min-w-[500px] mx-auto mt-10 bg-[#FFF] shadow-2xl p-8 rounded-md relative border-2">
      <button onClick={onDiscardEditing} className="absolute right-4 top-4">
        <FaXmark c="black" className="w-10 h-10" />
      </button>
      <form onSubmit={handleSubmit}>
        <FormControl defaultValue={meeting.baseLink} title={"Link"} name="baseLink" placeholder="Enter edit meet link" />
        <FormControl defaultValue={meeting.schedulueDate} title="Date" name="schedulueDate" type="date" placeholder="Enter date" />
        <FormControl defaultValue={new Date(meeting.joinedTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })} title="Time" name="joinedTime" type="time" placeholder="Enter time" />
        <SelectControl
          title="Meeting Type"
          name="meetingType"
          defaultValue={meeting.meetingType}
          options={[{ id: 1, value: "Quick" }, { id: 2, value: "Scheduled" }, { id: 3, value: "Recurring" }]} />
        <SelectControl
          title="Club Type"
          name="clubType"
          defaultValue={meeting.clubType}
          options={[{ id: 1, value: "Training" }, { id: 2, value: "Morning" }, { id: 3, value: "Evening" }, { id: 4, value: "Others" }]} />
        <button type='submit' className="text-w hite bg-green-400 block mt-4 mx-auto px-4 py-2 rounded-md">Save</button>
      </form>
    </div>
  </div>
}

function FormControl({ title, name, ...props }) {
  return <div className="my-4">
    <label className="text-w hite">{title}</label>
    <input type={props.type || "text"} name={name} className="w-full block focus:outline-none mt-2 px-4 py-2 rounded-md border-2" {...props} />
  </div>
}

function SelectControl({ title, name, options, ...props }) {
  return <div className="my-4">
    <label className="text-w hite">{title}</label>
    <select name={name} className="w-full mt-2 px-4 py-2 rounded-md focus:outline-none border-2" {...props}>
      {options.map((option, idx) => (
        <option value={option.value.toLowerCase()} key={option.id}>{option.value}</option>
      ))}
    </select>
  </div>
}