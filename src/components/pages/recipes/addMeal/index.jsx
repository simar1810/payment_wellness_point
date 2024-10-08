import { Modal } from "@mui/material";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Step1 from "./AddMealStep1";
import Step2 from "./AddMealStep2";
import Step3 from "./AddMealStep3";
import AddNewRecipe from "./AddMealStep4";
import Step5 from "./AddMealStep5";

function AddMealPopup({
  data,
  setData,
  isAddMealModalOpen,
  setIsAddMealModalOpen,
  setIsAddMealKitModalOpen,
  addMealKit,
}) {
  const [step, setStep] = useState(1);
  const [mealsData, setMealsData] = useState([
    {
      mealType: "",
      meals: [
        {
          mealTiming: "",
          instructions: "",
        },
      ],
    },
  ]);
  const [editingIndex, setEditingIndex] = useState(0);

  const onCloseHandler = () => {
    setIsAddMealModalOpen(false);
    setMealsData([]);
    setData((prev) => prev.slice(0, -1));
    setStep(1);
  };

  const AddMealSteps = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: AddNewRecipe,
    5: Step5,
  };

  const StepComponent = AddMealSteps[step];

  const showBackArrow = () => {
    if (step === 1) {
      return (
        <button
          className="cursor-pointer absolute left-0"
          onClick={() => {
            setIsAddMealKitModalOpen(true);
            setIsAddMealModalOpen(false);
          }}
        >
          <MdOutlineArrowBackIos />
        </button>
      );
    } else if (step > 1 && step < 3) {
      return (
        <button
          className="cursor-pointer absolute left-0"
          onClick={() => setStep((prev) => prev - 1)}
        >
          <MdOutlineArrowBackIos />
        </button>
      );
    } else if (step === 4) {
      return (
        <button
          className="cursor-pointer absolute left-0"
          onClick={() => setStep(2)}
        >
          <MdOutlineArrowBackIos />
        </button>
      );
    }
  };

  return (
    <Modal
      open={isAddMealModalOpen}
      className="flex items-center justify-center"
    >
      <div className="w-[90%] md:w-[50%] lg:w-[30%] outline-none ">
        <div className="h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl">
          <div className="text-white text-[1.3rem] flex justify-center items-center relative w-full">
            {showBackArrow()}
            Create Meal
            <button
              className="cursor-pointer absolute right-0"
              onClick={onCloseHandler}
            >
              <RxCross2 />
            </button>
          </div>
        </div>

        <div className="max-h-[550px] overflow-scroll scrollbar-hide bg-white rounded-b-2xl py-2">
          <StepComponent
            mealsData={mealsData}
            setMealsData={setMealsData}
            setStep={setStep}
            setIsAddMealModalOpen={setIsAddMealModalOpen}
            setIsAddMealKitModalOpen={setIsAddMealModalOpen}
            data={data}
            setData={setData}
            addMealKit={addMealKit}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddMealPopup;
