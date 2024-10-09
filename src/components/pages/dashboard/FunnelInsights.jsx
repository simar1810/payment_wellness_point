import { TextInput } from "@/components/core/inputs";
import { Modal } from "@mui/material";
import { set } from "lodash";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

function FunnelInsights() {
  const [isFunnelModelOpen, setIsFunnelModelOpen] = useState(false);
  const [funnelData, setFunnelData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [isRequestSent, setIsRequestSent] = useState(false);

  const onCloseHandler = () => {
    setIsFunnelModelOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFunnelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!funnelData.name) {
      toast.error("Name is required");
      return;
    }
    if (!funnelData.mobile && !funnelData.email) {
      toast.error("Mobile or Email is required");
      return;
    }

    if (funnelData.mobile && funnelData.mobile.length < 10) {
      toast.error("Mobile number should be 10 digits");
      return;
    }

    if (funnelData.name && (funnelData.mobile || funnelData.email)) {
      toast.success("Request Submitted Successfully");
      setFunnelData({
        name: "",
        mobile: "",
        email: "",
      });
      setIsRequestSent(true);
      return;
    }
  };

  return (
    <div className=" w-full min-h-[320px] funnels">
      <div className=" px-2 flex flex-col justify-between min-h-[300px]">
        <div>
          <div className=" flex gap-2">
            <div className=" h-[20px] w-[3px] bg-[#036231]"></div>
            <p className=" font-semibold text-[14px] ">Funnel Insights</p>
          </div>
          <p className=" mt-5 text-[#000000] font-medium text-[12px] opacity-50 text-center">
            No Active Funnel
          </p>
          <div className=" h-[.8px] w-full bg-[#ECECEC] mt-6"></div>
          <p className=" text-[12px] text-[#036231]">Benefits of Funnels:</p>
          <ul className=" text-[12px] font-semibold list-disc flex flex-col px-4 py-2">
            <li>Dummy Text</li>
            <li>Dummy Text</li>
            <li>Dummy Text</li>
          </ul>
        </div>
        <button
          className=" w-full h-[35px] text-sm text-[#036231] rounded-lg border-solid border-[2px] border-[#036231] "
          onClick={() => setIsFunnelModelOpen(true)}
        >
          Create Funnel
        </button>
      </div>

      {isFunnelModelOpen && (
        <Modal
          open={isFunnelModelOpen}
          onClose={() => setIsFunnelModelOpen(false)}
          className="flex items-center justify-center"
        >
          <div className="w-[90%] md:w-[60%] lg:w-[40%] outline-none">
            {!isRequestSent ? (
              <>
                <div className="h-[2rem] bg-white text-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl relative">
                  <h1 className="text-[#000000] font-semibold text-[16px] md:text-[20px] mt-4">
                    Create a Funnel with TWP
                  </h1>

                  <button
                    onClick={onCloseHandler}
                    className="cursor-pointer absolute top-4 right-4 md:right-8 md:top-6"
                  >
                    <RxCross2 fontSize={25} color="#000000" />
                  </button>
                </div>
                <div className=" w-full min-h-[500px] bg-white rounded-b-2xl px-5 md:px-10 py-4">
                  <p className="text-gray-400 ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <form
                    className="flex flex-col items-center gap-6 mt-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="border-2 border-gray-300 rounded-lg p-3 outline-none"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="mobile">Mobile</label>
                      <input
                        type="text"
                        name="mobile"
                        placeholder="Enter Mobile"
                        className="border-2 border-gray-300 rounded-lg p-3 outline-none"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        className="border-2 border-gray-300 rounded-lg p-3 outline-none"
                        onChange={handleChange}
                      />
                    </div>
                    <button className="bg-[#036231] text-white rounded-lg p-3 mt-4 px-10">
                      Submit
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="w-full h-[560px] md:h-[500px] bg-white rounded-2xl flex flex-col items-center justify-center gap-4 p-6">
                <Image
                  src="/Chat-amico.png"
                  width={250}
                  height={200}
                  alt="success"
                />

                <h1 className="text-[#036231] text-2xl font-semibold text-center">
                  Our Team will be Contacting You Shortly
                </h1>
                <p className="text-gray-400 text-center ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <button
                  onClick={onCloseHandler}
                  className="border border-[#036231] text-[#036231] rounded-lg p-3 mt-4 px-10"
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default FunnelInsights;
