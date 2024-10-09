import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  CrossIcon,
  Downarrowicon,
  Editgoalicon,
  Feedicon,
} from "@/components/svgs";
import Loader from "@/components/loader/Loader";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";
import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import useOutsideClick from "@/hooks/useOutsideClick";

function Profileinfo({ clientData, fetchClientData }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [editGoalData, setEditGoalData] = useState("");
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [followUpData, setFollowUpData] = useState({});
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isFollowUpDateOpen, setIsFollowUpDateOpen] = useState(false);
  const {
    _id,
    email,
    goal,
    gender,
    age,
    mobileNumber,
    name,
    profilePhoto,
    isActive = false,
    clientId = "",
    healthMatrix,
  } = clientData;
  const { height, heightUnit, weight, weightUnit } =
    clientData?.healthMatrix?.healthMatrix || {};
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  useEffect(() => {
    if (healthMatrix?.healthMatrix[0]) {
      const { height, heightUnit, body_composition } =
        healthMatrix?.healthMatrix[0];
      if (heightUnit === "Inches") {
        const [ft, inch] = height.split(".");
        setFeet(ft);
        setInches(inch);
      }
      setFollowUpData({
        ...followUpData,
        height,
        heightUnit,
        body_composition,
      });
    }
  }, [healthMatrix]);

  /* useEffect(() => {
    if (followUpData.heightUnit !== "Inches") {
      setFeet("");
      setInches("");
    }
  }, [followUpData.heightUnit]); */

  let displayedHeight = height;
  if (heightUnit === "Inches")
    displayedHeight =
      (height.split(".")[0] || "") + " Feet " + (height.split(".")[1] || "");

  const dateDropDownRef = useRef(null);
  const followUpDateDropDownRef = useRef(null);
  const dropDownBtnRef = useRef(null);
  const dropDownRef = useRef(null);

  useOutsideClick(dropDownRef, () => setActiveDropDown(false), dropDownBtnRef);
  useOutsideClick(dateDropDownRef, () => setIsDateOpen(false));
  useOutsideClick(followUpDateDropDownRef, () => setIsFollowUpDateOpen(false));

  // console.log(
  //   "FollowUpData => ",
  //   followUpData?.heightUnit,
  //   followUpData?.height,
  //   followUpData?.body_composition
  // );

  /* useEffect(() => {
    const fetchClientData = async () => {
      setLoading(true);
      // await new Promise((r) => setTimeout(r, 5000));
      try {
        const { data, status } = await apiInstance.getAppClientDetails(
          clientId
        );

        if (status === 200) {
          console.log("response of getApp ClientDetails => ", data);
          setClientData(data?.data ?? {});
        }
      } catch (err) {
        toast.error("Error while fetching client details !");
      }
      setLoading(false);
    };
    fetchClientData();
  }, [clientId]); */

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleFollowUpModalOpen = () => {
    setFollowUpModalOpen(true);
  };

  const handleFollowUpModalClose = () => {
    setFollowUpModalOpen(false);
    setFollowUpData({});
  };

  const handleDateChange = (e) => {
    const name = e.target.name;
    if (name === "date") {
      setFollowUpData({
        ...followUpData,
        date: e.target.value,
      });
    } else {
      setFollowUpData({
        ...followUpData,
        followUpDate: e.target.value,
      });
    }
  };

  const handleHeightChange = (unit, value) => {
    if (unit === "feet") {
      setFeet(value);
      setFollowUpData({
        ...followUpData,
        height: `${value}.${inches}`,
      });
    } else {
      setInches(value);
      setFollowUpData({
        ...followUpData,
        height: `${feet}.${value}`,
      });
    }
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    if (!editGoalData) {
      return toast.error("Goal is required !");
    }
    try {
      setFetchLoading(true);
      const { data, status } = await apiInstance.editClientGoal(_id, {
        goal: editGoalData,
      });
      console.log("response of updateClientGoal => ", data);
      fetchClientData();
      if (status === 200) {
        toast.success(data?.data?.message ?? "Goal updated successfully");
        handleEditModalClose();
        setEditGoalData("");
      }
      setFetchLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error while updating goal !");
      setFetchLoading(false);
    }
  };

  const handleFollowUpSubmit = async (e) => {
    e.preventDefault();
    const keys = [
      "date",
      "weight",
      "weightUnit",
      "height",
      "heightUnit",
      /* "body_composition",
      "visceralFat", */
      "followUpDate",
    ];
    for (const key of keys) {
      if (!followUpData[key]) {
        return toast.error(`${key} is required !`);
      }
    }
    try {
      setFetchLoading(true);
      const { data, status } = await apiInstance.addFollowUp(
        clientData.clientId,
        {
          ...followUpData,
        }
      );
      console.log("response of addFollowUp => ", data);
      if (status === 200) {
        toast.success("Follow up added successfully");
        handleFollowUpModalClose();
        setFollowUpData({});
        fetchClientData();
      }
      setFetchLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      setFetchLoading(false);
    }
  };

  const changeActiveStatus = async (activeStatus) => {
    try {
      const { status } = await apiInstance.updateAppClientStatus(
        _id,
        activeStatus
      );
      if (status === 200) {
        fetchClientData();
      }
    } catch (err) {
      toast.error("Error while updating status");
      console.log("change ActiveStatus err => ", err);
    }
  };

  return (
    <div className="h-full w-full p-3 flex flex-col overflow-scroll scrollbar-hide">
      <div className=" w-full flex flex-col items-center ">
        <Image
          src={
            !profilePhoto || profilePhoto.length === 0
              ? "/default-user-dp.svg"
              : profilePhoto
          }
          alt=""
          unoptimized
          className=" rounded-lg h-[100px]  w-[100px]"
          height={0}
          width={0}
        />

        <p className=" font-semibold text-[20px] mt-2">
          {name ?? "TWP Customer"}
        </p>

        <p className=" text-[#909090] text-base font-medium -mt-1">
          {"#" + clientId ?? ""}
        </p>

        {/* <div className=" w-[20%] h-[4px] bg-[#84C52A] rounded-md mt-1"></div> */}
        <div className="flex flex-col gap-1">
          <button
            ref={dropDownBtnRef}
            className="flex items-center justify-center gap-3 h-[35px] w-[6.5rem] bg-[#036231] text-white rounded-md cursor-pointer"
            onClick={() => setActiveDropDown((prev) => !prev)}
          >
            <p>{isActive ? "Active" : "InActive"}</p>
            {activeDropDown ? (
              <IoChevronUp fontSize={20} />
            ) : (
              <IoChevronDown fontSize={20} />
            )}
          </button>

          {activeDropDown && (
            <div
              className="flex flex-col items-center justify-center gap-1 w-[6.5rem] bg-[#036231] text-white rounded-md"
              ref={dropDownRef}
            >
              <button
                classname="cursor-pointer"
                onClick={() => changeActiveStatus(true)}
              >
                Active
              </button>

              <div className="w-[70%] bg-white h-[1px]"></div>

              <button
                classname="cursor-pointer"
                onClick={() => changeActiveStatus(false)}
              >
                InActive
              </button>
            </div>
          )}
        </div>
      </div>

      <div className=" w-full mt-2">
        <p className=" font-semibold">Goal</p>

        <p className=" text-sm text-[#4D4D4D]">{goal ?? "No goal yet"}</p>
      </div>

      <div className=" flex items-center justify-center mt-4 gap-2">
        <button
          className="flex items-center justify-center gap-3 h-[35px] w-[130px] bg-[#036231] text-white rounded-md"
          onClick={handleEditModalOpen}
        >
          <Editgoalicon h={18} w={18} />
          Edit Goal
        </button>

        <button
          className="flex items-center justify-center gap-3 h-[35px] w-[130px] bg-[#036231] text-white rounded-md"
          onClick={handleFollowUpModalOpen}
        >
          <Feedicon h={15} w={15} c={"white"} />
          Follow-up
        </button>
      </div>

      <div className=" w-full mt-7">
        <p className=" font-semibold">Personal Information</p>

        <div className=" w-full h-[2px] bg-[#00000026] mt-1"></div>

        <div className=" w-full flex flex-col gap-1 mt-1">
          <Detail title={"Email"} data={email ?? ""} />
          <Detail title={"Phone"} data={mobileNumber ?? ""} />
          <Detail title={"Gender"} data={gender ?? ""} />
          <Detail title={"Age"} data={age ?? ""} />
          <Detail
            title={"Height"}
            data={`${displayedHeight ?? "N/A"} ${heightUnit ?? ""}`}
          />
          <Detail
            title={"Weight"}
            data={`${weight ?? "N/A"} ${weightUnit ?? ""}`}
          />
        </div>
      </div>

      {/* Edit Goal Modal */}
      <Modal
        open={editModalOpen}
        onClose={handleEditModalClose}
        className="flex items-center justify-center"
      >
        <div className="w-[90%]  md:w-[50%] lg:w-[30%] outline-none">
          <div className="h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl w-full text-white text-[1.3rem] relative">
            Edit Goal
            <button
              className="absolute right-6 cursor-pointer"
              onClick={handleEditModalClose}
            >
              <RxCross2
                className="cursor-pointer"
                onClick={handleEditModalClose}
                fontSize={25}
              />
            </button>
          </div>

          <form
            className="bg-white p-5 rounded-b-2xl min-h-[300px] flex flex-col justify-between"
            onSubmit={handleGoalSubmit}
          >
            <textarea
              className="w-full h-[150px] border-[1px] border-[#00000026] rounded-md p-2 outline-none"
              placeholder="New Goal"
              value={editGoalData}
              onChange={(e) => setEditGoalData(e.target.value)}
            ></textarea>

            <button
              className="w-full h-[35px] bg-[#036231] text-white rounded-md mt-3"
              type="submit"
            >
              {fetchLoading ? (
                <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px]">
                  <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                </div>
              ) : (
                "Update Goal"
              )}
            </button>
          </form>
        </div>
      </Modal>

      {/* Follow Up Modal */}
      <Modal
        open={followUpModalOpen}
        onClose={handleFollowUpModalClose}
        className="flex items-center justify-center"
      >
        <div className="w-[90%] md:w-[50%] lg:w-[30%]  outline-none">
          <div className="h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl w-full text-white text-[1.3rem] relative">
            Follow Up
            <button
              className="absolute right-6 cursor-pointer"
              onClick={handleFollowUpModalClose}
            >
              <RxCross2
                className="cursor-pointer"
                onClick={handleFollowUpModalClose}
                fontSize={25}
              />
            </button>
          </div>

          <form
            className="bg-white p-5 rounded-b-2xl min-h-[300px] flex flex-col gap-4"
            onSubmit={handleFollowUpSubmit}
          >
            <div className="relative w-full" ref={dateDropDownRef}>
              <input
                type="text"
                value={followUpData?.date ?? ""}
                readOnly
                onClick={() => setIsDateOpen(!isDateOpen)}
                className="w-full border-2 border-gray-300 rounded-md p-3 outline-none"
                placeholder="Date"
              />
              {isDateOpen && (
                <div className="absolute mt-2 w-full bg-white shadow-lg rounded z-50">
                  <input
                    type="date"
                    name="date"
                    onChange={handleDateChange}
                    className="p-2 border rounded w-full outline-none"
                  />
                </div>
              )}
            </div>

            <div className="relative mt-2  text-gray-500 w-full">
              <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                <select
                  className={`text-sm outline-none rounded-lg h-full ${followUpData?.weightUnit ? "text-black" : "text-gray-500"
                    }`}
                  onChange={(e) =>
                    setFollowUpData({
                      ...followUpData,
                      weightUnit: e.target.value,
                    })
                  }
                >
                  <option value="">Unit</option>
                  <option>KG</option>
                  <option>Pounds</option>
                </select>
              </div>
              <input
                type="number"
                step="0.01"
                placeholder="Weight"
                onChange={(e) => {
                  setFollowUpData({
                    ...followUpData,
                    weight: e.target.value,
                  });
                }}
                className="w-full  text-black pl-24 py-2 appearance-none bg-transparent outline-none border-[1px] border-[#00000026] shadow-sm rounded-lg "
              />
            </div>

            <div className="relative mt-2  text-gray-500 w-full">
              <div className="absolute inset-y-0 left-0 my-auto h-6 flex items-center border-r pr-2">
                <select
                  className={`text-sm outline-none rounded-lg border-[1px] h-[42px] p-2 border-[#00000026] ${followUpData?.heightUnit ? "text-black" : "text-gray-500"
                    }`}
                  value={followUpData?.heightUnit ?? ""}
                  onChange={(e) =>
                    setFollowUpData({
                      ...followUpData,
                      heightUnit: e.target.value,
                    })
                  }
                >
                  <option value="">Unit</option>
                  <option value="Inches">Inches</option>
                  <option value="Cms">Cms</option>
                </select>
              </div>
              {followUpData?.heightUnit === "Inches" ? (
                <div className="flex space-x-2 pl-24">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Feet"
                    value={feet}
                    onChange={(e) => handleHeightChange("feet", e.target.value)}
                    className="w-1/2 text-black py-2 px-2 appearance-none bg-transparent outline-none border-[1px] border-[#00000026] shadow-sm rounded-lg"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Inches"
                    value={inches}
                    onChange={(e) =>
                      handleHeightChange("inches", e.target.value)
                    }
                    className="w-1/2 text-black py-2 px-2 appearance-none bg-transparent outline-none border-[1px] border-[#00000026] shadow-sm rounded-lg"
                  />
                </div>
              ) : (
                <input
                  type="number"
                  step="0.01"
                  placeholder="Height"
                  value={followUpData?.height ?? ""}
                  onChange={(e) =>
                    setFollowUpData({
                      ...followUpData,
                      height: e.target.value,
                    })
                  }
                  className="w-full pl-24 text-black py-2 appearance-none bg-transparent outline-none border-[1px] border-[#00000026] shadow-sm rounded-lg"
                />
              )}
            </div>

            <select
              className={`w-full h-[35px] border-[1px] border-[#00000026] rounded-md p-2 py-2 outline-none ${followUpData?.body_composition ? "text-black" : "text-gray-500"
                }`}
              value={followUpData?.body_composition ?? ""}
              onChange={(e) =>
                setFollowUpData({
                  ...followUpData,
                  body_composition: e.target.value,
                })
              }
            >
              <option value="">Fat</option>
              <option>Slim</option>
              <option>Medium</option>
              <option>Over Weight</option>
            </select>

            <input
              type="number"
              min={0}
              placeholder="Visceral Fat"
              className="w-full  p-2 appearance-none bg-transparent outline-none border-[1px] border-[#00000026]  shadow-sm rounded-lg"
              onChange={(e) => {
                setFollowUpData({
                  ...followUpData,
                  visceralFat: e.target.value,
                });
              }}
            />

            <div className="relative w-full" ref={followUpDateDropDownRef}>
              <input
                type="text"
                value={followUpData?.followUpDate ?? ""}
                readOnly
                onClick={() => setIsFollowUpDateOpen(!isFollowUpDateOpen)}
                className="w-full border-2 border-gray-300 rounded-md p-3 outline-none"
                placeholder="Follow Up Date"
              />
              {isFollowUpDateOpen && (
                <div className="absolute mt-2 w-full bg-white shadow-lg rounded z-50">
                  <input
                    type="date"
                    name="followUpDate"
                    onChange={handleDateChange}
                    className="p-2 border rounded w-full outline-none"
                  />
                </div>
              )}
            </div>

            <button
              className="w-full h-[35px] bg-[#036231] text-white rounded-md mt-2"
              type="submit"
            >
              {fetchLoading ? (
                <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px]">
                  <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Profileinfo;

function Detail({ title, data }) {
  return (
    <div className=" w-full flex ">
      <p className=" w-[30%] text-[#959595] font-medium">{title}:</p>
      <p className=" text-black font-medium">{data}</p>
    </div>
  );
}
