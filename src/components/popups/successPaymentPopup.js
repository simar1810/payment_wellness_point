import React from "react";
import Modal from "@mui/material/Modal";
import { RxCross2 } from "react-icons/rx";

const SuccessPaymentPopup = ({
  isSuccessPaymentModal,
  setIsSuccessPaymentModal,
}) => {
  return (
    <Modal
      open={isSuccessPaymentModal}
      onClose={() => setIsSuccessPaymentModal(false)}
      className="flex justify-center items-center"
    >
      <div className="bg-cover bg-[url('/images/popup-bg-2.svg')] relative rounded-[10px] outline-none flex justify-center items-center pt-[3rem] sm:pt-[5rem] pb-[12rem] sm:pb-[18rem] px-[1rem] sm:px-[8rem] w-[90%] sm:w-fit">

        <div className="border-[3px] border-[#E97A4A] border-opacity-60 w-[2rem] aspect-square flex items-center justify-center rounded-full bg-transparent absolute right-5 top-5 cursor-pointer">
          <RxCross2
            onClick={() => setIsSuccessPaymentModal(false)}
            className="text-[#E97A4A] text-[1.2rem]"
          />
        </div>

        <div>
          <p className="text-[#E97A4A] text-[3rem] sm:text-[4rem]">
            Thank You !
          </p>
          <p className="sm:text-[1.2rem] ml-[7px]">
            Your Payment is Successful.
          </p>
          <p className="sm:text-[1.2rem] ml-[7px]">
            You can go back to the app now, the subscription will be active.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessPaymentPopup;
