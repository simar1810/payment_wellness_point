import React, { useState } from "react";
import { Modal } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { CiTrophy } from "react-icons/ci";
import { IoTrophyOutline } from "react-icons/io5";
import { UploadImage } from "@/components/core/inputs";
import { FaTrophy } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";
import apiInstance from "@/helpers/api";
import Cookies from "js-cookie";
import { compressFile } from "@/helpers/utils";

const ReviewsAndAwards = ({ reviews, awards, fetchUserProfile }) => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [open, setOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [newAward, setNewAward] = useState({});
  const [loading, setLoading] = useState(false);
  const coachId = Cookies.get("coachId");
  console.log("awards => ", awards);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewAward({});
  };

  const handleAwardChange = (e) => {
    if (e.target.name === "image") {
      setNewAward({
        ...newAward,
        [e.target.name]: {
          preview: URL.createObjectURL(e.target.files[0]),
          file: e.target.files[0],
        },
      });
      return;
    } else {
      setNewAward({ ...newAward, [e.target.name]: e.target.value });
    }
  };

  const handleReviewRequest = async () => {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.requestReview();
      if (status === 200) {
        toast.success(data.message ?? "Review request sent successfully");
        fetchUserProfile();
      } else if (status === 201) {
        toast.error(data.msg ?? "Review request already sent");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured, please try again");
    }
  };

  const handleAwardSubmit = async (e) => {
    e.preventDefault();
    const keys = ["title"];
    for (const key of keys) {
      if (!newAward[key] || newAward[key] === "") {
        toast.error(`${key} is required`);
        return;
      }
    }
    try {
      const compressedFile = await compressFile(newAward.image?.file);
      const formData = new FormData();
      formData.append("awardTitle", newAward.title);
      formData.append("file", compressedFile ?? null);
      formData.append("coachId", coachId);
      setLoading(true);
      const { data, status } = await apiInstance.updateCoachProfile(formData);
      console.log(data);
      if (status === 200) {
        toast.success("Award added successfully");
        fetchUserProfile();
        handleClose();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured, please try again");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 -mb-px ${activeTab === "reviews"
              ? "text-[#036231] font-semibold border-b-[#036231]"
              : "text-gray-600 border-transparent"
            } border-b-2 font-medium text-lg`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
        <button
          className={`px-4 py-2 -mb-px ${activeTab === "awards"
              ? "text-[#036231] font-semibold border-b-[#036231]"
              : "text-gray-600 border-transparent"
            } border-b-2 font-medium text-lg`}
          onClick={() => setActiveTab("awards")}
        >
          Awards
        </button>
        {activeTab === "awards" && (
          <div className="text-gray-600 ml-auto ">
            <button
              className="border-2 border-[#036231] text-[#036231] p-1 px-3  rounded-xl flex items-center gap-1 md:hidden"
              onClick={() => {
                handleOpen();
                setEditField("New Awards");
              }}
            >
              +
            </button>
            <button
              className="bg-[#036231] text-white px-4 py-2 rounded-xl items-center gap-1 hidden md:flex"
              onClick={() => {
                handleOpen();
                setEditField("New Awards");
              }}
            >
              <IoTrophyOutline fontSize={20} />
              Add Awards
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        {activeTab === "reviews" && (
          <div className="text-gray-600">
            <div className="min-h-96 flex justify-center items-center">
              <button
                className="text-[#036231] px-4 py-2 rounded-xl border border-[#036231] min-w-[145px]"
                onClick={() => {
                  // handleOpen();
                  setEditField("Review");
                  handleReviewRequest();
                }}
              >
                {loading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Request Review"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        {activeTab === "awards" && (
          <div className="text-gray-600">
            {awards?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    {award?.image ? (
                      <Image
                        src={award.image}
                        width={75}
                        height={55}
                        alt="award"
                        className="h-20 w-20 rounded-full p-1"
                      />
                    ) : (
                      <Image
                        src="/trophy.png"
                        width={75}
                        height={75}
                        alt="award"
                        className="border border-[#036231] rounded-full p-1"
                      />
                    )}
                    <p className="text-[18px]">{award.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-h-96 flex flex-col justify-center items-center">
                <div className="bg-[#90C8444D] rounded-full flex items-center justify-center h-16 w-16">
                  <FaTrophy fontSize={30} color="#036231" />
                </div>
                <p className="mt-2">No Awards</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal open={open} className="flex items-center justify-center">
        <div className="w-[30%] outline-none">
          <div className="h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl">
            <div className="text-white text-[1.2rem] flex justify-center items-center relative w-full">
              {editField}
              <button
                className="cursor-pointer absolute right-0"
                onClick={handleClose}
              >
                <RxCross2 />
              </button>
            </div>
          </div>
          {editField === "New Awards" ? (
            <form
              className="bg-white min-h-[400px] flex flex-col justify-between rounded-b-2xl p-4"
              onSubmit={handleAwardSubmit}
            >
              <div className="flex flex-col gap-2">
                {newAward.image ? (
                  <Image
                    src={newAward.image.preview}
                    alt="award"
                    width={40}
                    height={40}
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                ) : (
                  <UploadImage name="image" handleChange={handleAwardChange} />
                )}
                <textarea
                  className="border-2 border-gray-300 p-2 mt-2 w-full min-h-[100px] rounded-md outline-none"
                  placeholder="Title"
                  name="title"
                  onChange={handleAwardChange}
                />
              </div>
              <button
                className="bg-[#036231] w-full text-white px-4 py-2 rounded-md"
                type="submit"
              >
                {loading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Add Award"
                )}
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ReviewsAndAwards;
