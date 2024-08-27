"use client";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const FailurePaymentPopup = ({
  isFailurePaymentModal,
  setIsFailurePaymentModal,
}) => {
  return (
    <Modal
      open={isFailurePaymentModal}
      onClose={() => setIsFailurePaymentModal(false)}
      className="flex justify-center items-center"
    >
      <div className="bg-cover bg-[url('/failPaymentM.png')] md:bg-[url('/fail-payment.png')] relative rounded-[10px] mt-[20px] md:mt-0 outline-none pt-[3rem] sm:pt-[5rem] pb-[12rem] sm:pb-[18rem] px-[1rem] sm:px-[8rem] w-[90%] sm:w-fit h-[90%] ">
        <div className="bg-[#FF5959] w-[2rem] aspect-square flex items-center justify-center absolute right-5 top-5 cursor-pointer rounded-full bg-opacity-60">
          <div className="bg-white w-[80%] aspect-square flex items-center justify-center rounded-full bg-transparent">
            <RxCross2
              onClick={() => setIsFailurePaymentModal(false)}
              className="text-[#FF5959]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center m-4 ">
          <div className="bg-[#FF5959] w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] flex justify-center items-center rounded-full">
            <RxCross2 className="text-[2rem] md:text-[3rem]" color="white" />
          </div>
          <p className="text-[#FF5959] text-[1.8rem] md:text-[2rem] lg:text-[4rem] ">
            Oops! Payment Failed
          </p>
          <p className="text-center text-[1.2rem] mt-12 md:mt-8">
            Your Payment is Unsuccessful. Please Try Again
          </p>
          <p className="text-center text-[1.2rem] mt-4">
            You can close this window now. Go back to the app
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default FailurePaymentPopup;
