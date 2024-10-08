import { Backicon } from "@/components/svgs";
import { useRouter } from "next/navigation";

function RecipeHeader({
  text = "Meals",
  setIsAddMealKitModalOpen = false,
  setIsAddRecipeModalOpen = false,
  addModal = false,
}) {
  const router = useRouter();
  return (
    <div className=" w-full flex justify-between items-center p-3 pt-10 mb-10">
      <div>
        <div className=" flex gap-3 items-center">
          <button className="cursor-pointer" onClick={() => router.back()}>
            <Backicon h={20} w={20} c="#000" />
          </button>
          <p className=" font-semibold text-xl">{text}</p>
        </div>
      </div>
      {addModal && (
        <div className="flex gap-4">
          <button
            onClick={() => setIsAddMealKitModalOpen(true)}
            className=" h-[40px] px-4 bg-[#036231] rounded-md text-white font-medium flex items-center gap-1 outline-none focus:outline-none hover:bg-[#5a9c24] transition-all duration-200 ease-in-out"
          >
            <span className=" text-[25px]">+</span> Add Meal Kit
          </button>
          {/*  <button
            onClick={() => setIsAddRecipeModalOpen(true)}
            className=' h-[40px] px-4 bg-[#036231] rounded-md text-white font-medium flex items-center gap-1 outline-none focus:outline-none hover:bg-[#5a9c24] transition-all duration-200 ease-in-out'
          >
            <span className=' text-[25px]'>+</span> Add Meal
          </button> */}
        </div>
      )}
    </div>
  );
}

export default RecipeHeader;
