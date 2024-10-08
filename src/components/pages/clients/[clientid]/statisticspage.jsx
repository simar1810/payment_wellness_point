import {
  BmiIcon,
  Calendericon,
  Editicon,
  FatIcon,
  MetabolismIcon,
  MusclesIcon,
  Shareicon,
  VisceralfatIcon,
  WeightIcon,
} from "@/components/svgs";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "chart.js/auto";
import React, { useRef, useEffect } from "react";

export default function Statisticspage({ healthMatrix }) {
  console.log("Statistics Page", healthMatrix);

  /*  function calculateBMI(weight, heightInFeet, inches) {
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

  const bmi = calculateBMI(weight, height, inches);
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
  console.log("Resting Metabolism Percentage:", restingMetabolismPercentage); */

  return (
    <div className=" h-full w-full p-3 overflow-scroll scrollbar-hide">
      <div className=" flex flex-col items-start gap-2 justify-between">
        <button className=" py-[6px] px-2 border-[2px] text-[14px] border-solid border-[#036231] text-[#036231] flex gap-3 rounded-md">
          <Calendericon h={20} w={20} />1 Jan 24
        </button>
        <div className=" flex gap-2">
          <div className=" flex gap-2">
            {/* <button className=" py-[6px] px-2 border-[2px] text-[14px] border-solid border-[#036231] text-[#036231] flex items-center gap-2 rounded-md">
            <Shareicon h={15} w={15} />
            Share
          </button>
          <button className=' py-[6px] px-2 border-[2px] text-[14px] border-solid border-[#036231] text-[#036231] flex items-center gap-2 rounded-md'>
            <Editicon h={14} w={14} c={"#036231"} /> Edit
          </button>{" "}
          */}
          </div>
        </div>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 w-full px-4">
          <Doughnutchart
            Value={23.4}
            Remainingvalue={100 - 23.4}
            Name={"BMI"}
            Unit={""}
            AdditionalText={"Healthy"}
            Child={<BmiIcon h={25} w={25} />}
            fontSize={25}
          />
          <Doughnutchart
            Value={50}
            Remainingvalue={100 - 50}
            Name={"Muscle"}
            Unit={"%"}
            Child={<MusclesIcon h={25} w={25} />}
            fontSize={20}
          />
          <Doughnutchart
            Value={30}
            Remainingvalue={100 - 30}
            Name={"Fat"}
            Unit={"%"}
            Child={<FatIcon h={30} w={30} />}
            fontSize={25}
          />
          <Doughnutchart
            Value={20}
            Remainingvalue={100 - 20}
            Name={"Metabolism"}
            Unit={"%"}
            Child={<MetabolismIcon h={30} w={30} />}
            fontSize={20}
          />
          <Doughnutchart
            Value={healthMatrix?.weight || 30}
            Remainingvalue={200 - healthMatrix?.weight}
            Name={"Weight"}
            Unit={healthMatrix?.weightUnit || "kg"}
            Child={<WeightIcon h={25} w={25} />}
            AdditionalText={healthMatrix?.ideal_weight + " kg"}
            fontSize={25}
          />
          <Doughnutchart
            Value={healthMatrix?.visceral_fat || 90}
            Remainingvalue={100 - healthMatrix?.visceral_fat}
            Name={"Visceral Fat"}
            Unit={"%"}
            Child={<VisceralfatIcon w={25} h={25} />}
            fontSize={25}
          />
        </div>
      </div>
    </div>
  );
}

export function Doughnutchart({
  Value,
  Remainingvalue,
  Name,
  Child,
  Unit,
  AdditionalText,
  fontSize,
}) {
  const chartRef = useRef(null);
  const data = {
    datasets: [
      {
        data: [Value, Remainingvalue],
        backgroundColor: ["#036231", "#69696926"],
        borderColor: ["#036231", "#69696926"],
        borderWidth: 1,
        weight: 10,
        borderRadius: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    hover: {
      mode: null,
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    cutout: "80%",
  };

  return (
    <div className=" w-full  rounded-lg bg-[#69696926] px-3 py-[6px]">
      <div className=" flex items-center justify-between ">
        <div>{Child}</div>
        <p className=" text-sm font-semibold">{Name}</p>
      </div>
      <div className="relative">
        <Doughnut ref={chartRef} data={data} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className={`font-bold text-[${fontSize}px]`}>
            {Value}
            {Unit}
          </p>
        </div>
        <p className="absolute left-1/2 bottom-[30%] transform -translate-x-1/2 text-[10px] text-[#3A4750]">
          {AdditionalText}
        </p>
      </div>
    </div>
  );
}
