import { TimePickerComponent } from "@/components/core";
import { TimePicker } from "@/components/core/inputs";
import { addMeal } from "@/redux/slices/mealKitSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";

const Step1 = ({
  mealsData,
  setMealsData,
  setStep,
  setEditingIndex,
  addMealKit,
}) => {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleTime(time) {
    const hour = time.$H <= 9 ? `0${time.$H}` : `${time.$H}`;
    const minute = time.$m <= 9 ? `0${time.$m}` : `${time.$m}`;
    const newTime = `${hour}:${minute}`;
    return newTime;
  }

  const handleChange = (e, groupIndex, mealIndex) => {
    const { name, value } = e.target;
    const newMealsData = [...mealsData];
    if (name === "mealType") {
      newMealsData[groupIndex].mealType = value;
    } else {
      newMealsData[groupIndex].meals[mealIndex][name] = value;
    }
    setMealsData(newMealsData);
  };

  const handleSetTime = (newTime, groupIndex, mealIndex) => {
    const formattedTime = handleTime(newTime);
    console.log("Formatted Time => ", formattedTime);

    setMealsData((prevMealsData) => {
      const newMealsData = [...prevMealsData];
      newMealsData[groupIndex].meals[mealIndex].mealTiming = formattedTime;
      return newMealsData;
    });
  };

  const handleMealsSubmit = (e) => {
    e.preventDefault();
    const keys = ["mealTiming"];
    for (const group of mealsData) {
      if (!group.mealType) {
        toast.error(`mealType is required`);
        return;
      }
      for (const meal of group.meals) {
        for (const key of keys) {
          if (!meal[key]) {
            toast.error(`${key} is required`);
            return;
          }
        }
      }
    }

    dispatch(addMeal(mealsData));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      addMealKit(setStep, 3);
    }
  }, [isSubmitted, addMealKit, setStep]);

  const addNewMealUnderSameType = (groupIndex) => {
    setMealsData((prev) => {
      const newMealsData = [...prev];
      newMealsData[groupIndex] = {
        ...newMealsData[groupIndex],
        meals: [
          ...newMealsData[groupIndex].meals,
          {
            mealTiming: "",
            instructions: "",
          },
        ],
      };
      return newMealsData;
    });
  };

  const addNewMealType = () => {
    setMealsData((prev) => [
      ...prev,
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
  };

  console.log("MealsData => ", mealsData);

  return (
    <form className="relative" onSubmit={handleMealsSubmit}>
      {mealsData.map((group, groupIndex) => (
        <div key={groupIndex} className="px-5 flex flex-col gap-4 py-3">
          {group.meals.map((meal, mealIndex) => (
            <div key={mealIndex} className="flex flex-col gap-4">
              {mealIndex === 0 && (
                <input
                  className="w-full bg-white outline-none border-2 border-gray-300 rounded-lg p-2 py-4"
                  name="mealType"
                  placeholder="Meal Type"
                  onChange={(e) => handleChange(e, groupIndex, mealIndex)}
                  value={group.mealType || ""}
                />
              )}
              <div className="relative">
                {(groupIndex > 0 || mealIndex > 0) && (
                  <button
                    type="button"
                    className="cursor-pointer absolute right-4 top-6 rounded-md bg-gray-400 p-1"
                    onClick={() => {
                      console.log(
                        "GroupIndex, MealIndex ==> ",
                        groupIndex,
                        mealIndex
                      );
                      if (groupIndex > 0 && mealIndex === 0) {
                        setMealsData((prev) => {
                          const newMealsData = [...prev];
                          newMealsData.splice(groupIndex, 1);
                          return newMealsData;
                        });
                      } else {
                        setMealsData((prev) => {
                          const newMealsData = [...prev];
                          newMealsData[groupIndex].meals.splice(mealIndex, 1);
                          return newMealsData;
                        });
                      }
                    }}
                  >
                    <RxCross2 fontSize={25} color="#000" />
                  </button>
                )}
                {meal.image ? (
                  <div className="flex flex-col gap-3 items-center rounded-lg p-2 py-4">
                    <Image
                      src={meal?.image || ""}
                      width={100}
                      height={100}
                      className="h-56 w-full"
                      alt="Meal Image"
                    />
                    <p className="self-start">{meal?.name || ""}</p>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer min-h-[150px] border-2 border-gray-300 rounded-md w-full"
                    onClick={() => {
                      setEditingIndex({
                        groupIndex,
                        mealIndex,
                      });
                      setStep(2);
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <Image
                        src="/uploadImgIcon.svg"
                        width={40}
                        height={40}
                        className="mb-2"
                        alt="Upload Image Icon"
                      />
                      <p className="text-gray-400">Add Your Meal</p>
                    </div>
                  </div>
                )}
              </div>

              <TimePickerComponent
                value={meal?.mealTiming || ""}
                setTime={(newTime) =>
                  handleSetTime(newTime, groupIndex, mealIndex)
                }
                className=" w-full"
              />
              {/*  <TimePicker
                name='mealTiming'
                value={meal?.mealTiming || ""}
                onChange={(e) => handleChange(e, groupIndex, mealIndex)}
              /> */}
              <textarea
                className="w-full bg-white outline-none border-2 border-gray-300 rounded-lg p-2 py-4"
                placeholder="Instructions"
                name="instructions"
                value={meal?.instructions || ""}
                onChange={(e) => handleChange(e, groupIndex, mealIndex)}
              ></textarea>

              {(groupIndex !== mealsData.length - 1 ||
                mealIndex !== group.meals.length - 1) && (
                  <hr className="border border-gray-300 mt-2 " />
                )}
            </div>
          ))}
          {groupIndex === mealsData.length - 1 && (
            <div className="flex justify-center w-full">
              <button
                type="button"
                className="bg-[#036231] text-white flex justify-center items-center rounded-full p-2 h-11 w-11 text-3xl mt-2"
                onClick={() => addNewMealUnderSameType(groupIndex)}
              >
                +
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-around items-center min-h-fit bg-white sticky bottom-0 p-1 pb-3">
        <button
          type="button"
          className="border-2 border-[#036231] text-[#036231] rounded-full py-3 md:px-10 mt-2 text-[16px] w-[45%]"
          onClick={addNewMealType}
        >
          Add Type
        </button>
        <button
          className="bg-[#036231] text-white rounded-full py-3 md:px-10 mt-2 text-[16px] w-[45%]"
          type="submit"
        >
          Create Plan
        </button>
      </div>
    </form>
  );
};

export default Step1;
