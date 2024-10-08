"use client";
import Image from "next/image";
import React, { useState } from "react";
import { OnboardingFormInput, UploadImage } from "@/components/core/inputs";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";
import Spinner from "@/components/loader/Spinner";
import Footer from "@/components/core/Footer";

function Page() {
  return (
    <>
      <div className="py-6 px-2 sm:px-20 sm:py-10 flex items-center justify-center bg-[#f5f5f5]">
        <div className=" h-full w-[95%] bg-white rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-5 flex flex-col items-center py-10">
          <p className="text-[#036231] text-4xl font-semibold">
            Volume Point System
          </p>
          <RequestVolumePointsForm />

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;

export function RequestVolumePointsForm({ defaultRollNo, inputTitles, callbackOnSuccess = () => { } }) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    rollno: defaultRollNo?.value || "",
    date: "",
    points: "",
    file: null,
  });

  const { rollno, date, points, file } = values;
  // console.log('values of volume point form => ', values)

  function handleChange(e, name) {
    setValues({ ...values, [name]: e.target.value });
  }
  const generatePreviewImage = (image) => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return "";
  };
  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 2097152) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      setValues({ ...values, file: e.target.files[0] });
    }
  };

  async function handleSubmit() {
    if (rollno === "") {
      toast.error("Please enter Roll Number");
      return;
    } else if (date === "") {
      toast.error("Please enter Date");
      return;
    } else if (points === "") {
      toast.error("Please enter Points");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      for (const key of Object.keys(values)) {
        formData.append(key, values[key]);
      }
      // console.log(apiFormData);
      const { status } = await apiInstance.requestVolumePoints(formData);

      if (status === 200) {
        toast.success("Request sent to add Volume Points Successfully");
        setValues({
          rollno: "",
          date: "",
          points: "",
          file: null,
        });
        callbackOnSuccess()
      }
    } catch (error) {
      console.error("err in requestVolumePoints api => ", error);
      toast.error(
        error?.response?.data?.message || "Error while sending request!"
      );
    }
    setLoading(false);
  }
  return <div className="w-full sm:w-[50%] flex flex-col gap-4 mt-8">
    <OnboardingFormInput
      title={"Roll No."}
      handleChange={(e) => handleChange(e, "rollno")}
      value={rollno}
      placeholder={"wel2121"}
    />

    <div>
      <p className="text-lg font-semibold ">Date of Shopping</p>
      <input
        type="date"
        value={date}
        className="h-[50px] w-full border-[1px] border-[#00000060] border-solid text-lg  rounded-xl outline-none mt-1 px-4 "
        onChange={(e) => handleChange(e, "date")}
      />
    </div>

    <OnboardingFormInput
      title={"Volume Points"}
      handleChange={(e) => handleChange(e, "points")}
      value={points}
      placeholder={"No. of Volume Points"}
    />

    <div>
      <p className="text-lg font-semibold ">Attach Screenshot</p>
      {file ? (
        <Image
          src={generatePreviewImage(file)}
          alt="screen-shot"
          width={150}
          height={150}
          className="w-full h-52 rounded-md"
        />
      ) : (
        <UploadImage handleChange={handleFile} />
      )}
    </div>

    <div className="flex items-center justify-center mt-2">
      <button
        onClick={handleSubmit}
        className=" w-[40%] text-white bg-[#036231] py-2 text-lg rounded-xl"
      >
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Spinner color="white" />
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  </div>
}