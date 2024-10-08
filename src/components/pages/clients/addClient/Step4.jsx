import Loader from "@/components/loader/Loader";
import apiInstance from "@/helpers/api";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddClientStep4 = ({ setStep, clientData, setClientData }) => {
  // console.log("clientData of step-4 => ", clientData);

  const { email = "", mobileNumber = "" } = clientData;

  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  const handleChange = (e, key) => {
    if (key === "img") {
      const file = e.target.files[0];
      // console.log("e.target.file => ", file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
      setClientData((prev) => ({ ...prev, file: file }));
    } else {
      setClientData((prev) => ({ ...prev, [key]: e.target.value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key of Object.keys(clientData)) {
        if (clientData[key]) {
          formData.append(key, clientData[key]);
        }
      }
      formData.append('person', 'club-coach');
      formData.append('ideal_weight', '50');

      const { data, status } = await apiInstance.addAppClient(formData);
      console.log("response of add app client api => ", data)
      if (status === 200) {
        const { clientId } = data?.data?.clientDetails
        setClientData((prev) => ({ ...prev, clientId }));
        setStep((prev) => prev + 1);
      }
    } catch (err) {
      toast.error("Error while adding Client");
      console.log("error in handleSubmit for adding client => ", err);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="bg-white p-[2rem] flex flex-col justify-between items-center rounded-b-2xl gap-12  max-h-[535px] overflow-scroll scrollbar-hide">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div className="bg-white p-[2rem] flex flex-col justify-between items-center rounded-b-2xl gap-12">
          <div className="w-fit flex items-center justify-center relative">
            <Image
              src={profileImg ?? "/default-user-dp.svg"}
              alt="profileImg"
              width={150}
              height={100}
              className="self-center rounded-full border-2 border-[#036231] aspect-square"
            />
            <label
              htmlFor="image"
              className="bg-[#036231] rounded-full flex items-center justify-center p-[5px] absolute bottom-0 right-[1rem] cursor-pointer"
            >
              <Image
                src={"/camera-icon.svg"}
                alt="cameraIcon"
                width={20}
                height={100}
              />
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => handleChange(e, "img")}
              className="hidden"
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <div>
              <label className="text-black">Email ID </label>
              <input
                value={email}
                onChange={(e) => handleChange(e, "email")}
                type="email"
                placeholder="Enter Email ID"
                className="w-full h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md"
              />
            </div>

            <div>
              <label className="text-black">Mobile Number</label>
              <input
                value={mobileNumber}
                onChange={(e) => handleChange(e, "mobileNumber")}
                type="number"
                placeholder="Enter Number"
                className="w-full h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-[#036231] w-full text-white py-2 px-6 rounded-md"
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
};

export default AddClientStep4;
