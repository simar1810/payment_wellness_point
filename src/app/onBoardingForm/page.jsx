"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultImage from "../../../public/default-user-dp.svg";
import { OnboardingFormInput } from "@/components/core/inputs";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";
import dayjs from "dayjs";
import { DatePickerComponent } from "@/components/core";
import Footer from "@/components/core/Footer";

function Page({ searchParams }) {
  const [imageURL, setImageURL] = useState("/avatar.webp");
  const [clientCreated, setClientCreated] = useState(false)
  const { id } = searchParams;
  const today = dayjs();
  const [JoiningDate, setJoiningDate] = useState(today);
  const [loading, setLoading] = useState(false);
  // console.log(id);
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    sponseredByName: "",
    city: "",
    file: "",
    id_no: ""
  });

  function handleChange(e, keyValue) {
    setClientInfo((prev) => {
      return { ...prev, [keyValue]: e.target.value };
    });
  }

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

  useEffect(() => {
    setClientInfo((prev) => {
      return { ...prev, JoiningDate: JoiningDate };
    });
  }, [JoiningDate]);

  async function handleSubmit() {
    const emailRejex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mobileRejex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (clientInfo.name === "") {
      toast.error("Please enter name");
      return;
    } else if (clientInfo.city === "") {
      toast.error("Please enter  City");
      return;
    }
    if (clientInfo.mobileNumber === "") {
      toast.error("Please enter either email or mobile number");
      return;
    } else if (clientInfo.email !== "" && !emailRejex.test(clientInfo.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (
      clientInfo.mobileNumber !== "" &&
      !mobileRejex.test(clientInfo.mobileNumber)
    ) {
      toast.error("Please enter a valid mobile number");
      return;
    } else if (clientInfo.JoiningDate === "") {
      toast.error("please enter Joining date");
      return;
    } else {
      try {
        setLoading(true);
        const apiFormData = new FormData();
        const dayjsInstance = dayjs(JoiningDate.$d);
        const formattedDate = dayjsInstance.format("YYYY-MM-DD");
        const newClientInfo = { ...clientInfo, joiningDate: formattedDate };
        for (const key of Object.keys(newClientInfo)) {
          apiFormData.append(key, newClientInfo[key]);
        }
        const response = await apiInstance.registerClientForm(
          apiFormData,
          "form",
          id
        );
        if (response.status) {
          toast.success("Customer Created Successfully");
          setClientCreated(true)
          // router.push("https://www.wellnessz.in/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
      setLoading(false);
    }
  }
  return (
    <>
      <div className="py-6 px-2 sm:px-20 sm:py-10 flex items-center justify-center bg-[#f5f5f5]">
        {clientCreated
          ? <div className="w-full min-h-[60vh] bg-white py-4 px-8 flex items-center justify-center rounded-md">
            <button className="bg-green-800 text-white px-4 py-2 rounded-md" onClick={() => setClientCreated(false)}>Submit New Customer</button>
          </div>
          : <div className=" h-full w-[95%] bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-5 flex flex-col items-center py-10">
            <p className=" text-4xl font-semibold">Onboarding Form</p>
            <div className=" flex flex-col items-center mt-5">
              <Image
                src={clientInfo.file !== "" ? imageURL : defaultImage}
                alt=""
                height={0}
                width={0}
                unoptimized
                className=" h-[140px] w-[140px] rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                name="file"
                id="userImage"
                hidden
                onChange={(e) => handleFile(e)}
              />
              <label
                htmlFor="userImage"
                className=" h-[30px] w-[85px] px-1 bg-[#036231] text-white text-sm font-semibold flex items-center justify-center rounded -mt-2"
              >
                Upload Pic
              </label>
            </div>

            <div className="w-full sm:w-[50%] flex flex-col gap-4 mt-8">
              <OnboardingFormInput
                title={"Name"}
                handleChange={(e) => handleChange(e, "name")}
                value={clientInfo.name}
                placeholder={"Kishore Kumar"}
              />
              <OnboardingFormInput
                title={"Phone Number"}
                handleChange={(e) => handleChange(e, "mobileNumber")}
                value={clientInfo.mobileNumber}
                placeholder={"9999999999"}
              />
              <OnboardingFormInput
                title={"City"}
                handleChange={(e) => handleChange(e, "city")}
                value={clientInfo.city}
                placeholder={"Mumbai"}
              />
              <OnboardingFormInput
                title={"Email Id"}
                handleChange={(e) => handleChange(e, "email")}
                value={clientInfo.email}
                placeholder={"kishore@gmail.com"}
              />
              <OnboardingFormInput
                title={"Customer ID"}
                handleChange={(e) => handleChange(e, "id_no")}
                value={clientInfo.id_no}
                placeholder={"cus_123"}
              />
              <div>
                <p className="text-lg font-semibold ">Joining Date</p>
                <DatePickerComponent
                  // value={clientInfo.JoiningDate}
                  label={""}
                  setvalue={setJoiningDate}
                // mindate={today}
                />
              </div>

              <OnboardingFormInput
                title={"Sponsored by"}
                handleChange={(e) => handleChange(e, "sponseredByName")}
                value={clientInfo.sponseredByName}
                placeholder={"Sponsored by"}
              />
              <div className=" flex items-center justify-center mt-2">
                <button
                  onClick={handleSubmit}
                  className=" w-[40%] text-white bg-[#036231] py-2 text-lg rounded-xl"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>}
      </div>
      <Footer />
    </>
  );
}

export default Page;
