"use client";

import React, { useEffect, useMemo, useState } from "react";
import apiInstance from "@/helpers/api";
import {
  Clienticon,
  CrossIcon,
  LinkgeneratorIcon,
  MeetingIcon,
} from "@/components/svgs";
import {
  Clientdetails,
  Header,
  Meetingdetails,
} from "@/components/pages/club-dashboard";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setClubSystem } from "@/redux/slices/userSlice";
import Image from "next/image";
import ClubTour from "@/components/core/Tour/ClubDashboardTour";
import Loader from "@/components/loader/Loader";

const tourSteps = [
  {
    target: ".free-clients",
    content: "All free Customers can join the meeting",
  },
  {
    target: ".subscription-clients",
    content: "All Subscription Customers can join the meeting",
  },
  {
    target: ".volume-points-clients",
    content: "All Volume points Customers can join the meeting",
  },
];

function Page() {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [toggle, setToggle] = useState({
    meeting: true,
    client: false,
  });
  const { clubSystem = 0 } = useSelector((state) => state.user);
  // console.log(typeof clubSystem, "clubSystem");
  const [radioToggle, setRadioToggle] = useState(clubSystem);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [otp, setOtp] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  async function Fetchdata() {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.getDashData();
      if (status === 200) {
        // console.log(data.data);
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error("fetch All Dashboard error => ", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    Fetchdata();
  }, []);

  // console.log(dashboardData.totalMeeting, "totalMeeting");
  // console.log(dashboardData.totalLinkGenerated, "totalLinkGenerated");
  // console.log(dashboardData.totalClient, "totalClients");

  const dashboardItems = useMemo(
    () => [
      {
        title: "Total Customers",
        value: dashboardData.totalClient || 0,
        icon: Clienticon,
      },
      {
        title: "Meeting Held",
        value: dashboardData.totalMeeting || 0,
        icon: MeetingIcon,
      },
      {
        title: "Links Generated",
        value: dashboardData.totalLinkGenerated || 0,
        icon: LinkgeneratorIcon,
      },
    ],
    [dashboardData]
  );

  const radioOptions = useMemo(
    () => [
      { id: "free", label: "Free", value: 0 },
      // { id: "subscription", label: "Subscription", value: 1 },
      { id: "volumePoints", label: "Volume Points", value: 2 },
      { id: "specialMode", label: "Special Mode", value: 3 },
    ],
    []
  );

  if (loading) {
    return (
      <div className="p-5 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  async function handleConfirm() {
    try {
      setBtnLoading(true);
      const { data, status } = await apiInstance.sendOtpClubSystem(selectedRadio);
      if (status === 200) {
        toast.success("Club System changed successfully!");
        // setOpenModal(true);
        dispatch(setClubSystem(parseInt(selectedRadio)));
        setRadioToggle(parseInt(selectedRadio));
        setSelectedRadio("");
        setWarningModal(false);
      }
    } catch (error) {
      console.error("send otp error => ", error);
      toast.error("Failed to send OTP");
    } finally {
      setBtnLoading(false);
    }
  }

  function handleRadioChange(e) {
    setSelectedRadio(e.target.value);
    setWarningModal(true);
  }

  async function handleOtpSubmit() {
    if (otp === "") {
      toast.error("Please enter OTP");
      return;
    }
    try {
      // console.log("Selected Radio => ", selectedRadio);
      setBtnLoading(true);
      console.log(selectedRadio)
      const { data, status } = await apiInstance.verifyOtpClubSystem({
        otp,
        clubSystem: selectedRadio,
      });
      if (status === 200) {
        toast.success("Club System Modified Successfully!");
        setOpenModal(false);
        dispatch(setClubSystem(parseInt(selectedRadio)));
        setRadioToggle(parseInt(selectedRadio));
        setSelectedRadio("");
        setOtp("");
      }
    } catch (error) {
      console.error("verify otp error => ", error);
      toast.error(error?.response?.data?.error || "Invalid OTP");
    } finally {
      setBtnLoading(false);
    }
  }

  const RadioInput = ({ id, label, value }) => (
    <div className={`flex items-center gap-2 ${id}-clients w-fit`}>
      {/* <div className={`flex items-center gap-2 ${id}-clients w-fit ${value === 2 ? 'w-[40%]' : 'w-[30%]'}`}> */}
      <div className="flex gap-2 items-start w-full">
        <div className="grid place-items-center mt-1 relative">
          <input
            type="radio"
            checked={radioToggle === value}
            name={id}
            id={id}
            value={value}
            onChange={handleRadioChange}
            className="peer h-4 w-4 cursor-pointer appearance-none border-2 peer-checked:bg-[#036231] border-[#036231] rounded-full shrink-0 col-start-1 row-start-1"
          />

          <div className="absolute w-2 h-2 rounded-full peer-checked:bg-[#036231] col-start-1 row-start-1 pointer-events-none" />
        </div>

        <label htmlFor={id} className="w-full">
          {label}
        </label>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center pt-5 bg-[#f4f4f4] overflow-y-scroll scrollbar-hide">
      <ClubTour steps={tourSteps} />

      <div className="w-[90%] md:w-[80%] border-2 border-solid border-[#036231] rounded-lg flex flex-wrap items-center justify-between gap-2 bg-white md:gap-5 p-3 md:p-10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        {dashboardItems.map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      <div className="flex items-center justify-between w-[90%] mt-10 mb-2">
        <div className="flex justify-start gap-4 sm:gap-8 w-full">
          {radioOptions.map((option) => (
            <RadioInput
              key={option.id}
              id={option.id}
              label={option.label}
              value={option.value}
            />
          ))}
        </div>
      </div>

      <div className="w-[90%] bg-white my-7 rounded-xl pb-6">
        <Header
          toggle={toggle}
          setToggle={setToggle}
          setSearchInput={setSearchInput}
        />

        <div className="mt-[5rem] sm:mt-0 p-1 overflow-scroll scrollbar-hide">
          {toggle?.client && (
            <Clientdetails showEntries={5} searchInput={searchInput} />
          )}
          {toggle?.meeting && <Meetingdetails showEntries={5} />}
        </div>
      </div>

      <Modal open={warningModal} className="flex justify-center items-center">
        <div className="bg-[#036231] flex flex-col items-center gap-2 p-5 rounded-lg w-[90%] sm:w-[45%] md:w-[30%]">
          <div className="flex flex-col items-center gap-2">
            <IoWarning size={30} color={"#fff"} />
            <h1 className="text-lg font-semibold text-white">Are you sure?</h1>
            <p className="text-white text-center">
              {selectedRadio === "0"
                ? "All Customers can join the meeting"
                : selectedRadio === "1"
                  ? "Only Customers with subscription can join meeting"
                  : "Only Customers with volume points greater than 0 can join the meeting"}
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
                onClick={() => {
                  handleConfirm();
                }}
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

      <Modal open={openModal} className="flex justify-center items-center">
        <div className="w-[30%] outline-none flex items-center justify-center bg-white  rounded-lg">
          <div className="w-full  rounded-lg flex flex-col items-center justify-between gap-5 p-4 px-6 relative">
            <div className="flex justify-end w-full">
              <button
                className=""
                onClick={() => {
                  setOpenModal(false);
                  setSelectedRadio("");
                }}
              >
                <CrossIcon w={20} h={20} c="#036231" />
              </button>
            </div>

            <Image
              src="/Enter-OTP-pana.png"
              join
              alt="Enter OTP"
              width={400}
              height={300}
              className="h-64 object-cover"
            />

            <h1 className="text-xl font-semibold text-[#036231] mt-2 mb-4">
              Enter the OTP Received on your Email ID
            </h1>

            <div className="flex flex-col items-center gap-2 w-[100%]">
              <label className=" font-semibold self-start">
                OTP (One Time Password)
              </label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleOtpSubmit();
                  }
                }}
                placeholder="Enter OTP"
                className="w-full p-4 border-2 border-solid border-gray-300 rounded-lg outline-none"
              />

              <button
                onClick={handleOtpSubmit}
                className="bg-[#036231] text-white p-3 mt-4 px-8 rounded-lg font-semibold"
              >
                {btnLoading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function DashboardCard({ icon: Icon, title, value }) {
  return (
    <div className="h-full w-[48%] md:w-[30%] bg-[#036231] rounded-lg p-3 gap-3 md:p-8">
      <div className="h-[40px] w-[40px] rounded-full bg-white flex items-center justify-center">
        {Icon && <Icon h={25} w={25} c={"#036231"} />}
      </div>
      <p className="text-white text-[0.9rem] md:text-[24px] font-semibold mt-2">
        {title}
      </p>
      <p className="text-[0.9rem] md:text-[25px] font-semibold text-white -mt-1">
        {value}
      </p>
    </div>
  );
}

export default Page;
