"use client";

import Filter from "@/components/pages/recipes/filter";
import RecipeHeader from "@/components/pages/recipes/header";
import Meal from "@/components/pages/recipes/meal";
import apiInstance from "@/helpers/api";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Page({ params, searchParams }) {
  const planId = params?.mealId;
  const mealTitle = searchParams?.mealTitle || "Meals";
  const [activeFilter, setActiveFilter] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        setLoading(true);
        const { data, status } = await apiInstance.getMealsById(planId);
        if (status === 200) {
          const meals = data.data.meals;
          setOriginalData(meals);
          setFilteredData(meals);
          const mealFilters = meals.map((meal) => meal.mealType);
          const uniqueMealTypes = [...new Set(mealFilters)];
          setFilters(uniqueMealTypes);
          if (uniqueMealTypes.length > 0) {
            setActiveFilter(uniqueMealTypes[0]);
          }
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Error fetching meals");
        setLoading(false);
      }
    }

    fetchMeals();
  }, [planId]);

  useEffect(() => {
    setFilteredData(
      originalData.filter((meal) => meal.mealType === activeFilter)
    );
  }, [activeFilter, originalData]);

  console.log("Filters ===>", filters);
  console.log("Active Filter ===>", activeFilter);
  console.log("Original Data ===>", originalData);
  console.log("Filtered Data ===>", filteredData);

  return (
    <section className="h-full w-full bg-[#f4f4f4] p-3">
      <div className="h-full w-full rounded-lg p-5 overflow-scroll scrollbar-hide ">
        <div className="w-full">
          <RecipeHeader text={mealTitle} addModal={false} />
        </div>
        <div className="w-full overflow-scroll scrollbar-hide">
          <Filter
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
        {loading ? (
          <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
        ) : filteredData.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mt-6">
            {filteredData?.map(
              (data, index) =>
                data &&
                data?.meals?.map((meal) => (
                  <Meal
                    key={index}
                    data={meal}
                    selectedMeal={selectedMeal}
                    showAssign={false}
                    setSelectedMeal={setSelectedMeal}
                  />
                ))
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-gray-500 text-lg">No Meals Found</p>
          </div>
        )}

        {filteredData.length !== 0 && (
          <div className="h-20 w-full flex justify-center items-center">
            <Link
              href={{
                pathname: `/recipes/${planId}/assign`,
                query: { planId },
              }}
              className="bg-[#036231] text-white text-lg rounded-xl px-10 py-2 mt-2 "
            >
              Assign Meal
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Page;
