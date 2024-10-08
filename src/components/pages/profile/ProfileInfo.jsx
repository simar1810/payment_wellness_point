import React, { useRef, useState } from "react";
import { Modal } from "@mui/material";
import { CameraIcon, Editicon } from "@/components/svgs";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { SlOptionsVertical } from "react-icons/sl";
import apiInstance from "@/helpers/api";
import Cookies from "js-cookie";
import Image from "next/image";
import { compressFile } from "@/helpers/utils";

const ProfileInfo = ({ profile, fetchUserProfile }) => {
  const [open, setOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [about, setAbout] = useState(profile?.about || "");
  const [specialization, setSpecialization] = useState(
    profile?.specialization || ""
  );
  const [personalDetails, setPersonalDetails] = useState({
    profilePhoto: profile?.profilePhoto || null,
    name: profile?.name || "",
    mobileNumber: profile?.mobileNumber || "",
    email: profile?.email || "",
    noOfClients: profile?.expectedNoOfClients || "",
    organisation: profile?.organisation || "",
  });
  const [loading, setLoading] = useState(false);
  const coachId = Cookies.get("coachId");
  const fileInputRef = useRef(null);

  const handleOpen = (field) => {
    setEditField(field);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditField("");
    setSpecialization(profile?.specialization || "");
    setAbout(profile?.about || "");
    setPersonalDetails({
      profilePhoto: profile?.profilePhoto || null,
      name: profile?.name || "",
      mobileNumber: profile?.mobileNumber || "",
      email: profile?.email || "",
      noOfClients: profile?.expectedNoOfClients || "",
      organisation: profile?.organisation || "",
    });
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
  };

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPersonalDetails({
        ...personalDetails,
        profilePhoto: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editField === "Edit About") {
      if (!about || about === "") {
        toast.error(`About  is required`);
        return;
      }
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("about", about);
        formData.append("coachId", coachId);
        const { data, status } = await apiInstance.updateCoachProfile(formData);
        console.log(data);
        if (status === 200) {
          toast.success("About updated successfully");
          fetchUserProfile();
          handleClose();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("An error occured, please try again");
      }

      console.log("Saving About:", about);
    } else if (editField === "Edit Specialization") {
      if (!specialization || specialization === "") {
        toast.error(`Specialization is required`);
        return;
      }
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("specialization", specialization);
        formData.append("coachId", coachId);
        const { data, status } = await apiInstance.updateCoachProfile(formData);
        console.log(data);
        if (status === 200) {
          toast.success("Specialization updated successfully");
          fetchUserProfile();
          handleClose();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("An error occured, please try again");
      }
    } else if (editField === "Personal Details") {
      const keys = [
        "profilePhoto",
        "name",
        "email",
        "mobileNumber",
        "noOfClients",
        "organisation",
      ];
      for (const key of keys) {
        if (!personalDetails[key] || personalDetails[key] === "") {
          toast.error(`${key} is required`);
          return;
        }
      }

      const compressedFile = await compressFile(personalDetails.profilePhoto);

      console.log("Saving Personal Details:", personalDetails);
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("name", personalDetails.name);
      formData.append("email", personalDetails.email);
      formData.append("mobileNumber", personalDetails.mobileNumber);
      formData.append("expectedNoOfClients", personalDetails.noOfClients);
      formData.append("organisation", personalDetails.organisation);

      try {
        setLoading(true);
        const { data, status } = await apiInstance.updateCoachPersonalDetails(
          formData
        );
        console.log(data);
        if (status === 200) {
          toast.success("Profile updated successfully");
          fetchUserProfile();
          handleClose();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("An error occured, please try again");
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  console.log("Personal Details ===>", personalDetails);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1 relative">
      {/*  <button className='absolute top-4 right-4 cursor-pointer'>
        <SlOptionsVertical color='#969696' />
      </button> */}
      <div className="relative pb-4">
        <img
          className="w-24 h-24 rounded-full mx-auto object-cover"
          src={profile.profilePhoto || "/profilePic.svg"}
          alt="Profile"
        />
        <h2 className="text-center text-xl font-bold mt-4">{profile?.name}</h2>
        <h3 className="text-center text-gray-400 ">
          {profile?.specialization || "N/A"}
        </h3>
        <span className="absolute bottom-0 left-[50%] h-1 w-[50px] bg-[#036231] rounded-md transform -translate-x-1/2"></span>
      </div>

      <div className="mt-4 relative">
        <h4 className="font-bold text-lg">About</h4>
        <button
          className="absolute top-0 right-0 text-primary text-[#036231] border-b text-sm border-b-[#036231]"
          onClick={() => handleOpen("Edit About")}
        >
          Edit
        </button>
        <p className="text-gray-600 text-[15px] mt-2">
          {profile?.about || "N/A"}
        </p>
      </div>
      <div className="mt-4 relative">
        <h4 className="font-bold text-lg">Specialization</h4>
        <button
          className="absolute top-0 right-0 text-primary text-[#036231] border-b text-sm border-b-[#036231]"
          onClick={() => handleOpen("Edit Specialization")}
        >
          Edit
        </button>
        <p className="text-gray-600 text-[15px] mt-2">
          {profile?.specialization || "N/A"}
        </p>
      </div>
      <div className="mt-4 relative">
        <h4 className="font-bold text-lg">Personal Information</h4>
        <button
          className="absolute top-0 right-0 text-primary text-[#036231] border-2 border-[#036231] flex gap-2 items-center rounded-lg px-2  md:px-4 py-1 "
          onClick={() => handleOpen("Personal Details")}
        >
          <Editicon h={15} w={15} c={"#036231"} />
          Edit
        </button>
        <p className="text-gray-600 mt-2">Email: {profile?.email}</p>
        <p className="text-gray-600 mt-2">Phone: {profile?.mobileNumber}</p>
        <p className="text-gray-600 mt-2">
          No of Clients: {profile?.expectedNoOfClients}
        </p>
        <p className="text-gray-600 mt-2">
          Organization: {profile?.organisation}
        </p>
        <p className="text-gray-600 mt-2">Joined: {profile?.joiningDate}</p>

        <p className="text-gray-600 mt-2">Coach ID: {profile?.coachId}</p>
      </div>

      <Modal
        open={open}
        onClose={() => {
          setPersonalDetails({
            profilePhoto: profile?.profilePhoto || null,
            name: profile?.name || "",
            mobileNumber: profile?.mobileNumber || "",
            email: profile?.email || "",
            noOfClients: profile?.expectedNoOfClients || "",
            organisation: profile?.organisation || "",
          });
        }}
        className="flex items-center justify-center"
      >
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
          <form
            className="bg-white w-full min-h-[500px] rounded-b-2xl px-6 py-8 flex flex-col justify-between gap-20"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              {editField === "Edit About" && (
                <textarea
                  className="border p-2 mt-2 w-full min-h-[150px] outline-none"
                  placeholder="About"
                  value={about}
                  onChange={handleAboutChange}
                />
              )}
              {editField === "Edit Specialization" && (
                <textarea
                  className="border p-2 mt-2 w-full min-h-[150px] outline-none"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={handleSpecializationChange}
                />
              )}
              {editField === "Personal Details" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col items-center mb-4">
                    <div
                      className={`w-24 h-24 ${personalDetails.profilePhoto
                          ? ""
                          : "bg-gray-200 border border-[#036231]"
                        } rounded-full relative flex items-center justify-center cursor-pointer`}
                      onClick={triggerFileInput}
                    >
                      {personalDetails.profilePhoto ? (
                        <Image
                          src={
                            personalDetails.profilePhoto instanceof File
                              ? URL.createObjectURL(
                                personalDetails.profilePhoto
                              )
                              : personalDetails.profilePhoto
                          }
                          alt="Profile"
                          width={100}
                          height={100}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : null}
                      <div className="absolute bottom-0 right-0 bg-[#036231] text-white rounded-full p-2 cursor-pointer">
                        <CameraIcon h={20} w={20} c="#fff" />
                      </div>
                    </div>
                    <input
                      type="file"
                      name="profilePhoto"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePhotoChange}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="border-2 border-gray-200 rounded-md p-3 outline-none w-full"
                      value={personalDetails.name}
                      onChange={handlePersonalDetailsChange}
                    />
                    <input
                      type="number"
                      name="mobileNumber"
                      placeholder="Mobile No."
                      className="border-2 border-gray-200 rounded-md p-3 outline-none w-full"
                      value={personalDetails.mobileNumber}
                      onChange={handlePersonalDetailsChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      className="border-2 border-gray-200 rounded-md p-3 outline-none w-full"
                      value={personalDetails.email}
                      onChange={handlePersonalDetailsChange}
                    />
                    <select
                      className={`border-2 border-gray-200 rounded-md p-3 outline-none w-full ${personalDetails.noOfClients === ""
                          ? "text-gray-400"
                          : ""
                        }`}
                      value={personalDetails.noOfClients}
                      onChange={handlePersonalDetailsChange}
                      name="noOfClients"
                    >
                      <option value="">No of Clients</option>
                      <option value="1-10 Clients">1-10 Clients</option>
                      <option value="11-25 Clients">11-25 Clients</option>
                      <option value="26-50 Clients">26-50 Clients</option>
                      <option value="50+ Clients">50+ Clients</option>
                    </select>

                    <select
                      className={`border-2 border-gray-200 rounded-md p-3 outline-none w-full ${personalDetails.organisation === ""
                          ? "text-gray-400"
                          : ""
                        }`}
                      value={personalDetails.organisation}
                      onChange={handlePersonalDetailsChange}
                      name="organisation"
                    >
                      <option value="">Organization</option>
                      <option value="Amway">Amway</option>
                      <option value="Herbalife">Herbalife</option>
                      <option value="Independent Nutritionists">
                        Independent Nutritionists
                      </option>
                      <option value="Gym Trainer">Gym Trainer</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#036231] text-white px-4 py-3 rounded-md"
            >
              {loading ? (
                <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
                  <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                </div>
              ) : editField === "Personal Details" ? (
                "Update Details"
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileInfo;
