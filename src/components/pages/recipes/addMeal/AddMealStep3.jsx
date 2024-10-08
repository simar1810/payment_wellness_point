import Image from "next/image";

const Step3 = ({ data, setIsAddMealModalOpen }) => {
  return (
    <div className='p-5 bg-white rounded-b-2xl min-h-96 flex flex-col justify-between'>
      <div className='flex flex-col justify-between items-center gap-4 px-[2rem] py-[2rem]'>
        <Image
          src={"/green-tick.svg"}
          alt='green-tick'
          width={100}
          height={100}
          className='aspect-square'
        />

        <p className='text-[#036231] bold text-[1.5rem]'>
          Meal Created Successfully
        </p>
        <br />
        <p className='text-center text-gray-400'>
          {data[data?.length - 1]?.name || ""}
        </p>
      </div>

      <button
        onClick={() => setIsAddMealModalOpen(false)}
        className='bg-[#036231] w-full text-white py-2 px-6 rounded-md mt-10'
      >
        Go Back
      </button>
    </div>
  );
};

export default Step3;
