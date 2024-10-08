import { useState } from "react";
import AddKitStep1 from "./step1";
import AddKitStep2 from "./step2";
import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";

const AddKitModal = ({ setData, isAddKitModalOpen, setIsAddKitModalOpen }) => {
  const [step, setStep] = useState(1);
  const [kitData, setKitData] = useState({
    name: "",
    description: "",
    productDetails: "",
    price: "",
  });

  const onCloseHandler = () => {
    setIsAddKitModalOpen(false);
  };

  const AddKitModalSteps = {
    1: AddKitStep1,
    2: AddKitStep2,
  };

  const StepComponent = AddKitModalSteps[step];

  return (
    <Modal
      open={isAddKitModalOpen}
      onClose={setIsAddKitModalOpen}
      className='flex items-center justify-center'
    >
      <div className='w-[30%] outline-none'>
        <div className='h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-end rounded-t-2xl'>
          <div className='text-white text-[1.3rem] flex items-center gap-[7rem]'>
            New Product
            <RxCross2 className='cursor-pointer' onClick={onCloseHandler} />
          </div>
        </div>
        <StepComponent
          setData={setData}
          kitData={kitData}
          setKitData={setKitData}
          isAddKitModalOpen={isAddKitModalOpen}
          setIsAddKitModalOpen={setIsAddKitModalOpen}
          setStep={setStep}
        />
      </div>
    </Modal>
  );
};

export default AddKitModal;
