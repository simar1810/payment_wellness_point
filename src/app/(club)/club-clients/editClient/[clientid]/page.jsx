"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Backicon, CameraIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import DatePickerComponent from "@/components/core/datePicker";
import defaultImage from "../../../../../../public/default-user-dp.svg";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const { clientid } = params;

  const [imageURL, setImageURL] = useState("/avatar.webp");
  const today = dayjs();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [JoiningDate, setJoiningDate] = useState(today);
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    sponseredByName: "",
    city: "",
    joiningDate: today,
    file: "",
    rollno: "",
  });

  const handleFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 2097152) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      setImageURL(URL.createObjectURL(event.target.files[0]));
      setClientInfo((prev) => ({ ...prev, file: event.target.files[0] }));
    }
  };

  const fetchClientData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, status } = await apiInstance.getClientDetails(clientid);
      if (status === 200) {
        const joiningDate = dayjs(data.data.joiningDate);
        // console.log("joiningDate ==>", joiningDate, data.data.joiningDate);
        setClientInfo((prev) => ({
          ...prev,
          name: data.data.name,
          email: data.data.email,
          mobileNumber: data.data.mobileNumber,
          city: data.data.city,
          sponseredByName: data.data.sponseredByName,
          rollno: data.data.rollno,
          joiningDate: joiningDate,
        }));
        setImageURL(data.data.profilePhoto || "/avatar.webp");
        setJoiningDate(joiningDate);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [clientid]);

  const handleChange = (e, keyValue) => {
    setClientInfo((prev) => ({ ...prev, [keyValue]: e.target.value }));
  };

  const handleEdit = async () => {
    const emailRejex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mobileRejex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (clientInfo.name === "") {
      toast.error("Please Enter Name");
      return;
    } else if (clientInfo.email && !emailRejex.test(clientInfo.email)) {
      toast.error("Please Enter a valid Email");
      return;
    } else if (
      clientInfo.mobileNumber === "" ||
      !mobileRejex.test(clientInfo.mobileNumber)
    ) {
      toast.error("Please Enter a valid Mobile Number");
      return;
    } else {
      try {
        const apiFormData = new FormData();
        const formattedDate = JoiningDate.format("YYYY-MM-DD");
        const newClientInfo = { ...clientInfo, joiningDate: formattedDate };

        for (const key of Object.keys(newClientInfo)) {
          apiFormData.append(key, newClientInfo[key]);
        }
        const { data, status } = await apiInstance.updateClient(
          apiFormData,
          clientid
        );
        if (status === 200) {
          toast.success("Client Edited Successfully");
          router.back();
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to edit customer");
      }
    }
  };

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  return (
    <div className="w-full bg-[#f4f4f4] p-4">
      <div className="h-full w-full bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-6">
        <button
          onClick={() => router.back()}
          className="bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md"
        >
          <Backicon h={15} w={15} c={"white"} />
          Back
        </button>

        <div className="mt-4 flex flex-col gap-4">
          <div className="h-[100px] w-[100px] relative border-[2px] border-solid border-[#036231] rounded-full flex items-center justify-center">
            <Image
              src={imageURL !== "" ? imageURL : defaultImage}
              alt="Profile"
              height={100}
              width={100}
              className="rounded-full h-full w-full -mt-[1px]"
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
                  onChange={handleFile}
                />
              </div>
            </label>
          </div>

          <p className="text-xl font-semibold uppercase">{clientInfo.name}</p>
          <div className="w-full h-[2px] bg-[#00000040]"></div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 justify-between">
            <div className="w-full sm:w-[50%] flex flex-col gap-4">
              <Input
                name={"Name"}
                placeHolder={"John Doe"}
                value={clientInfo.name}
                required
                handleChange={(e) => handleChange(e, "name")}
              />
              <Input
                name={"Email Id"}
                placeHolder={"Johndoe@gmail.com"}
                value={clientInfo.email ? clientInfo.email : ""}
                required
                handleChange={(e) => handleChange(e, "email")}
              />
              <Input
                name={"Mobile Number"}
                placeHolder={"+91 9876543210"}
                value={clientInfo.mobileNumber}
                required
                handleChange={(e) => handleChange(e, "mobileNumber")}
              />
              <Input
                name={"Sponsored By"}
                placeHolder={"John Doe"}
                value={clientInfo.sponseredByName}
                required
                handleChange={(e) => handleChange(e, "sponseredByName")}
              />
            </div>

            <div className="w-full sm:w-[50%] flex flex-col gap-4">
              <Input
                name={"City"}
                placeHolder={"Mumbai"}
                value={clientInfo.city}
                required
                handleChange={(e) => handleChange(e, "city")}
              />

              <div className="w-full mb-[2rem]">
                <p>Joining Date:</p>
                <div className="h-[20px]">
                  <DatePickerComponent
                    value={JoiningDate}
                    label={""}
                    setvalue={setJoiningDate}
                  />
                </div>
              </div>

              <Input
                name={"Roll No"}
                placeHolder={"Enter New Roll Number"}
                value={clientInfo.rollno}
                handleChange={(e) => handleChange(e, "rollno")}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={handleEdit}
              className="mt-5 px-5 py-2 bg-[#036231] text-white rounded-lg"
            >
              Edit Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ name, placeHolder, value, required, handleChange }) {
  return (
    <div>
      <p className="font-semibold">{name}:</p>
      <input
        type="text"
        className="h-[40px] w-full border-[1px] border-solid border-[#00000060] rounded-lg outline-none px-2 text-[#00000080] font-semibold placeholder:font-medium"
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}

export default Page;
