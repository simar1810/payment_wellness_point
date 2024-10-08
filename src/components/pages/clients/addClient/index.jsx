import { Modal } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineArrowBackIos } from "react-icons/md";
import AddClientStep1 from "./Step1";
import AddClientStep2 from "./Step2";
import AddClientStep3 from "./Step3";
import AddClientStep4 from "./Step4";
import AddClientStep5 from "./Step5";

const AddClientPopup = ({ isAddClientModalOpen, setIsAddClientModalOpen }) => {
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState({});

  const onCloseHandler = () => {
    setIsAddClientModalOpen(false);
    setClientData({});
    setStep(1);
  };

  const AddClientSteps = {
    1: AddClientStep1,
    2: AddClientStep2,
    3: AddClientStep3,
    4: AddClientStep4,
    5: AddClientStep5,
  };

  const StepComponent = AddClientSteps[step];

  return (
    <Modal
      open={isAddClientModalOpen}
      onClose={onCloseHandler}
      className="flex items-center justify-center"
    >
      <div className="w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] outline-none">
        <div className="h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl w-full text-white text-[1.3rem] relative">
          <div className="text-white text-[1.3rem] flex items-center ">
            {step > 1 && step < 5 && (
              <MdOutlineArrowBackIos
                className="cursor-pointer absolute left-6"
                onClick={() => {
                  setStep((prev) => prev - 1);
                }}
              />
            )}
            <h1 className="">Add Client </h1>
            <RxCross2
              className="absolute right-6 cursor-pointer"
              onClick={onCloseHandler}
            />
          </div>
        </div>

        <StepComponent
          setStep={setStep}
          setIsAddClientModalOpen={setIsAddClientModalOpen}
          clientData={clientData}
          setClientData={setClientData}
        />
      </div>
    </Modal>
  );
};

export default AddClientPopup;
