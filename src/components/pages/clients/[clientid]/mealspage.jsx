import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon, Ingridienticon } from "@/components/svgs";
import Loader from "@/components/loader/Loader";
import apiInstance from "@/helpers/api";
import toast from "react-hot-toast";

export default function Mealspage({ clientId }) {
  const [loading, setLoading] = useState(false);

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchClientMeals = async () => {
      setLoading(true);
      // await new Promise((r) => setTimeout(r, 5000));
      try {
        const { data, status } = await apiInstance.getClientMealPlans(clientId);

        if (status === 200) {
          console.log("response of fetch ClientMeals => ", data);
          setMeals(data?.data[0]?.meals[0]?.meals || []);
        }
      } catch (err) {
        console.log("err in fetch ClientMeals api => ", err);
        toast.error("Error while fetching meals of client !");
      }
      setLoading(false);
    };
    fetchClientMeals();
  }, [clientId]);

  if (loading) {
    return <Loader />;
  }
  if (!meals || meals.length === 0) {
    return (
      <div className="flex justify-center items-center mt-6">No Meals Yet</div>
    );
  }

  return (
    <div className=" h-full w-full p-5">
      <div className=" w-full grid grid-cols-1 md:grid-cols-2  gap-5 ">
        {meals.map((meal, idx) => (
          <Meal key={idx} meal={meal} />
        ))}
      </div>
    </div>
  );
}

function Meal({ meal }) {
  const { image, name, meal_time, description } = meal || {};

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] pb-5">
      <Image
        src={!image || image.length === 0 ? "" : image}
        width={0}
        height={0}
        unoptimized
        alt="mealImg"
        className=" h-[200px] w-full object-cover"
      />
      <p className=" font-semibold text-[18px] px-3 py-2 h-[70px]">
        {name || ""}
      </p>
      {/* <div className=" flex gap-2 px-3 py-1">
        <div className=" flex items-center gap-1">
          <ClockIcon h={20} w={20} />
          <p className=" font-medium text-sm text-[#959595]">20 minutes</p>
        </div>
        <div className=" flex items-center gap-1 ">
          <Ingridienticon h={20} w={20} />
          <p className=" font-medium text-[#959595] text-sm">8 Ingridients</p>
        </div>
      </div> */}
      {/* <div className=" h-[1px] w-full bg-[#d6d5d5] my-1"></div> */}
    </div>
  );
}
