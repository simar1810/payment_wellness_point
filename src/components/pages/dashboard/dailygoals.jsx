import React, { useEffect, useState } from "react";
import { Boxheader } from ".";
import { Modal } from "@mui/material";
import { CrossIcon } from "@/components/svgs";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";
import CustomProgressBar from "./CustomProgressBar";

export default function Dailygoals({ data, fetchData }) {
  const [goals, setGoals] = useState([]);
  const [openAddInput, setOpenAddInput] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const [openViewAllModal, setOpenViewAllModal] = useState(false);
  const [newGoalAdded, setNewGoalAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState({});

  useEffect(() => {
    if (data?.dailyGoals) {
      setGoals(data.dailyGoals);
      setIsChecked(
        data?.dailyGoals.reduce((acc, goal) => {
          acc[goal?._id] = goal.isCompleted;
          return acc;
        }, {})
      );
    }
  }, [data]);

  const handleAddGoal = async () => {
    if (!newGoal) return toast.error("Goal name is required");
    if (newGoal) {
      setLoading(true);
      try {
        const { data, status } = await apiInstance.addDailyGoal({
          person: "club-coach",
          goal: newGoal,
        });
        if (status === 200) {
          setNewGoal("");
          setOpenAddInput(false);
          setNewGoalAdded(true);

          toast.success(data.message);
          fetchData();
          setLoading(false);
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  const handleCheckboxChange = async (id, isChecked) => {
    setIsChecked((prev) => ({
      ...prev,
      [id]: isChecked,
    }));

    try {
      const { data, status } = await apiInstance.updateGoalCompletion({
        goalId: id,
        isCompleted: isChecked,
      });
      if (status === 200) {
        console.log(data.message);
        // toast.success(data.message);
      } else {
        // toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-[300px] max-h-[320px] daily-goals">
      <div className="px-2">
        <Boxheader
          data={goals}
          title={"Daily Goals"}
          setOpenViewAllModal={setOpenViewAllModal}
          newGoalAdded={newGoalAdded}
        />
      </div>

      <p className="text-[0.8rem] opacity-55 mt-[0.1rem] ml-2">{`(These goals are different from your app goals)`}</p>

      <div className="mt-4 flex flex-col justify-between items-center gap-2 min-h-[260px] mb-1">
        {goals.length === 0 ? (
          <div className="w-full h-[220px] flex items-center justify-center">
            <p>No goals available</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-4">
            {goals.slice(0, 3).map((goal, index) => (
              <Goals
                key={index}
                data={goal}
                index={index + 1}
                isChecked={isChecked[goal?._id]}
                onCheckboxChange={(isChecked) =>
                  handleCheckboxChange(goal._id, isChecked)
                }
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          {goals.length > 0 && (
            <div className="flex items-center gap-2 w-full">
              <CustomProgressBar
                value={Object.values(isChecked).filter(Boolean).length}
                max={goals.length}
              />
              <span>{`${Object.values(isChecked).filter(Boolean).length}/${goals.length
                }`}</span>
            </div>
          )}

          {openAddInput ? (
            <div className="flex items-center gap-2 mt-2 w-full -translate-y-4">
              <input
                placeholder="Goal Name"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md ml-5 focus:outline-none focus:border-gray-400"
              />
              <button
                className="bg-[#036231] text-white px-4 py-2 rounded-md"
                onClick={handleAddGoal}
              >
                {loading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px]">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Add"
                )}
              </button>
              <button
                className="text-gray-500 px-3 py-2 rounded-md cursor-pointer border-2 border-gray-300"
                onClick={() => setOpenAddInput(false)}
              >
                <CrossIcon w={25} h={25} c="#82867E" />
              </button>
            </div>
          ) : (
            <div className="text-center mt-2 flex justify-center gap-2 -translate-y-2">
              <button
                className="bg-[#036231] text-white px-4 py-2 rounded-md w-[45%] text-[12px]"
                onClick={() => setOpenAddInput(true)}
              >
                Add new goal
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal open={openViewAllModal} onClose={() => setOpenViewAllModal(false)}>
        <div className="w-[90%] md:w-1/2 mx-auto mt-20 p-4 bg-white rounded-md shadow-md overflow-y-auto max-h-[80vh]">
          <div className="flex justify-between items-center sticky top-[-18px] mb-2 bg-white h-[40px]">
            <h2>All Goals</h2>
            <button
              className="cursor-pointer"
              onClick={() => {
                setOpenViewAllModal(false);
                setNewGoalAdded(false);
              }}
            >
              <CrossIcon w={25} h={25} c="#036231" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {goals.map((goal, index) => (
              <Goals
                key={index}
                data={goal}
                index={index + 1}
                isChecked={isChecked[goal?._id]}
                onCheckboxChange={(isChecked) =>
                  handleCheckboxChange(goal._id, isChecked)
                }
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Goals({ data, index, isChecked, onCheckboxChange }) {
  return (
    <div className="w-full flex flex-col gap-2 items-center">
      {index > 2 && <div className="h-[.8px] w-full bg-[#ECECEC]"></div>}
      <div className="w-[95%] flex gap-3 items-center px-1 cursor-pointer">
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="flex items-center gap-2">
            <div className="h-[45px] w-[45px] bg-green-500 rounded-md flex items-center justify-center text-white font-semibold">
              {index}
            </div>
            <p className="text-sm text-black font-semibold">{data.goal}</p>
          </div>
          <div className="relative flex items-center rounded-full cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onCheckboxChange(e.target.checked)}
              className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500  border-gray-400"
            />
            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
