"use client";
import AddMealPopup from "@/components/pages/recipes/addMeal";
import AddMealKitPopup from "@/components/pages/recipes/addMealKitPopup";
import RecipeHeader from "@/components/pages/recipes/header";
import Meal from "@/components/pages/recipes/meal";
import apiInstance from "@/helpers/api";
import { compressFile } from "@/helpers/utils";
import { resetMealKit } from "@/redux/slices/mealKitSlice";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function Page() {
  const [isAddMealKitModalOpen, setIsAddMealKitModalOpen] = useState(false);
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const mealKit = useSelector((state) => state.mealKit.mealKit);
  const dispatch = useDispatch();

  const fetchMealKits = async () => {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getMealKits();
      if (status === 200) {
        setData(data.data);
        setFetchData(data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching meals");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealKits();
  }, []);

  const fetchImageUrl = async (file) => {
    try {
      // console.log("original file => ", file);
      const compressing = toast.loading("Compressing Image...");
      const compressedFile = await compressFile(file);
      // console.log("compressed file => ", compressedFile);
      toast.dismiss(compressing);

      const formData = new FormData();
      formData.append("file", compressedFile);
      // formData.append("file", compressedFile);

      // const { data, status } = await apiInstance.uploadImage(formData);
      // console.log("formData => ", formData);
      const { data, status } = await apiInstance.uploadFile(formData);
      // console.log(data);
      if (status === 200) {
        return data.img;
      }
      return "";
    } catch (err) {
      console.log(err);
      toast.error("Error uploading image");
    }
  };

  const addMealKit = async (setStep, step) => {
    try {
      const kitImageUrl = await fetchImageUrl(mealKit.image);
      console.log("Main kit data ===> ", {
        ...mealKit,
        image: kitImageUrl ?? "",
        person: "club-coach",
      });
      console.log("kitImageUrl => ", kitImageUrl);
      const { data, status } = await apiInstance.createMealPlan({
        ...mealKit,
        image: kitImageUrl ?? "",
        person: "club-coach",
      });
      console.log(data, status);
      if (status === 200) {
        toast.success("Meal Plan created successfully");
        fetchMealKits();
        dispatch(resetMealKit());
        setStep(step);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Error creating meal plan");
    }
  };

  return (
    <section className=" h-full w-full bg-[#f4f4f4] p-3 ">
      <div className=" h-full w-full rounded-lg p-5 overflow-scroll scrollbar-hide">
        <div className=" w-full">
          <RecipeHeader
            text="Meals"
            setIsAddMealKitModalOpen={setIsAddMealKitModalOpen}
            setIsAddRecipeModalOpen={setIsAddMealModalOpen}
            addModal={true}
          />
        </div>
        {loading ? (
          <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] min-h-52">
            <div className="w-10 h-10 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
          </div>
        ) : fetchData.length > 0 ? (
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mt-6 ">
            {fetchData
              .sort((a, b) => parseInt(b.id) - parseInt(a.id))
              .map((data, index) => (
                <Meal key={index} data={data} showAssign={true} />
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-gray-500 text-lg">No Meals Found</p>
          </div>
        )}
      </div>

      {isAddMealKitModalOpen && (
        <AddMealKitPopup
          data={Data}
          setData={setData}
          isAddMealKitModalOpen={isAddMealKitModalOpen}
          setIsAddMealKitModalOpen={setIsAddMealKitModalOpen}
          setIsAddMealModalOpen={setIsAddMealModalOpen}
          addMealKit={addMealKit}
        />
      )}

      {isAddMealModalOpen && (
        <AddMealPopup
          data={Data}
          setData={setData}
          isAddMealModalOpen={isAddMealModalOpen}
          setIsAddMealModalOpen={setIsAddMealModalOpen}
          setIsAddMealKitModalOpen={setIsAddMealKitModalOpen}
          addMealKit={addMealKit}
        />
      )}
    </section>
  );
}

export default Page;
