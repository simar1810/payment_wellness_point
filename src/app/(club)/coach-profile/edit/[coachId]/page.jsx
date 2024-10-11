"use client";

import { Backicon, CameraIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = ({ params }) => {
  const router = useRouter();
  const { user, clubSystem } = useSelector((state) => state.user);
  const coachId = params?.coachId || "";
  const [loading, setLoading] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    city: user?.city || "",
    joiningDate: user?.joiningDate || "",
    monthlyVpDeduction: user?.monthlyVpDeduction || 100,
    profilePhoto: {
      data: user?.profilePhoto || "",
      preview: user?.profilePhoto || "",
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setProfileDetails((prev) => ({
        ...prev,
        profilePhoto: {
          data: file,
          preview: URL.createObjectURL(file),
        },
      }));
    } else {
      setProfileDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleUpdateDetails = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", profileDetails.name);
      formData.append("email", profileDetails.email);
      formData.append("mobileNumber", profileDetails.mobileNumber);
      formData.append("city", profileDetails.city);
      formData.append("joiningDate", profileDetails.joiningDate.split("-").reverse().join("-"));
      formData.append("monthlyVpDeduction", profileDetails.monthlyVpDeduction);
      if (profileDetails.profilePhoto.data !== user?.profilePhoto) {
        formData.append("file", profileDetails.profilePhoto.data);
      }
      const { data, status } = await apiInstance.updateProfileDetails(
        formData,
        coachId
      );
      // console.log(data, status);
      if (status === 200) {
        toast.success("Profile details updated successfully");
        router.push(`/coach-profile/${coachId}`);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Error updating profile details"
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-scroll px-10 py-10 scrollbar-hide">
      <div className="bg-white rounded-2xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] pt-8 p-6 min-h-[600px] pb-8">
        <button
          className="bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md"
          onClick={() => router.back()}
        >
          <Backicon h={15} w={15} c={"white"} />
          Back
        </button>

        <div className="mt-6 flex flex-col gap-4">
          <div className="w-full pb-4 flex flex-col gap-3 relative ">
            <h1 className="text-2xl font-bold">Profile Details</h1>
            <div className="h-[100px] w-[100px] relative border-[2px] border-solid rounded-full flex items-center justify-center mt-5">
              <Image
                src={
                  profileDetails.profilePhoto.preview !== ""
                    ? profileDetails.profilePhoto.preview
                    : profileDetails.profilePhoto.data !== ""
                      ? profileDetails.profilePhoto.data
                      : "/default-user-dp.svg"
                }
                alt="Profile"
                height={100}
                width={100}
                className="rounded-full h-full w-full -mt-[1px] object-cover"
              />
              <label htmlFor="image">
                <div className="h-[40px] w-[40px] rounded-full bg-[#036231] absolute -right-2 bottom-0 flex items-center justify-center">
                  <CameraIcon h={20} w={20} c={"white"} />
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4 mb-4">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold w-1/3">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileDetails.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-md p-2 outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold w-1/3">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileDetails.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-md p-2 outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold w-1/3">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobileNumber"
                  value={profileDetails.mobileNumber}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-md p-2 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold w-1/3">City</label>
                <input
                  type="text"
                  name="city"
                  value={profileDetails.city}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-md p-2 outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold w-1/3">
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  defaultValue={profileDetails.joiningDate}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-md p-2 outline-none"
                />
              </div>
            </div>
          </div>

          {clubSystem === 2 && (
            <div className="border-t-2 pt-[2rem] flex flex-col gap-4">
              <p className="text-2xl font-bold">Volume Points</p>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-center">
                <p>Volume Points you want to deduct monthly from client:</p>
                <input
                  type="number"
                  name="monthlyVpDeduction"
                  value={profileDetails.monthlyVpDeduction}
                  placeholder="Points"
                  onChange={handleChange}
                  className="border-[1px] rounded-2xl px-4 py-2 w-fit opacity-75 outline-none"
                />
              </div>
            </div>
          )}

          <button
            className="bg-[#036231] text-white self-center py-2 px-6 rounded-md mt-6 min-w-[152px]"
            onClick={() => handleUpdateDetails()}
          >
            {loading ? (
              <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
              </div>
            ) : (
              "Update Details"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
