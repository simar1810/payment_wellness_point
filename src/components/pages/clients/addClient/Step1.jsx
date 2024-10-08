import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPoundSign } from "react-icons/fa";

const AddClientStep1 = ({ setStep, clientData, setClientData }) => {
  const {
    name = "",
    age = "",
    gender = "",
    weight = "",
    weightUnit = "",
    height = "",
    inches = "",
    heightUnit = "",
  } = clientData;
  console.log("clientData of step-1 => ", clientData);

  const handleChange = (e) => {
    e.preventDefault();
    setClientData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const keys = [
      "name",
      "gender",
      "age",
      "weight",
      "weightUnit",
      "height",
      "heightUnit",
    ];
    for (const key of keys) {
      // console.log("key => ", key);
      if (!clientData[key] || clientData[key].length === 0) {
        toast.error(`${key} is required`);
        return;
      }
    }

    if (heightUnit === "Inches") {
      // if (!inches || inches.length === 0)
      setClientData((prev) => ({
        ...prev,
        height: height.split(".")[0] + "." + (inches.length > 0 ? inches : "0"),
      }));
    }

    setStep((prev) => prev + 1);
  };

  const handleGenderSelect = (gender) => {
    setClientData((prev) => ({ ...prev, gender }));
  };

  return (
    <div className='bg-white p-[2rem] flex flex-col justify-between items-center rounded-b-2xl gap-12 max-h-[535px] overflow-scroll scrollbar-hide'>
      <div className='w-full flex flex-col gap-3'>
        <div>
          <label className='text-black'> Client Name </label>
          <input
            value={name}
            onChange={(e) => handleChange(e)}
            name='name'
            type='text'
            placeholder='Enter Name'
            className='w-full h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md'
          />
        </div>

        <div>
          <label className='text-black'>Gender</label>
          <div className='flex justify-between items-center'>
            <button
              className={`flex w-[47%] mt-1 text-black text-opacity-70 justify-center items-center gap-2 border ${gender === "male"
                  ? "border-[#036231] border-2"
                  : "border-gray-400"
                } rounded-md h-[2.5rem]`}
              onClick={() => handleGenderSelect("male")}
            >
              <Image
                src={"/male-icon.svg"}
                alt='male-icon'
                width={20}
                height={40}
              />
              Male
            </button>
            <button
              className={`flex w-[47%] mt-1 text-black text-opacity-70 justify-center items-center gap-2 border ${gender === "female"
                  ? "border-[#036231] border-2"
                  : "border-gray-400"
                } rounded-md h-[2.5rem]`}
              onClick={() => handleGenderSelect("female")}
            >
              <Image
                src={"/female-icon.svg"}
                alt='male-icon'
                width={20}
                height={40}
              />
              Female
            </button>
          </div>
        </div>

        <div>
          <label className='text-black'> Age </label>
          <input
            value={age}
            onChange={(e) => handleChange(e)}
            name='age'
            type='number'
            placeholder='Enter Age'
            className='w-full h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md'
          />
        </div>

        <div>
          <label className='text-black'> Weight </label>
          <div className='flex justify-between items-center'>
            <input
              value={weight}
              onChange={(e) => handleChange(e)}
              name='weight'
              type='number'
              placeholder='Enter Weight'
              className='w-[78%] h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md'
            />

            <select
              className={`h-10 w-[20%] mt-1 ${weightUnit.length > 0 ? "text-black" : "text-gray-400"
                } border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md`}
              name='weightUnit'
              value={weightUnit}
              onChange={(e) => handleChange(e)}
            >
              <option value={""} disabled>
                KG
              </option>
              <option>KG</option>
              <option>Pounds</option>
            </select>
          </div>
        </div>

        <div>
          <label className='text-black'> Height </label>
          <div className='flex justify-between items-center'>
            {heightUnit !== "Cms" && (
              <input
                value={
                  height ? (height.length > 0 ? height.split(".")[0] : "") : ""
                }
                onChange={(e) => handleChange(e)}
                name='height'
                type='number'
                placeholder='Ft.'
                className='w-[39%] h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md'
              />
            )}

            {heightUnit !== "Cms" && (
              <input
                value={inches}
                onChange={(e) => handleChange(e)}
                name='inches'
                type='number'
                placeholder='Inches'
                className='w-[38%] h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md'
              />
            )}

            {heightUnit === "Cms" && (
              <input
                value={height}
                onChange={(e) => handleChange(e)}
                name='height'
                type='number'
                placeholder='Cms.'
                className='w-[78%] h-5 mt-1 px-3 py-5 text-black bg-white border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md'
              />
            )}

            <select
              value={heightUnit}
              onChange={(e) => handleChange(e)}
              name='heightUnit'
              className={`h-10 w-[20%] mt-1 ${heightUnit.length > 0 ? "text-black" : "text-gray-400"
                }  border border-gray-400 outline-none focus:outline-none focus:ring-[#036231] focus:ring-1 rounded-md`}
            >
              <option value={""} disabled>
                Inches
              </option>
              <option>Inches</option>
              <option>Cms</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className='bg-[#036231] w-full text-white py-2 px-6 rounded-md'
      >
        Continue
      </button>
    </div>
  );
};

export default AddClientStep1;

// 100 kg - 136 pounds
// kg - 30 to 200
// pounds - 66 to 236
// g - 0 to 9

// ft - 3 to 8
// inches - 0 to 11

// cms
