import Image from "next/image";
import Link from "next/link";

function Meal({
  data,
  showAssign = true,
  selectedMeal = {},
  setSelectedMeal = () => { },
}) {
  return (
    <div
      className={`bg-white rounded-lg ${selectedMeal &&
        data?.meal_id &&
        selectedMeal?.meal_id === data?.meal_id &&
        "border-2 border-[#036231] "
        }`}
      onClick={() => setSelectedMeal(data)}
    >
      <div className="flex flex-col gap-3 w-full ">
        <Image
          src={data.image}
          alt={data.name}
          width={300}
          height={150}
          className="w-full h-56 object-cover rounded-t-lg"
        />
        <div className="flex justify-between items-center p-3 pb-5">
          <h1
            className={`text-sm font-semibold  ${showAssign ? " md:max-w-24 lg:max-w-40 " : ""
              }`}
          >
            {data.name} {/* {data?.mealType && `(${data.mealType})`} */}
          </h1>
          {showAssign && (
            <Link
              href={{
                pathname: `/recipes/${data?._id}`,
                query: {
                  mealTitle: data.name,
                },
              }}
              className="bg-[#036231] text-white text-sm rounded-md px-3 py-[6px] mt-2"
            >
              Assign Meal
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Meal;
