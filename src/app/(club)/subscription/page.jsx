"use client";
import { NoDataPage } from "@/components/core";
import Loader from "@/components/loader/Loader";
import { SubscriptionIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Page() {
  const [subscriptionInfo, setSubscriptionInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { subscriptionStatus = false } = user;
  // const subscriptionStatus = false;

  async function fetchSubscriptionDetails() {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.getAllClubSubscriptions();
      console.log("data of getAllClubSubscriptions => ", data);
      if (status === 200) {
        setSubscriptionInfo(data.data);
      }
    } catch (error) {
      console.log("getAll ClubSubscriptions api error => ", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" h-full w-full overflow-scroll scrollbar-hide p-10">
      <div className=" w-full bg-white p-5 flex flex-col items-center">
        <SubscriptionIcon h={350} w={350} />
        {subscriptionStatus && (
          <p className=" text-[22px] font-bold -mt-8">
            Your Subscription is Active
          </p>
        )}

        {!subscriptionStatus && (
          <p className=" text-[22px] font-bold -mt-8">
            Your Subscription Has Expired !!!
          </p>
        )}

        {subscriptionStatus && (
          <p className=" text-[#00000080]  font-semibold mt-2">
            Valid Till:{" "}
            {subscriptionInfo &&
              subscriptionInfo.length > 0 &&
              subscriptionInfo[0]?.endDate
              ? subscriptionInfo[0]?.endDate
              : "N/A"}
          </p>
        )}

        {!subscriptionStatus && (
          <Link href={"/subscription/plan"}>
            <button className=" border-[#036231] bg-[#036231] border-[2px] border-solid text-[18px] font-medium py-[6px] px-5 text-[white] rounded-lg mt-2">
              Renew Subscription
            </button>
          </Link>
        )}

        <div className="w-full overflow-x-scroll mt-3">
          <p className=" font-semibold text-[20px]">Subscription History</p>
          <div className="w-[250%] sm:w-full border-[1px] border-solid border-[#00000040] rounded-md mt-1 px-2 py-1">
            <div className="text-sm  font-semibold flex gap-1 py-1">
              <p className=" w-[10%] flex ">Sr.no</p>
              <p className=" w-[19%] flex justify-center ">Invoice No.</p>
              <p className=" w-[19%] flex justify-center ">Valid From</p>
              <p className=" w-[19%] flex justify-center ">Valid Till</p>
              <p className=" w-[19%] flex justify-center">Mode of Payment</p>
              <p className=" w-[19%] flex justify-center ">Amount</p>
              {/* <p className=" w-[15%] flex justify-center ">View</p> */}
            </div>
            <div className=" h-[1px] w-full bg-[#00000040]"></div>

            {!subscriptionInfo || subscriptionInfo.length === 0 ? (
              <div className="w-[45%] sm:w-full">
                <NoDataPage />
              </div>
            ) : (
              <div className=" flex flex-col gap-1">
                {subscriptionInfo.map((subscription, index) => (
                  <InvoiceDetails
                    key={index}
                    subscriptionInfo={subscription}
                    numberAt={index + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

function InvoiceDetails({ subscriptionInfo, numberAt }) {
  return (
    <div className="w-full text-sm  font-medium flex gap-1">
      <p className=" w-[10%] flex ml-1  ">{numberAt}</p>
      <p className=" w-[19%] flex justify-center ">
        {subscriptionInfo?.razorpay_payment_id
          ? subscriptionInfo?.razorpay_payment_id.slice(4)
          : ""}
      </p>
      <p className=" w-[19%] flex justify-center ">
        {subscriptionInfo.startDate}{" "}
      </p>
      <p className=" w-[19%] flex justify-center ">
        {subscriptionInfo.endDate}
      </p>
      <p className=" w-[19%] flex justify-center">
        {subscriptionInfo.paymentMode}
      </p>
      <p className=" w-[19%] flex justify-center ">
        {subscriptionInfo?.amount ?? "N/A"}
      </p>
      {/* <p className=" w-[15%] flex justify-center ">
        <EyeIcon h={20} w={20} c={"#969696"} />
      </p> */}
    </div>
  );
}
