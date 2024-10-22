"use client";

import Footer from "@/components/core/Footer";
import apiInstance from "@/helpers/api";
import { Modal } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function Page({ params }) {
  const router = useRouter();
  const [rollNo, setRollNo] = useState("");
  const [newClientModal, setNewClientModal] = useState(false);
  const { link } = params;

  async function joinMeeting() {
    try {
      const { data } = await apiInstance.verifyClient(link, rollNo);
      console.log(data)
      if (data?.status && data.status === true) {
        router.push(data.data);
        console.log(data?.response?.accountFound, data.response, data)
        toast.success("Verification Success!, redirecting to meet...");
      } else {
        toast.error(data.message || data.error || "Failed to join!");
        console.log(data)
        if (data?.accountFound) setNewClientModal(true)
      }
    } catch (err) {
      console.log("error in verifyClient => ", err);
      toast.error(err?.response?.data?.message || "Failed to join!");
      if (!err.response.data?.accountFound) setNewClientModal(true)
    }
  }

  // console.log(link[0]);
  return (
    <>
      <nav className="bg-white mt-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start border-b-2 pb-3 border-b-gray-400">
              <Link href="https://www.thewellnesspoint.club" target="_blank" className="flex-shrink-0 flex items-center">
                <Image
                  alt="TWP Logo"
                  height={100}
                  src="/wc-logo-black.svg"
                  width={100}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full min-h-[100vh] h-fit my-4 flex items-center justify-center relative">
        <h1 className="text-[300px] hidden sm:block sm:text-[600px] text-gray-300 tracking-wide absolute z-0">
          WZ
        </h1>

        <div className="bg-white p-6 px-10 rounded-xl  sm:mt-4 flex flex-col z-10 w-[90%] max-w-3xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] h-[60vh] ">
          <p className=" text-[#036231] text-[35px] sm:text-[45px] font-extrabold drop-shadow-lg mt-5 text-center">
            TWP <span className=" text-black"> Club</span>
          </p>

          <div className="w-full flex items-center justify-center flex-col font-bold text-lg mt-8 gap-5">
            <p className="text-[15px] sm:text-[20px]">Please Enter your Allocated Roll Number given by your Coach</p>

            <div className="w-full sm:w-[70%] h-[47px] flex items-center justify-between border-[1px] border-[#00000060] border-solid rounded-2xl overflow-hidden ">
              <input
                type="text"
                className=" w-[calc(100%-150px)] h-full font-extralight outline-none px-4 "
                placeholder="Enter Roll no"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />

              <button
                onClick={joinMeeting}
                className=" w-[120px] h-full bg-[#036231] text-white font-medium rounded-2xl"
              >
                Enter Meet
              </button>
            </div>
          </div>
          <button
            className="w-fit bg-green-800 text-white px-4 py-2 mt-10 mx-auto rounded-md"
            onClick={() => setNewClientModal(true)}
          >
            Don&apos;t Have Customer ID
          </button>
        </div>
      </div>
      {newClientModal && <NewClientModal
        open={newClientModal}
        onClose={() => setNewClientModal(false)}
        meetingLink={link} />}
      <Footer />
    </>
  );
}

export default Page;

function NewClientModal({ open, onClose, meetingLink }) {
  const [joining, setJoining] = useState(false);
  const router = useRouter();
  const [clientCreated, setClientCreated] = useState({
    accountDeactivated: false,
    opened: false,
    rollNo: null,
    meetRedirectLink: ""
  });

  async function joinMeeting(e) {
    try {
      e.preventDefault();
      setJoining(true);

      const formData = {
        name: e.currentTarget.name.value,
        phoneNumber: e.currentTarget.phoneNumber.value,
        city: e.currentTarget.city.value,
        sponsor: e.currentTarget.sponsor.value,
      }

      if (!formData.name || !formData.phoneNumber) {
        toast.error("Name & Phone Number are required!");
        return
      }

      const response = await apiInstance.joinMeetNewClient(meetingLink, formData);

      if (response?.data?.accountDeactivated) {
        toast.error(response?.data?.message);
        return
      }
      if (response?.data?.success) {
        setClientCreated({
          opened: true,
          rollNo: response?.data?.rollno,
          meetRedirectLink: response?.data?.meetRedirectLink,
          accountDeactivated: response?.data?.accountDeactivated
        });
      }
    } catch (error) {
      toast.error(error.message || "Internal Server Error!");
    } finally {
      setJoining(false)
    }
  }

  return <Modal onClose={onClose} open={open} className="flex items-center justify-center">
    <div className="bg-white w-full max-w-[500px] px-4 py-4 rounded-md">
      <h1 className="text-xl font-bold mb-8">Fill out the form to enter meeting</h1>
      <form onSubmit={joinMeeting}>

        <input
          type="text"
          className="w-full py-2 px-4 mb-4 border-2 rounded-md focus:outline-none"
          placeholder="Enter Name"
          name="name"
        />
        <input
          type="number"
          className="w-full py-2 px-4 mb-4 border-2 rounded-md focus:outline-none"
          placeholder="Enter Number"
          name="phoneNumber"
        />
        <input
          type="text"
          className="w-full py-2 px-4 mb-4 border-2 rounded-md focus:outline-none"
          placeholder="Enter City"
          name="city"
        />
        <input
          type="text"
          className="w-full py-2 px-4 mb-4 border-2 rounded-md focus:outline-none"
          placeholder="Referred By"
          name="sponsor"
        />
        <button type="submit" disabled={joining} className={`bg-green-600 text-white px-4 py-2 rounded-md ${joining && "cursor-not-allowed opacity-60"}`}>
          {joining
            ? <>Wait...</>
            : <>Submit</>}
        </button>
        <div role="button" onClick={onClose} className="inline px-4 py-[8px] ml-4 border-2 border-green-600 rounded-md select-none">Cancel</div>
      </form>
      {clientCreated.opened && <div className="mt-8">
        <p className="text-[20px] font-semibold">Your Roll No is - {clientCreated.rollNo}</p>
        <button
          className="bg-green-800 text-white px-4 py-2 mt-2 rounded-md "
          onClick={() => router.push(clientCreated.meetRedirectLink)}>
          Join Meet
        </button>
      </div>}
    </div>
  </Modal>
}