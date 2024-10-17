import { Modal } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import apiInstance from "@/helpers/api";

const AddPointsModal = ({
  isAddPointsModalOpen,
  setIsAddPointsModalOpen,
  fetchVolumePoints,
  clientId,
  fetchClientData,
}) => {
  const [pointsData, setPointsData] = useState({
    date: "",
    points: "",
    clientId,
  });
  const [loading, setLoading] = useState(false);

  const onCloseHandler = () => {
    setIsAddPointsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPointsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPointsSubmit = async (e) => {
    e.preventDefault();
    const keys = ["date", "points"];
    for (let key of keys) {
      if (!pointsData[key]) {
        toast.error(`${key} is required`);
        return;
      }
    }
    try {
      setLoading(true);
      const responseData = await apiInstance.addPoints(pointsData);
      if (responseData && responseData.status === 200) {
        toast.success("Points added successfully");
        setIsAddPointsModalOpen(false);
        fetchVolumePoints();
        fetchClientData();
      }
    } catch (error) {
      console.error("Add Points error => ", error);
      toast.error(error?.response?.data?.message || "Error adding points");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isAddPointsModalOpen}
      onClose={() => setIsAddPointsModalOpen(false)}
      className="flex items-center justify-center"
    >
      <div className="w-[90%] sm:w-[30%] outline-none">
        <div className="h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl ">
          <div className="text-white text-[1.3rem] flex justify-center items-center relative w-full ">
            Add Points
            <button
              className="cursor-pointer absolute right-0"
              onClick={onCloseHandler}
            >
              <RxCross2 />
            </button>
          </div>
        </div>
        <form
          className="p-4 px-5 bg-white rounded-b-2xl min-h-[500px] flex flex-col justify-between "
          onSubmit={handleAddPointsSubmit}
        >
          <div className="flex flex-col gap-4">
            <input
              type="date"
              placeholder="Date"
              name="date"
              value={pointsData.date}
              className="w-full border border-gray-300 rounded-md p-3 outline-none"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="No. of Points"
              name="points"
              value={pointsData.points}
              className="w-full border border-gray-300 rounded-md p-3 outline-none"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-[#036231] text-white px-4 py-3 rounded-md"
            type="submit"
          >
            {loading ? (
              <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
              </div>
            ) : (
              "Add Points"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddPointsModal;
