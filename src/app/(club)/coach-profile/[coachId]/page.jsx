"use client";

import { Backicon, CameraIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { Modal } from "@mui/material";
import { set } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Page = ({ params }) => {
  const router = useRouter();
  // console.log("searchParams in coach-profile page => ", params);
  const coachId = params?.coachId || "";
  const { user, clubSystem = 0 } = useSelector((state) => state.user);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function validatePassword(password) {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numericRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*]/;
    return (
      password.length >= 6 &&
      lowercaseRegex.test(password) &&
      uppercaseRegex.test(password) &&
      numericRegex.test(password) &&
      specialCharRegex.test(password)
    );
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const keys = ["oldPassword", "newPassword", "confirmPassword"];
    for (let key of keys) {
      if (!passwordDetails[key]) {
        return toast.error(`${key} is required`);
      }
    }

    if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
      return toast.error("Password does not match");
    }

    if (!validatePassword(passwordDetails.newPassword)) {
      return toast.error(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    setResetLoading(true);
    try {
      const { status } = await apiInstance.resetCoachPassword({
        coachId,
        oldPassword: passwordDetails.oldPassword,
        newPassword: passwordDetails.newPassword,
      });
      if (status === 200) {
        toast.success("Password Reset Successfully");
        setPasswordDetails({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowResetPasswordModal(false);
      }
    } catch (error) {
      console.error("reset password error => ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setResetLoading(false);
      // setShowResetPasswordModal(false);
    }
  };

  async function handleEditRollNumberInitials(e) {
    try {
      e.preventDefault();
      if (e.currentTarget.rollNoInitials.value === "" || e.currentTarget.rollNoInitials.value.length > 3) {
        toast.error("Kindly enter at least one character and the length should be less than 3!")
        return;
      }
      const data = {
        rollNoInitials: e.currentTarget.rollNoInitials.value
      }
      const response = await apiInstance.editCoachRollNoInitials(data);
      if (response.data.success) {
        toast.success(`Roll no initials updated successfully - ${response.data.payload.rollNumberInitials}`)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleEditFreeTrialVpDays(e) {
    try {
      e.preventDefault();
      if (e.currentTarget.freeTrialVPDays.value < 0) {
        toast.error("Enter value greater than 0!")
        return;
      }
      const data = {
        freeTrialVPDays: e.currentTarget.freeTrialVPDays.value
      }
      const response = await apiInstance.editCoachFreeTrialVPDays(data);
      if (response.data.success) {
        toast.success(response.data.message || "Successfully Updated!")
      }
    } catch (error) {
      toast.error(error.message || "Error occured, Please try again later!");
    }
  }
  // console.log(user)
  return (
    <div className="w-full overflow-scroll px-10 py-10 scrollbar-hide">
      <div className="bg-white rounded-2xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] pt-8 p-6 min-h-[550px] relative">
        <button
          className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md"
          onClick={() => router.back()}
        >
          <Backicon h={15} w={15} c={"white"} />
          Back
        </button>
        <button
          className="border-2 border-[#036231] rounded-md text-[#036231] p-1 px-2 text-sm font-semibold absolute right-4 top-4"
          onClick={() => {
            setShowResetPasswordModal(true);
          }}
        >
          Reset Password
        </button>

        <div className="mt-6 flex flex-col gap-4">
          <div className="w-full border-b-2 pb-4 flex flex-col gap-3 relative ">
            <h1 className="text-2xl font-bold ">Profile Details</h1>
            <div className="h-[100px] w-[100px] relative border-[2px] border-solid  rounded-full flex items-center justify-center mt-5">
              <Image
                src={
                  user?.profilePhoto !== ""
                    ? user?.profilePhoto
                    : "/default-user-dp.svg"
                }
                alt="Profile"
                height={100}
                width={100}
                className="rounded-full h-full w-full -mt-[1px] object-cover"
              />
              {/*   <label htmlFor="image">
              <div className="h-[40px] w-[40px] rounded-full bg-[#036231] absolute -right-2 bottom-0 flex items-center justify-center">
                <CameraIcon h={20} w={20} c={"white"} />
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  //   onChange={handleFile}
                />
              </div>
            </label> */}
            </div>
            <Link
              href={`/coach-profile/edit/${coachId}`}
              type="button"
              className="border-[#036231] border-2 rounded-md text-[#036231] py-1 px-5 self-end absolute bottom-4 right-4"
            >
              Edit
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4 mb-4">
            <div className="flex flex-col gap-6">
              <div className="flex  items-center  gap-4 mb-5">
                <label className="text-lg font-semibold w-1/4">Name</label>
                <p className="text-[#82867E] text-[18px]">{user?.name}</p>
              </div>
              <div className="flex  items-center  gap-4 mb-5">
                <label className="text-lg font-semibold w-1/4">Email</label>
                <p className="text-[#82867E] text-[18px]">{user?.email}</p>
              </div>
              <div className="flex  items-center  gap-4 mb-5">
                <label className="text-lg font-semibold w-1/4">
                  Mobile Number
                </label>
                <p className="text-[#82867E] text-[18px]">
                  {user?.mobileNumber}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex  items-center  gap-4 mb-5">
                <label className="text-lg font-semibold w-1/4">City</label>
                <p className="text-[#82867E] text-[18px]">{user?.city}</p>
              </div>
              <div className="flex  items-center  gap-4 mb-5">
                <label className="text-lg font-semibold w-1/4">
                  Joining Date
                </label>
                <p className="text-[#82867E] text-[18px]">
                  {user?.joiningDate.length > 0 ? user?.joiningDate : "-"}
                </p>
              </div>
            </div>
          </div>

          {clubSystem === 2 && (
            <div className="border-t-2 pt-[2rem] flex flex-col gap-4">
              <p className="text-2xl font-bold">Volume Points</p>
              <div className="flex gap-4 items-center">
                <p>Volume Points you want to deduct monthly from customer:</p>
                <p className="border-[1px] rounded-2xl px-4 py-2 w-fit opacity-75 outline-none">
                  {user?.monthlyVpDeduction ?? 100}
                </p>
              </div>
            </div>
          )}

          <div className="w-full mt-4 mb-4 border-t-2 pt-8">
            <form onSubmit={handleEditFreeTrialVpDays}>
              <div className="flex items-center gap-4">
                <p>Number of free Trial Days - </p>
                <input type="number" defaultValue={user?.freeTrialVPDays ?? 0} name="freeTrialVPDays" className="w-auto block focus:outline-none mt-2 px-4 py-2 rounded-md border-2" />
              </div>
              <button type="submit" className="bg-green-400 mt-4 px-4 py-2 rounded-md">Update</button>
            </form>
          </div>

          {/* update roll number initials */}
          <div className="w-full mt-4 mb-4 border-t-2 pt-8">
            <div className="text-2xl font-bold">Roll No Initials</div>
            <form onSubmit={handleEditRollNumberInitials}>
              <div className="flex items-center gap-4">
                <p>The roll number initials of the customer should start from - </p>
                <input type="text" defaultValue={user?.rollNumberInitials || user.name.slice(0, 3).toLowerCase()} name="rollNoInitials" className="w-auto block focus:outline-none mt-2 px-4 py-2 rounded-md border-2" />
              </div>
              <button type="submit" className="bg-green-400 mt-4 px-4 py-2 rounded-md">Update</button>
            </form>
          </div>
        </div>
      </div>

      <Modal
        open={showResetPasswordModal}
        className="flex justify-center items-center"
      >
        <div className="bg-white flex flex-col items-center gap-2  rounded-xl w-[90%] sm:w-[35%]">
          <div className="w-full flex justify-center items-center mb-4 p-5 bg-[#036231] rounded-t-xl relative">
            <h1 className="text-xl text-white">Reset Password</h1>
            <button
              type="button"
              onClick={() => setShowResetPasswordModal(false)}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <IoMdClose fontSize={30} color="#fff" />
            </button>
          </div>
          <form
            className="flex flex-col gap-4 p-5 px-7 w-full"
            onSubmit={handlePasswordReset}
          >
            <div className="w-full mt-3">
              <label className="block font-semibold text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 border rounded w-full  outline-none border-gray-300"
                placeholder="Enter Old Password"
                value={passwordDetails.oldPassword}
                onChange={(e) =>
                  setPasswordDetails({
                    ...passwordDetails,
                    oldPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full mt-3">
              <label className="block font-semibold text-gray-700">
                Enter New Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 border rounded w-full  outline-none border-gray-300"
                placeholder="Enter New Password"
                value={passwordDetails.newPassword}
                onChange={(e) =>
                  setPasswordDetails({
                    ...passwordDetails,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full mt-3">
              <label className="block font-semibold text-gray-700">
                Re-Enter Confirm Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 border rounded w-full  outline-none border-gray-300"
                placeholder="Confirm Password"
                value={passwordDetails.confirmPassword}
                onChange={(e) =>
                  setPasswordDetails({
                    ...passwordDetails,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full mt-6 flex justify-end">
              <button
                className="bg-[#036231] text-white text-lg py-3 px-6 rounded-lg font-semibold w-full"
                type="submit"
              >
                {resetLoading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
