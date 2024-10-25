"use client";
import React, { useEffect, useState } from "react";
import { Backicon, CameraIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import DatePickerComponent from "@/components/core/datePicker";
import defaultImage from "../../../../../public/default-user-dp.svg";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";

function Page() {
  const [imageURL, setImageURL] = useState("/avatar.webp");
  const today = dayjs();
  const [JoiningDate, setJoiningDate] = useState(today);
  const [dob, setDob] = useState(today);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    sponseredByName: "",
    city: "",
    file: "",
    id_no: ""
  });
  // const dayjsInstance = dayjs(JoiningDate.$d);
  // Formatting the date to 'YYYY-MM-DD'

  // useEffect(() => {
  //   setClientInfo((prev) => {
  //     console.log(JoiningDate);
  //     console.log({ ...prev, JoiningDate: JoiningDate });
  //     return { ...prev, JoiningDate: JoiningDate };
  //   });
  // }, [JoiningDate]);
  const handleFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 2097152) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      setImageURL(URL.createObjectURL(event.target.files[0]));
      setClientInfo((prev) => {
        return { ...prev, file: event.target.files[0] };
      });
    }
  };
  function handleChange(e, keyValue) {
    setClientInfo((prev) => {
      return { ...prev, [keyValue]: e.target.value };
    });
  }

  async function handleClick() {
    const emailRejex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mobileRejex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (clientInfo.name === "") {
      toast.error("please enter name");
      return;
    } else if (clientInfo.email && !emailRejex.test(clientInfo.email)) {
      toast.error("please enter Email");
      return;
    } else if (
      clientInfo.mobileNumber === "" &&
      !mobileRejex.test(clientInfo.mobileNumber)
    ) {
      toast.error("please enter Mobile Number");
      return;
    } else {
      // setLoading(true);
      try {
        const apiFormData = new FormData();
        const dayjsInstance = dayjs(JoiningDate.$d);
        const formattedDate = dayjsInstance.format("DD-MM-YYYY");
        console.log(formattedDate);
        const newClientInfo = { ...clientInfo };
        for (const key of Object.keys(newClientInfo)) {
          apiFormData.append(key, newClientInfo[key]);
        }
        apiFormData.append("dob", dayjs(dob).format("DD-MM-YYYY"))
        apiFormData.append("joiningDate", dayjs(JoiningDate).format("DD-MM-YYYY"))
        // console.log(apiFormData.get("dob"), apiFormData.get("joiningDate"))
        // return
        const { status } = await apiInstance.registerClientManual(
          apiFormData,
          "manual"
        );
        if (status === 200) {
          toast.success("Client created");
          router.back();
        } else {
          toast.error(response?.data?.message || "Please try again later!");
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Please try later!")
      }
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className=" w-full p-10 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full bg-[#f4f4f4] p-4">
      <div className=" h-full w-full bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-6">
        <button
          onClick={() => router.back()}
          className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md"
        >
          <Backicon h={15} w={15} c={"white"} />
          Back
        </button>

        <div className=" mt-4 flex flex-col gap-4">
          <div className=" h-[100px] w-[100px] relative border-[2px] border-solid border-[#036231] rounded-full flex items-center justify-center">
            <Image
              src={clientInfo.file !== "" ? imageURL : defaultImage}
              alt=""
              height={100}
              width={100}
              className=" rounded-full h-full w-full -mt-[1px]"
            />
            <label htmlFor="image">
              <div className=" h-[40px] w-[40px] rounded-full bg-[#036231] absolute -right-2 bottom-0 flex items-center justify-center">
                <div className="cursor-pointer">
                  <CameraIcon h={20} w={20} c={"white"} />
                </div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFile(e)}
                />
              </div>
            </label>
          </div>

          <p className=" text-xl font-semibold uppercase">{clientInfo.name}</p>
          <div className=" w-full h-[2px] bg-[#00000040]"></div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 justify-between ">
            <div className="w-full sm:w-[50%] flex flex-col  gap-4">
              <Input
                name={"Name"}
                placeHolder={"Aman Sharma"}
                value={clientInfo.name}
                required
                handleChange={(e) => handleChange(e, "name")}
              />
              <Input
                name={"Email Id"}
                placeHolder={"amansharma@gmail.com"}
                value={clientInfo.email}
                required
                handleChange={(e) => handleChange(e, "email")}
              />
              <Input
                name={"Mobile Number"}
                placeHolder={"9876543210"}
                value={clientInfo.mobileNumber}
                required
                handleChange={(e) => handleChange(e, "mobileNumber")}
              />
              <Input
                name={"Sponsored By"}
                placeHolder={"John Sharma"}
                value={clientInfo.sponseredByName}
                required
                handleChange={(e) => handleChange(e, "sponseredByName")}
              />
            </div>
            <div className="w-full sm:w-[50%] flex flex-col  gap-4">
              <Input
                name={"City"}
                placeHolder={"Mumbai"}
                value={clientInfo.city}
                required
                handleChange={(e) => handleChange(e, "city")}
              />
              <Input
                name={"Customer ID No."}
                placeHolder={"ID No."}
                value={clientInfo.id_no}
                required
                handleChange={(e) => handleChange(e, "id_no")}
              />
              <div className="mb-8 w-full">
                <p>Date Of Birth:</p>
                <div className=" h-[20px]">
                  <DatePickerComponent
                    label={""}
                    setvalue={setDob}
                  />
                </div>
              </div>
              <div className=" w-full">
                <p>Joining Date:</p>
                <div className=" h-[20px]">
                  <DatePickerComponent
                    label={""}
                    setvalue={setJoiningDate}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-center ">
            <button
              onClick={handleClick}
              className=" mt-5 px-5 py-2 bg-[#036231] text-white rounded-lg"
            >
              Add Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function Input({ ...props }) {
  return (
    <div>
      <p className=" font-semiibold">{props.name}:</p>
      <input
        type="text"
        className=" h-[40px] w-full border-[1px] border-solid  border-[#00000060] rounded-lg outline-none px-2 text-[#00000080] font-semibold placeholder:font-medium "
        placeholder={props.placeHolder}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default Page;
