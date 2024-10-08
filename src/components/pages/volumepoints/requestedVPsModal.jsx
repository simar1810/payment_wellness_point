import { NoDataPage } from "@/components/core";
import { TextInput } from "@/components/core/inputs";
import Loader from "@/components/loader/Loader";
import apiInstance from "@/helpers/api";
import { Box, Modal } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

export default function RequestedVPsModal({
  requestedVPsModal,
  setRequestedVPsModal,
}) {
  const [vpRequests, setVpRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [review, setReview] = useState({});
  //   console.log("review => ", review);
  const [values, setValues] = useState({
    date: review?.date ?? "",
    points: review?.points ?? "",
  });
  const { date, points } = values;

  const fetchReqVpByClients = async () => {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.getReqVpByClients();
      if (status === 200) {
        setVpRequests(data?.data || []);
        //   console.log("get ReqVp ByClients api response => ", data)
      }
    } catch (err) {
      console.error("get ReqVp By Clients api error => ", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReqVpByClients()
  }, []);

  const modalStyle = useMemo(() => {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 2,
    };
  }, []);

  if (loading) {
    return (
      <div className="p-5 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(action) {
    if (date === "") {
      toast.error("Please enter Date");
      return;
    } else if (points === "") {
      toast.error("Please enter Points");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        vpId: review._id,
        status: action ? 1 : 0,
        date,
        points,
      };
      const { status } = await apiInstance.acceptRejectVpPost(payload);

      if (status === 200) {
        fetchReqVpByClients()
        toast.success(
          `Request ${action ? "Approved" : "Rejected"} Successfully`
        );
        setValues({
          date: "",
          points: "",
        });
        setReviewModal(false)
      }
    } catch (error) {
      console.error("err in acceptRejectVpPost api => ", error);
      toast.error(
        error?.response?.data?.message || "Error while processing request!"
      );
    }
    setLoading(false);
  }

  return (
    <>
      <Modal
        open={requestedVPsModal}
        onClose={() => setRequestedVPsModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="w-full"
      >
        <Box
          sx={modalStyle}
          className="max-w-[95%] sm:max-w-[80%] max-h-[600px] overflow-y-scroll scrollbar-hide"
        >
          <div className="flex gap-2 items-center justify-between sticky top-0 bg-white px-6 pt-6 mb-2">
            <div
              id="modal-title"
              className="font-bold text-3xl text-[#036231] text-center"
            >
              <p>Volume Points Requests</p>
              <button
                className="absolute top-7 right-4 cursor-pointer"
                onClick={() => setRequestedVPsModal(false)}
              >
                <RxCross2 fontSize={30} />
              </button>
            </div>
          </div>
          <div id="modal-description" className="p-4 px-6">
            {!vpRequests || vpRequests.length === 0 ? (
              <NoDataPage message={"No Request Yet!"} />
            ) : (
              vpRequests.map((vp, idx) => (
                <div key={idx} className="p-2 w-full h-fit">
                  <div className="flex items-start gap-3">
                    <div className="w-[20%] sm:w-[10%]">
                      <Image
                        src={
                          vp?.clientId?.profilePhoto &&
                            vp?.clientId?.profilePhoto.length > 0
                            ? vp?.clientId?.profilePhoto
                            : "/default-user-dp.svg"
                        }
                        alt="clientPhoto"
                        width={100}
                        height={0}
                        unoptimized
                        className="object-cover aspect-square rounded-[50%]"
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <div className="w-full">
                        <span className="mr-1 font-bold">
                          {vp?.clientId?.name ?? ""}
                        </span>
                        <span>requested to Update Volume Points</span>
                      </div>

                      <div className="w-full flex gap-4 sm:gap-6">
                        <div className="w-fit">
                          <span className="mr-1 font-bold">Roll No:</span>
                          <span>{vp?.clientId?.rollno ?? ""}</span>
                        </div>

                        <div className="w-fit">
                          <span className="mr-1 font-bold">Points:</span>
                          <span>{vp?.points ?? ""}</span>
                        </div>

                        <div className="hidden sm:block w-fit">
                          <span className="mr-1 font-bold">Date</span>
                          <span>{vp?.date ?? ""}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setReviewModal(true);
                          setReview(vp);
                          setValues({
                            date: vp?.date ?? "",
                            points: vp?.points ?? "",
                          });
                        }}
                        className="max-w-[50%] px-4 py-1 h-[35px] cursor-pointer text-[#036231] border-2 border-[#036231] text-[14px] font-semibold bg-white flex items-center justify-center gap-2 rounded-md"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#036231] my-4"></div>
                </div>
              ))
            )}
          </div>
        </Box>
      </Modal>

      {reviewModal && (
        <Modal open={reviewModal} onClose={() => setReviewModal(false)}>
          <Box
            sx={modalStyle}
            className="max-w-[95%] sm:max-w-[80%] max-h-[90vh] overflow-y-scroll scrollbar-hide"
          >
            <div className="flex gap-2 items-center justify-between sticky top-0 bg-white px-6 pt-6 mb-2">
              <div
                id="modal-title"
                className="font-bold text-3xl text-[#036231] text-center"
              >
                <p>Update Volume Points</p>
                <button
                  className="absolute top-7 right-4 cursor-pointer"
                  onClick={() => setReviewModal(false)}
                >
                  <RxCross2 fontSize={30} />
                </button>
              </div>
            </div>

            <form
              className="bg-white p-4 px-6 rounded-b-2xl max-h-[90vh] flex flex-col justify-start gap-4"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col items-start gap-2">
                <p className="font-bold">Roll No:</p>
                <div className="w-full border-2 border-gray-300 rounded-md p-3 outline-none">
                  {review?.clientId?.rollno ?? ""}
                </div>
              </div>

              <div className="w-full flex flex-col items-start gap-2">
                <p className="font-bold">Date</p>
                <input
                  type="date"
                  name={"date"}
                  placeholder={"Enter date"}
                  className="w-full border-2 border-gray-300 rounded-md p-3 outline-none"
                  onChange={(e) => handleChange(e)}
                  value={date}
                />
              </div>

              <div className="w-full flex flex-col items-start gap-2">
                <p className="font-bold">Points</p>
                <input
                  type="text"
                  name={"points"}
                  placeholder={"Enter points"}
                  className="w-full border-2 border-gray-300 rounded-md p-3 outline-none"
                  onChange={(e) => handleChange(e)}
                  value={points}
                />
              </div>

              <div className="w-full flex flex-col items-start gap-2">
                <p className="font-bold">Attached Screenshot</p>
                <div className="max-w-full">
                  <Image
                    src={
                      review?.screenShot && review?.screenShot.length > 0
                        ? review?.screenShot
                        : ""
                    }
                    alt="screenShot"
                    width={400}
                    height={0}
                    unoptimized
                    className="object-contain aspect-video"
                  />
                </div>
              </div>

              <div className="w-full flex gap-4 mb-[2rem] sm:mb-0">
                <button
                  type="submit"
                  className="bg-[#EA4335] w-full text-white py-2 rounded-md mt-4 flex justify-center"
                  onClick={() => handleSubmit(false)}
                >
                  Reject
                </button>
                <button
                  type="submit"
                  className="bg-[#036231] w-full text-white py-2 rounded-md mt-4 flex justify-center"
                  onClick={() => handleSubmit(true)}
                >
                  Approve
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      )}
    </>
  );
}
