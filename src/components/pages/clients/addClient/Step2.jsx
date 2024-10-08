import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddClientStep2 = ({ setStep, clientData, setClientData }) => {
  // console.log("clientData of step-2 => ", clientData);

  const [composition, setComposition] = useState("");
  const [visceralFat, setVisceralFat] = useState("");

  const handleSubmit = () => {
    if (!composition || composition.length === 0) {
      toast.error(`Body Composition is required`);
      return;
    }

    setClientData((prev) => ({
      ...prev,
      bodyComposition: composition,
      visceral_fat: visceralFat,
    }));
    setStep((prev) => prev + 1);
  };

  return (
    <div className="bg-white p-[2rem] flex flex-col justify-between items-center rounded-b-2xl gap-1  max-h-[535px] overflow-scroll scrollbar-hide">
      <div className="self-start">
        <p>Body Composition</p>
        <p className="opacity-40">Select Body Type</p>
      </div>

      <div className="flex flex-wrap justify-center h-auto">
        <button
          className={`flex flex-col w-full lg:w-[40%] h-[10rem] text-black justify-center items-center gap-4 border ${composition === "slim"
              ? "border-[#036231] border-2"
              : "border-gray-400"
            } rounded-md py-[1.3rem] px-[3rem] m-[1rem]`}
          onClick={() => setComposition("slim")}
        >
          <Image
            src={"/slim-composition.svg"}
            alt="slim-icon"
            width={200}
            height={100}
            className="w-[100%] h-[70%]"
          />
          Slim
        </button>

        <button
          className={`flex flex-col w-full lg:w-[40%] h-[10rem] text-black justify-center items-center gap-4 border ${composition === "medium"
              ? "border-[#036231] border-2"
              : "border-gray-400"
            } rounded-md py-[1.3rem] px-[3rem] m-[1rem]`}
          onClick={() => setComposition("medium")}
        >
          <Image
            src={"/medium-composition.svg"}
            alt="medium-icon"
            width={200}
            height={100}
            className="w-[100%] h-[70%]"
          />
          Medium
        </button>

        <button
          className={`flex flex-col w-full lg:w-[40%] h-[10rem] text-black justify-center items-center gap-4 border ${composition === "fat"
              ? "border-[#036231] border-2"
              : "border-gray-400"
            } rounded-md py-[1.8rem] px-[1.3rem] m-[1rem]`}
          onClick={() => setComposition("fat")}
        >
          <Image
            src={"/fat-composition.svg"}
            alt="fat-icon"
            width={200}
            height={100}
            className="w-[100%] h-[70%]"
          />
          Fat
        </button>
      </div>

      <div className="w-full">
        <label className="text-black">Visceral Fat</label>
        <input
          value={visceralFat}
          onChange={(e) => setVisceralFat(e.target.value)}
          name="visceralFat"
          type="text"
          placeholder="Enter Visceral Fat"
          className="w-full h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-[#036231] w-full mt-4 text-white py-2 px-6 rounded-md"
      >
        Continue
      </button>
    </div>
  );
};

export default AddClientStep2;
