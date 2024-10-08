import Image from "next/image";
import React, { useState } from "react";
import { Doughnutchart } from "../[clientid]/statisticspage";
import {
  BmiIcon,
  FatIcon,
  MetabolismIcon,
  MusclesIcon,
  VisceralfatIcon,
  WeightIcon,
} from "@/components/svgs";

const AddClientStep3 = ({ setStep, clientData }) => {
  // console.log("clientData of step-3 => ", clientData);

  const {
    name,
    age,
    gender = "",
    weight,
    weightUnit,
    inches,
    heightUnit,
    bodyComposition = "",
    visceral_fat,
  } = clientData;

  let height = clientData?.height ?? "N/A";
  if (heightUnit === "Inches") height = height[0] + " Feet " + inches;

  const handleSubmit = () => {
    setStep((prev) => prev + 1);
  };

  function calculateBMI(weight, heightInFeet, inches) {
    const weightInKg = parseFloat(weight);
    const totalInches = parseInt(heightInFeet) * 12 + parseInt(inches);
    const heightInMeters = totalInches * 0.0254; // Convert inches to meters
    return weightInKg / (heightInMeters * heightInMeters);
  }

  function calculateMusclePercentage(bodyComposition) {
    if (bodyComposition === "high") {
      return 80;
    } else if (bodyComposition === "medium") {
      return 60;
    } else {
      return 40;
    }
  }

  function calculateFatPercentage(musclePercentage) {
    return 100 - musclePercentage;
  }

  function calculateRestingMetabolismPercentage(
    age,
    gender,
    weight,
    heightInFeet,
    inches
  ) {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseInt(heightInFeet) * 30.48 + parseInt(inches) * 2.54;

    let bmr;
    if (gender.toLowerCase() === "male") {
      bmr = 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * age;
    }

    return (bmr / 2000) * 100;
  }

  function calculateIdealWeight(
    weight,
    heightInFeet,
    inches,
    weightUnit,
    heightUnit
  ) {
    const idealBMI = 23.0;
    let heightInMeters;

    if (heightUnit.toLowerCase() === "cms") {
      heightInMeters = heightInFeet / 100.0;
    } else if (heightUnit.toLowerCase() === "inches") {
      heightInMeters = (heightInFeet * 12 + inches) * 0.0254;
    } else {
      throw new Error('Invalid height unit. Use "cms" or "inches".');
    }

    let idealWeight = idealBMI * heightInMeters * heightInMeters;

    if (weightUnit.toLowerCase() === "pounds") {
      idealWeight *= 2.20462;
    }

    return Math.round(idealWeight);
  }

  const bmi = calculateBMI(weight, clientData.height, inches);
  console.log("BMI:", bmi);

  const musclePercentage = calculateMusclePercentage(bodyComposition);
  console.log("Muscle Percentage:", musclePercentage);

  const fatPercentage = calculateFatPercentage(musclePercentage);
  console.log("Fat Percentage:", fatPercentage);

  const restingMetabolismPercentage = calculateRestingMetabolismPercentage(
    age,
    gender,
    weight,
    clientData.height,
    inches
  );
  console.log("Resting Metabolism Percentage:", restingMetabolismPercentage);

  const idealWeight = calculateIdealWeight(
    weight,
    clientData.height,
    inches,
    weightUnit,
    heightUnit
  );
  console.log("Ideal Weight:", idealWeight);

  return (
    <div className="bg-white p-[2rem] flex flex-col justify-between items-center rounded-b-2xl gap-1  max-h-[550px] overflow-scroll scrollbar-hide">
      <div className="self-start w-[60%] flex gap-2">
        <div>
          <p className="opacity-40">Name :</p>
          <p className="opacity-40">Gender :</p>
          <p className="opacity-40">Age :</p>
          <p className="opacity-40">Body Type :</p>
          <p className="opacity-40">Weight :</p>
          <p className="opacity-40">Height :</p>
        </div>

        <div>
          <p>{name ?? "N/A"}</p>
          <p>{gender ? gender[0].toUpperCase() + gender.slice(1) : "N/A"}</p>
          <p>{age ?? "N/A"}</p>
          <p>
            {bodyComposition
              ? bodyComposition[0].toUpperCase() + bodyComposition.slice(1)
              : "N/A"}
          </p>
          <p>
            {weight ?? "N/A"} {weightUnit ?? ""}
          </p>
          <p>
            {height ?? "N/A"} {heightUnit ?? ""}
          </p>
        </div>
      </div>

      <div className="self-start mt-6 bg-black h-[1px] w-[70%] opacity-25"></div>

      <div className=" grid grid-cols-2  lg:grid-cols-3 gap-3 mt-2">
        <Doughnutchart
          Value={bmi.toFixed(1)}
          Remainingvalue={100 - bmi}
          Name={"BMI"}
          Unit={""}
          AdditionalText={"Healthy"}
          Child={<BmiIcon h={25} w={25} />}
        />
        <Doughnutchart
          Value={musclePercentage}
          Remainingvalue={100 - musclePercentage}
          Name={"Muscle"}
          Unit={"%"}
          Child={<MusclesIcon h={25} w={25} />}
        />
        <Doughnutchart
          Value={fatPercentage}
          Remainingvalue={100 - fatPercentage}
          Name={"Fat"}
          Unit={"%"}
          Child={<FatIcon h={30} w={30} />}
        />
        <Doughnutchart
          Value={restingMetabolismPercentage.toFixed(1)}
          Remainingvalue={100 - restingMetabolismPercentage}
          Name={"Metabolism"}
          Unit={"%"}
          Child={<MetabolismIcon h={30} w={30} />}
        />
        <Doughnutchart
          Value={weight}
          Remainingvalue={200 - weight}
          Name={"Weight"}
          Unit={"kg"}
          Child={<WeightIcon h={25} w={25} />}
          AdditionalText={`Ideal ${75}kg`}
        />
        <Doughnutchart
          Value={visceral_fat ? visceral_fat : "0"}
          Remainingvalue={100 - 90}
          Name={"Visceral Fat"}
          Unit={"%"}
          Child={<VisceralfatIcon w={25} h={25} />}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-[#036231] w-full mt-8 text-white py-2 px-6 rounded-md"
      >
        Continue
      </button>
    </div>
  );
};

export default AddClientStep3;
