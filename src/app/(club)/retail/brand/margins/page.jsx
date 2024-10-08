"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import apiInstance from "@/helpers/api";
import { setCheckout } from "@/redux/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Page = () => {
  const [selectedMargin, setSelectedMargin] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const brandId = searchParams.get("id");

  const brands = useSelector((state) => state.brand).brands;
  const brand = brands.find((brand) => brand._id === brandId);
  const margins = brand?.margins;
  console.log("margins => ", margins);

  const handleSelectMargin = () => {
    if (selectedMargin) {
      dispatch(setCheckout({ margin: selectedMargin }));
      router.push(
        `/retail/brand/clients?brandId=${brandId}&margin=${selectedMargin}`
      );
    } else {
      toast.error("Please select a margin");
    }
  };

  return (
    <div className='flex justify-center items-center h-screen px-10'>
      <div className='px-10  w-full bg-white rounded-2xl shadow-md max-w-[500px] py-10'>
        <h2 className='text-2xl font-bold mb-4'>Select a Margin</h2>
        <select
          id='margin'
          value={selectedMargin}
          onChange={(e) => setSelectedMargin(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded outline-none text-gray-400'
        >
          <option value=''>Select Margin</option>
          {margins?.map((margin) => (
            <option key={margin} value={margin}>
              {margin}
            </option>
          ))}
        </select>
        <button
          onClick={handleSelectMargin}
          className='w-full mt-4 bg-[#036231] text-white py-2 rounded-md'
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Page;
