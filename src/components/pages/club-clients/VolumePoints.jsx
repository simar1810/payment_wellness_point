import React, { useEffect, useState } from "react";
import apiInstance from "@/helpers/api";
import AddPointsModal from "./AddPointsModal";
import { RiErrorWarningFill } from "react-icons/ri";
import Link from "next/link";
import { DeleteIcon, EyeIcon } from "@/components/svgs";
import { setOrderDetails } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";
import { Modal } from "@mui/material";

const VolumePoints = ({ clubSystem, clientId, fetchClientData }) => {
  const [loading, setLoading] = useState(false);
  const [volumePoints, setVolumePoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [monthlyHistory, setMonthlyHistory] = useState([]);
  const [pointsEarnedTillNow, setPointsEarnedTillNow] = useState(0);
  const [pointsRemaining, setPointsRemaining] = useState(0);
  const [isAddPointsModalOpen, setIsAddPointsModalOpen] = useState(false);
  const [vpDetails, setVpDetails] = useState({});
  const [warningModal, setWarningModal] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchVolumePoints = async () => {
    setLoading(true);
    try {
      const response = await apiInstance.getVolumePoints(clientId);
      const { data, status } = response;
      // console.log('response data of getVolumePoints => ', data)

      if (status === 200 && data.success) {
        setVpDetails(data.data);

        const activePoints = parseFloat(data.data.activePoints);
        setVolumePoints(activePoints);

        const totalPoints = parseFloat(data.data.totalPoints);
        setPointsEarnedTillNow(totalPoints);

        const remaining = activePoints ? activePoints : 0;
        setPointsRemaining(remaining < 0 ? 0 : remaining);

        const history = data.data.pointsHistory.map((entry, index) => ({
          orderId: entry.orderId ? entry.orderId : "",
          date: entry.date.split("T")[0] || entry.date,
          orderValue: entry.price ? parseFloat(entry.price) : "",
          pointsEarned: parseFloat(entry.points),
          productModule: entry.productModule || [],
        }));
        setPointsHistory(history);

        setMonthlyHistory(data.data?.monthlyHistory || []);
      }
    } catch (error) {
      console.error("getVolumePoints error = ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVolumePoints();
  }, [clientId]);

  if (loading) {
    return (
      <div className="p-5 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleOrderDetails = (index) => {
    dispatch(setOrderDetails(pointsHistory[index]));
    router.push(
      `/club-clients/${clientId}/orders/${pointsHistory[index].orderId}`
    );
  };

  const handleOrderDelete = (index) => {
    setIndexToDelete(index);
    setWarningModal(true);
  };

  const handleConfirmDelete = async () => {
    setBtnLoading(true);
    try {
      const { data, status } = await apiInstance.deleteVolumePoints(
        vpDetails._id,
        indexToDelete
      );
      // console.log("data in deleting order => ", data);
      if (status === 200) {
        toast.success("Volume Points Deleted Successfully");
        fetchVolumePoints();
        fetchClientData();
      }
    } catch (error) {
      console.error("error in deleting  => ", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete volume points"
      );
    } finally {
      setWarningModal(false);
      setBtnLoading(false);
    }
  };

  return (
    <div className="px-2 bg-white">
      <div className="flex flex-col">
        <div className="flex flex-col w-full sm:w-[45%]">
          <h1 className="text-2xl font-semibold mb-6">Volume Points</h1>

          <div className="flex justify-between items-start h-full gap-6 mb-10">
            <div className="flex-1 w-[40%] mt-10">
              <div className="flex items-center justify-between mb-2">
                {volumePoints < 10 && (
                  <span className="text-red-500 text-[12px] font-semibold flex gap-1 items-center">
                    <RiErrorWarningFill fontSize={18} color="#FF0000" />
                    Critically Low
                  </span>
                )}
                {volumePoints >= 10 && volumePoints <= 20 ? (
                  <span className="text-red-500 text-[12px] font-semibold flex gap-1 items-center">
                    <RiErrorWarningFill fontSize={18} color="#FF0000" />
                    Low
                  </span>
                ) : (
                  <span></span>
                )}
                <span
                  className={`text-[12px] ${volumePoints < 20 ? "text-red-500" : "text-[#036231]"
                    } font-semibold`}
                >
                  {pointsRemaining.toFixed(2)} Points Remaining
                </span>
              </div>

              <div className="relative h-2 bg-gray-300 rounded-full">
                <div
                  className={`absolute top-0 h-full bg-[#036231] rounded-full`}
                  style={{
                    width: `${Math.min((pointsRemaining / 100) * 100, 100)}%`,
                  }}
                ></div>

                <div className="flex justify-between absolute w-full top-4">
                  <span className="text-xs text-gray-500">0 Points</span>
                  <span className="text-xs text-gray-500">100 Points</span>
                </div>
              </div>

              <div className="flex mt-14 space-x-4">
                <Link
                  href={{
                    pathname: "/club-clients/buy-products",
                    query: { clientId },
                  }}
                  className="flex-1 flex justify-center items-center p-2 font-semibold text-[#036231] border-2 border-[#036231] rounded-xl"
                >
                  <button className="flex justify-center items-center">
                    + Add Products
                  </button>
                </Link>
                <button
                  className="flex-1 font-semibold text-[#036231] border-2 border-[#036231] rounded-xl max-w-[127px]"
                  onClick={() => setIsAddPointsModalOpen(true)}
                >
                  + Add Points
                </button>
              </div>

              <p className="text-[12px] text-gray-500 mt-2">
                *Buying Products will earn Value Points. Earn up to 100 Points
                Each Time
              </p>
            </div>

            <div className="text-center w-[40%] flex flex-col justify-between items-center">
              <div className="relative inline-flex flex-col items-center justify-center w-[90px] h-[90px] pt-2 shadow-xl outline outline-[#036231] outline-[20px] outline-offset-[15px] rounded-full">
                <span className="text-2xl font-semibold text-[#505B68]">
                  {pointsEarnedTillNow.toFixed(2) === "NaN"
                    ? 0
                    : pointsEarnedTillNow.toFixed(2)}
                </span>

                <span className="text-[12px] text-[#505B68]">Points</span>
              </div>

              <p className="mt-12 text-sm font-semibold text-[#]">
                Points Earned Till Now
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-8 sm:flex-row">
          <div className="w-full sm:w-[53%] border rounded-xl max-h-[350px] overflow-y-scroll scrollbar-hide">
            <h3 className="text-lg font-semibold border-b p-4">
              Points History
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full h-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {/* <th className='px-4 py-2 text-center'>Sr. No.</th> */}
                    <th className="px-2 py-2 text-center">Order ID</th>
                    <th className="px-2 py-2 text-center">Date</th>
                    <th className="px-2 py-2 text-center">Order Value</th>
                    <th className="px-2 py-2 text-center">Points Earned</th>
                    <th className="px-2 py-2 text-center">Details</th>
                    <th className="py-2 text-center"></th>
                  </tr>
                </thead>

                {pointsHistory.length === 0 ? (
                  <tbody>
                    <tr className="mt-24">
                      <td colSpan="5" className="text-center pt-20 ">
                        No Points History Found
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {pointsHistory.map((entry, index) => (
                      <tr key={entry.orderId} className="text-sm">
                        {/* <td className='px-4 py-2 text-center '>{index + 1}</td> */}
                        <td className="px-4 py-2 text-center ">
                          {entry?.orderId ? entry.orderId : "-"}
                        </td>
                        <td className="px-4 py-2 text-center ">{entry.date}</td>
                        <td className="px-4 py-2 text-center ">
                          {entry?.orderValue
                            ? entry.orderValue.toFixed(2)
                            : "-"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {entry.pointsEarned.toFixed(2)}
                        </td>

                        <td className="px-4 py-2 text-center">
                          {entry?.orderId ? (
                            <button onClick={() => handleOrderDetails(index)}>
                              <EyeIcon c="#000" w={20} h={20} />
                            </button>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleOrderDelete(index)}
                            className="cursor-pointer"
                          >
                            <DeleteIcon c="red" w={20} h={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>

          <div className="w-full sm:w-[23%] border rounded-xl max-h-[350px] overflow-y-scroll scrollbar-hide">
            <h3 className="text-lg font-semibold border-b p-4">
              Monthly Points History
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full h-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-2 py-2 text-center">Month</th>
                    <th className="px-2 py-2 text-center">Points Earned</th>
                    <th className="py-2 text-center"></th>
                  </tr>
                </thead>

                {monthlyHistory.length === 0 ? (
                  <tbody>
                    <tr className="mt-24">
                      <td colSpan="5" className="text-center pt-20 ">
                        No Points History Found
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {monthlyHistory.map((entry, index) => (
                      <tr key={index} className="text-sm">
                        <td className="px-4 py-2 text-center ">{entry.month}</td>
                        <td className="px-4 py-2 text-center">
                          {entry.points.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddPointsModal
        isAddPointsModalOpen={isAddPointsModalOpen}
        setIsAddPointsModalOpen={setIsAddPointsModalOpen}
        fetchVolumePoints={fetchVolumePoints}
        clientId={clientId}
        fetchClientData={fetchClientData}
      />

      <Modal open={warningModal} className="flex justify-center items-center">
        <div className="bg-[#036231] flex flex-col items-center gap-2 p-5 rounded-lg w-[90%] sm:w-[30%]">
          <div className="flex flex-col items-center gap-2">
            <IoWarning size={30} color={"#fff"} />
            <h1 className="text-lg font-semibold text-white">Are you sure?</h1>
            <p className="text-white text-center">
              The history will be permanently deleted.
            </p>
            <div className="flex items-center gap-5 mt-2">
              <button
                onClick={() => setWarningModal(false)}
                className="border-2 border-white text-white p-2 px-6 rounded-lg font-semibold min-w-[110px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-white text-[#036231] p-2 px-6 rounded-lg font-semibold min-w-[110px]"
              >
                {btnLoading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VolumePoints;
