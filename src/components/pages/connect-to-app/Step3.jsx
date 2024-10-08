import Image from "next/image";
import { useRouter } from "next/navigation";

const ConnectAppStep3 = () => {
  const router = useRouter();
  return (
    <>
      <div className='mb-0 text-center'>
        <h2 className='text-3xl font-bold text-[#036231] mt-4'>
          Welcome to the New and Enhanced WellnessZ Club
        </h2>
      </div>
      <div className='flex justify-center items-center'>
        <Image
          alt='Fitness Club Illustration'
          className='my-4'
          src='/Welcome-amico.png'
          width={380}
          height={350}
        />
      </div>
      <p className='text-md font-bold text-center text-gray-600 mb-6'>
        You are all set to go
      </p>
      <div>
        <button
          className='bg-[#036231] text-white w-full p-3 rounded-lg font-semibold'
          onClick={() => router.push("/app-dashboard")}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default ConnectAppStep3;
