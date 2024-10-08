import { SearchInput } from "@/components/core/inputs";
import apiInstance from "@/helpers/api";
import { debounce, set } from "lodash";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Step2 = ({ setMealsData, setStep, editingIndex }) => {
  console.log(editingIndex, "step 2");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchInput);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = async (search) => {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getMeal(search);
      if (status === 200) {
        setMeals(data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching meals");
      setLoading(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedValue(value);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  useEffect(() => {
    if (debouncedValue) {
      fetchMeals(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className='p-5 bg-white rounded-b-2xl'>
      <div className='flex flex-col justify-between min-h-96 max-h-[500px] overflow-scroll scrollbar-hide relative'>
        <div>
          <SearchInput
            handleSearchChange={handleSearchChange}
            searchInput={searchInput}
          />
          {loading ? (
            <div className='flex-col gap-4 w-full flex items-center justify-center py-[3px] min-h-52'>
              <div className='w-10 h-10 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
            </div>
          ) : (
            <>
              {!searchInput && meals.length === 0 && (
                <div className='rounded-lg p-2 py-8 mb-3 text-center'>
                  <button
                    className='text-[#036231] font-semibold bg-[#e1f2d4] rounded-md p-2 px-4 mb-4'
                    onClick={() => setStep(4)}
                  >
                    Add Your Own Meal
                  </button>
                </div>
              )}
              {searchInput && meals.length === 0 ? (
                <div className='border border-gray-300 rounded-lg p-2 py-4 mb-3 text-center'>
                  <p className='font-semibold'>No meals found</p>
                  <hr className='my-5' />
                  <button
                    className='text-[#036231] font-semibold bg-[#e1f2d4] rounded-md p-2 px-4 mb-4'
                    onClick={() => setStep(4)}
                  >
                    Add New Recipe
                  </button>
                </div>
              ) : (
                searchInput &&
                meals.map((meal) => (
                  <div
                    key={meal.meal_id}
                    className={`flex flex-col gap-3 items-center border rounded-lg p-2 py-4 mb-3 cursor-pointer ${meal.meal_id === selectedMeal?.meal_id &&
                      "border-2 border-[#036231]"
                      } `}
                    onClick={() => {
                      setSelectedMeal(meal);
                    }}
                  >
                    <Image
                      src={meal.image}
                      width={100}
                      height={100}
                      className='h-56 w-full'
                      alt='Meal Image'
                    />
                    <p className='self-start'>{meal.name}</p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
        {selectedMeal && (
          <button
            className='bg-[#036231] text-white rounded-md p-2 w-full sticky bottom-0 '
            onClick={() => {
              setMealsData((prev) => {
                const newMealsData = [...prev];
                newMealsData[editingIndex?.groupIndex].meals[
                  editingIndex?.mealIndex
                ] = {
                  ...selectedMeal,
                  mealTiming:
                    prev[editingIndex?.groupIndex].meals[
                      editingIndex?.mealIndex
                    ].mealTiming,
                  instructions:
                    prev[editingIndex?.groupIndex].meals[
                      editingIndex?.mealIndex
                    ].instructions,
                };
                return newMealsData;
              });
              setSelectedMeal(null);
              setStep(1);
            }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2;
