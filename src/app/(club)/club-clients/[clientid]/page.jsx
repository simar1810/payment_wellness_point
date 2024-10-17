"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Backicon,
  DeleteIcon,
  Editicon,
  EyeIcon,
  MeetingSuccessIcon,
} from "@/components/svgs";
import apiInstance from "@/helpers/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VolumePoints from "@/components/pages/club-clients/VolumePoints";
import { useDispatch, useSelector } from "react-redux";
import { setDetailsTab } from "@/redux/slices/userSlice";
import Modal from "@mui/material/Modal";
import { IoWarning } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components/pages/club-clients";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import useOutsideClick from "@/hooks/useOutsideClick";
import Loader from "@/components/loader/Loader";
import SepcialMode from "@/components/pages/club-clients/SpecialMode";

export default function Page({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState({});
  const [subscriptionInfo, setSubscriptionInfo] = useState([]);
  const [addSubscriptionModal, setAddSubscriptionModal] = useState(false);

  const [subscriptionDetails, setSubscriptionDetails] = useState({
    startDate: "",
    endDate: "",
    paymentMode: "",
    amount: "",
    invoice: "",
  });
  // console.log("subscriptionDetails => ", subscriptionDetails);
  const [nextTab, setNextTab] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isSubscriptionModal, setIsSubscriptionModal] = useState(false);
  let activeTab = useSelector(
    (state) => state.user.tabPreference.clubClientDetailsTab
  );
  const { clientid } = params;
  const dispatch = useDispatch();
  const clubSystem = useSelector((state) => state.user.clubSystem);

  const [activeDropDown, setActiveDropDown] = useState(false);
  const dropDownBtnRef = useRef(null);
  const dropDownRef = useRef(null);
  useOutsideClick(dropDownRef, () => setActiveDropDown(false), dropDownBtnRef);

  const fetchClientData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.getClientDetails(clientid);
      if (status == 200) {
        setClientInfo(data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [clientid]);

  const FetchSubscriptionInfo = useCallback(async () => {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.getSubscriptionInfoClient(
        clientid
      );
      if (status == 200) {
        setSubscriptionInfo(data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [clientid]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  useEffect(() => {
    FetchSubscriptionInfo();
  }, [FetchSubscriptionInfo]);

  const handleTabChange = (tab) => {
    dispatch(
      setDetailsTab({
        tab: "clubClientDetailsTab",
        value: tab,
      })
    );
  };

  if (loading) {
    return (
      <div className=" p-5 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (clubSystem === 1) {
    activeTab = "Subscription";
  } else if (clubSystem === 2) {
    activeTab = "VolumePoints";
  }

  const handleAddSubscription = async () => {
    const keys = ["startDate", "endDate", "paymentMode", "amount", "invoice"];
    for (let key of keys) {
      if (!subscriptionDetails[key]) {
        toast.error(`${key} is required`);
        return;
      }
    }

    setAddLoading(true);
    try {
      const response = await apiInstance.addSubscription(
        clientid, subscriptionDetails
      );
      if (response.status === 200) {
        setAddSubscriptionModal(false);
        FetchSubscriptionInfo();
        fetchClientData();
        toast.success("Subscription Added Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Subscription");
    }
    setAddLoading(false);
  };

  const changeActiveStatus = async (activeStatus) => {
    try {
      const { status } = await apiInstance.updateClubClientStatus(
        clientid,
        activeStatus
      );
      if (status === 200) {
        fetchClientData();
        setActiveDropDown(false);
      }
    } catch (err) {
      toast.error("Error while updating status");
      console.error("change club client Status err => ", err);
    }
  };

  return (
    <div className="w-full p-2 bg-[#f4f4f4] max-h-[100vh] overflow-y-scroll scrollbar-hide">
      <div className="h-full p-4 w-full bg-white rounded-lg relative shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
        {isDeleteModal && (
          <DeleteModal
            setIsDeleteModal={setIsDeleteModal}
            isDeleteModal={isDeleteModal}
            clientid={clientid}
          />
        )}

        <button
          className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md"
          onClick={() => router.back()}
        >
          <Backicon h={15} w={15} c={"white"} />
          Back
        </button>

        <div className=" mt-4 flex flex-col gap-4">
          <div className=" h-[100px] w-[100px] border-[2px] border-solid border-[#036231] rounded-full p-[2px]">
            <Image
              src={
                clientInfo?.profilePhoto && clientInfo.profilePhoto.length > 0
                  ? clientInfo?.profilePhoto
                  : "/default-user-dp.svg"
              }
              alt=""
              width={0}
              height={0}
              unoptimized
              className=" h-full w-full rounded-full "
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-start justify-between ">
            <div className="w-full flex justify-between sm:justify-start sm:gap-4 items-center sm:items-start gap-2">
              <div className="flex w-fit items-center gap-2">
                <p className="whitespace-nowrap text-xl font-semibold uppercase">
                  {clientInfo.name}
                </p>
                <p className=" text-[#00000080] font-medium text-sm">
                  #{clientInfo.rollno}
                </p>
              </div>

              {clubSystem === 0 ? (
                <div className="flex flex-col gap-1">
                  <button
                    ref={dropDownBtnRef}
                    className={`flex items-center justify-center gap-3 h-[35px] w-[6.5rem] ${clientInfo?.isActive ? "bg-[#03632C]" : "bg-[#EA4335]"
                      }  text-white rounded-md cursor-pointer`}
                    onClick={() => setActiveDropDown((prev) => !prev)}
                  >
                    <p>{clientInfo?.isActive ? "Active" : "InActive"}</p>
                    {activeDropDown ? (
                      <IoChevronUp fontSize={20} />
                    ) : (
                      <IoChevronDown fontSize={20} />
                    )}
                  </button>

                  {activeDropDown && (
                    <div
                      className="flex flex-col items-center justify-center gap-1 w-[6.5rem] bg-[#03632C] text-white rounded-md"
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
              ) : clubSystem === 1 ? (
                clientInfo.isSubscription ? (
                  <button className="px-4 h-[30px] text-white bg-[#03632C] rounded">
                    Active
                  </button>
                ) : (
                  <button className="px-4 h-[30px] text-white bg-[#EA4335] rounded">
                    In-Active
                  </button>
                )
              ) : clubSystem === 2 ? (
                clientInfo.volumePoints > 0 ? (
                  <button className="px-4 h-[30px] text-white bg-[#03632C] rounded">
                    Active
                  </button>
                ) : (
                  <button className="px-4 h-[30px] text-white bg-[#EA4335] rounded">
                    In-Active
                  </button>
                )
              ) : (
                <button className=" w-full h-[30px] text-white bg-[#EA4335] rounded">
                  In-Active
                </button>
              )}
            </div>

            <div className="w-full flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteModal(true)}
                className=" h-[30px]  px-4 border-[2px] text-[14px] border-solid border-[#EA4335] text-[#EA4335] flex items-center gap-2 rounded-md"
              >
                <DeleteIcon h={20} w={20} c={"#EA4335"} /> Delete
              </button>
              <button
                onClick={() =>
                  router.push(`/club-clients/editClient/${clientid}`)
                }
                className=" h-[30px]  px-4 border-[2px] text-[14px] border-solid border-[#03632C] text-[#03632C] flex items-center gap-2 rounded-md"
              >
                <Editicon h={14} w={14} c={"#03632C"} /> Edit
              </button>
            </div>
          </div>

          <div className=" w-full h-[1.5px] bg-[#00000040]"></div>

          <div className="flex flex-col sm:flex-row w-full">
            <div className="w-[50%] flex flex-col gap-1">
              <Detail name={"Name"} data={clientInfo.name} />
              <Detail name={"Email"} data={clientInfo.email} />
              <Detail name={"Mobile Number"} data={clientInfo.mobileNumber} />
              <Detail name={"Sponsored by"} data={clientInfo.sponseredByName} />
            </div>
            <div className="w-[50%] flex flex-col gap-1">
              <Detail name={"City"} data={clientInfo.city} />
              {/* <Detail name={"Customer Id"} data={clientInfo._id} /> */}
              <Detail name={"Joining Date"} data={clientInfo.joiningDate} />
              <div className=" flex items-center gap-3">
                <p className=" font-semibold text-sm">Attendance</p>
                <p
                  onClick={() =>
                    router.push(
                      `/club-clients/attendance/${clientInfo?._id ?? "na"}/${clientInfo.name ?? "na"
                      }`
                    )
                  }
                  className=" text-sm font-semibold text-[#00000080] cursor-pointer underline-offset-2 underline"
                >
                  View Report
                </p>
              </div>
            </div>
          </div>

          <div className=" w-full h-[1.5px] bg-[#00000040]"></div>

          <div className="flex gap-4">
            {(clubSystem === 0 || clubSystem === 1) && (
              <button
                onClick={() => handleTabChange("Subscription")}
                className={`px-4 py-2 ${activeTab === "Subscription"
                  ? "text-[#036231] text-lg font-semibold border-b-2 border-[#036231]"
                  : "text-lg"
                  }`}
              >
                Subscription
              </button>
            )}

            {(clubSystem === 0 || clubSystem === 2) && (
              <button
                onClick={() => handleTabChange("VolumePoints")}
                className={`px-4 py-2 ${activeTab === "VolumePoints"
                  ? "text-[#036231] text-lg font-semibold border-b-2 border-[#036231]"
                  : "text-lg"
                  }`}
              >
                Volume Points
              </button>
            )}

            {activeTab === "Subscription" && clubSystem === 1 && (
              <button
                className="ml-auto p-1 px-4 border text-sm text-[#036231] border-[#036231] font-semibold  rounded-md"
                onClick={() => setAddSubscriptionModal(true)}
              >
                Add Subscription
              </button>
            )}
          </div>

          <div>
            {clubSystem === 0 ? (
              <div className="min-h-[400px] flex flex-col justify-center items-center">
                <Image
                  src="/No data-rafiki.png"
                  alt="no access"
                  width={400}
                  height={250}
                  className="object-cover"
                />
                <h1 className="font-extrabold text-3xl text-[#036231] mb-2">
                  Mode Locked
                </h1>
                <p className="text-[#757575] text-center w-[400px] font-semibold">
                  You need to change your club type for accessing this.
                </p>
                <Link
                  href={"/club-dashboard"}
                  className="border-2 border-[#036231] text-[#036231] font-semibold px-6 py-3 rounded-2xl mt-4"
                >
                  Change Now
                </Link>
              </div>
            ) : activeTab === "Subscription" && clubSystem === 1 ? (
              <div className="w-full overflow-x-scroll">
                <p className=" font-semibold text-lg mb-4">
                  Subscription Details
                </p>
                <div className="w-[170%] sm:w-full  text-sm  font-semibold flex justify-between gap-1">
                  <p className=" w-[10%] flex  ">Sr.no</p>
                  <p className=" w-[15%] flex justify-center ">Invoice No.</p>
                  <p className=" w-[15%] flex justify-center ">Valid From</p>
                  <p className=" w-[15%] flex justify-center ">Valid Till</p>
                  <p className=" w-[15%] flex justify-center">
                    Mode
                  </p>
                  <p className=" w-[15%] flex justify-center ">Amount</p>
                </div>
                <div className=" h-[1px] w-full bg-[#EEEEEE]"></div>

                {subscriptionInfo.map((subscription, index) => (
                  <InvoiceDetails
                    key={index}
                    subscriptionInfo={subscription}
                    numberAt={index + 1}
                  />
                ))}
              </div>
            ) : activeTab === "VolumePoints" && clubSystem === 2 ? (
              <VolumePoints
                clientId={clientid}
                fetchClientData={fetchClientData}
                clubSystem={clubSystem}
              />
            ) : clubSystem === 3 ? <>
              <SepcialMode
                clientId={clientid}
                fetchClientData={fetchClientData}
                clubSystem={clubSystem}
              />
            </>
              : (
                <div className="min-h-[400px] flex flex-col justify-center items-center">
                  <Image
                    src="/No data-rafiki.png"
                    alt="no access"
                    width={400}
                    height={250}
                    className="object-cover"
                  />
                  <h1 className="font-extrabold text-3xl text-[#036231] mb-2">
                    Mode Locked
                  </h1>
                  <p className="text-[#757575] text-center w-[400px] font-semibold">
                    You need to change your club type for accessing this
                  </p>
                  <Link
                    href={"/club-dashboard"}
                    className="border-2 border-[#036231] text-[#036231] font-semibold px-6 py-3 rounded-2xl mt-4"
                  >
                    Change Now
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Add Subscription Modal */}
      <Modal
        open={addSubscriptionModal}
        className="flex justify-center items-center"
      >
        <div className="bg-white flex flex-col items-center gap-2  rounded-xl w-[90%] sm:w-[40%]">
          <div className="w-full flex justify-center items-center mb-4 p-5 bg-[#036231] rounded-t-xl relative">
            <h1 className="text-xl text-white">Add Subscription</h1>
            <button
              type="button"
              onClick={() => setAddSubscriptionModal(false)}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <IoMdClose fontSize={30} color="#fff" />
            </button>
          </div>
          <div className="flex flex-col gap-4 p-5 px-7 w-full">
            <div className="flex gap-2 items-center">
              <div className="w-full">
                <label className="block font-semibold text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  className="mt-1 p-2 border rounded w-full  outline-none border-gray-300"
                  value={subscriptionDetails.startDate}
                  onChange={(e) =>
                    setSubscriptionDetails({
                      ...subscriptionDetails,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  className="mt-1 p-2 border rounded w-full  outline-none border-gray-300"
                  value={subscriptionDetails.endDate}
                  onChange={(e) =>
                    setSubscriptionDetails({
                      ...subscriptionDetails,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full mt-3">
              <label className="block font-semibold text-gray-700">
                Payment Mode
              </label>
              <select
                className="w-full p-2 mt-1 border rounded outline-none border-gray-300"
                value={subscriptionDetails.paymentMode}
                onChange={(e) =>
                  setSubscriptionDetails({
                    ...subscriptionDetails,
                    paymentMode: e.target.value,
                  })
                }
              >
                <option value="">Select Payment Mode</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="net-banking">Net Banking</option>
              </select>
            </div>

            <div className="w-full mt-3">
              <label className="block font-semibold text-gray-700">
                Amount
              </label>
              <input
                type="number"
                className="mt-1 p-2 border rounded w-full  outline-none border-gray-300"
                value={subscriptionDetails.amount}
                placeholder="Enter Amount"
                onChange={(e) =>
                  setSubscriptionDetails({
                    ...subscriptionDetails,
                    amount: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full mt-3">
              <label className="block font-semibold text-gray-700">
                Invoice
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full outline-none border-gray-300"
                value={subscriptionDetails.invoice}
                placeholder="Enter Invoice Number"
                onChange={(e) =>
                  setSubscriptionDetails({
                    ...subscriptionDetails,
                    invoice: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full mt-6 flex justify-end">
              <button
                onClick={handleAddSubscription}
                className="bg-[#036231] text-white text-lg py-3 px-6 rounded-lg font-semibold w-full"
              >
                {addLoading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Add Subscription"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Detail({ name, data }) {
  return (
    <div className=" flex items-center gap-3">
      <p className=" font-semibold text-sm">{name}:</p>
      <p className=" text-sm font-semibold text-[#00000080]">{data}</p>
    </div>
  );
}

function InvoiceDetails({ subscriptionInfo, numberAt }) {
  return (
    <div className="w-[170%] sm:w-full  text-sm  font-medium flex  justify-between gap-1 mb-2">
      <p className=" w-[10%] flex  ">{numberAt}</p>
      <p className=" w-[15%] flex justify-center ">
        {subscriptionInfo?.invoice ?? "N/A"}
      </p>
      <p className=" w-[15%] flex justify-center ">
        {subscriptionInfo?.startDate ?? "N/A"}{" "}
      </p>
      <p className=" w-[15%] flex justify-center ">
        {subscriptionInfo?.endDate ?? "N/A"}
      </p>
      <p className=" w-[15%] flex justify-center">
        {subscriptionInfo?.paymentMode ?? "Free"}
      </p>
      <p className=" w-[15%] flex justify-center ">
        {subscriptionInfo?.amount ?? "N/A"}
      </p>
      {/* <p className=' w-[15%] flex justify-center '>
        <EyeIcon h={20} w={20} c={"#969696"} />
      </p> */}
    </div>
  );
}
