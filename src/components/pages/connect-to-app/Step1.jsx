import Image from "next/image";

const ConnectAppStep1 = ({ setStep }) => {
  return (
    <>
      <div className='mb-0 text-center'>
        <h2 className='text-3xl font-bold text-[#036231]'>
          Your Best Fitness Club
        </h2>
        <p className='text-3xl font-bold text-[#036231]'>Just Got Better</p>
      </div>
      <div className='mb-6 flex justify-between items-center my-10'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900 underline decoration-[#036231] decoration-2 underline-offset-8 mb-6'>
            Whats New?
          </h3>
          <ul className='list-disc pl-5 text-gray-700 font-semibold flex flex-col gap-2'>
            <li>All Mobile Features</li>
            <li>App and Club Sync all at a single place</li>
            <li>Enhance Security</li>
            <li>New Features</li>
          </ul>
        </div>
        <Image
          alt='Fitness Club Illustration'
          className='my-4'
          src='/Business merger-cuate.png'
          width={350}
          height={350}
        />
      </div>
      <p className='text-md font-bold text-center text-gray-600 mb-6 mt-2'>
        Connect WellnessZ Club with app for enhanced Experience
      </p>
      <div>
        <button
          className='bg-[#036231] text-white w-full p-3 rounded-lg font-semibold'
          onClick={() => setStep(2)}
        >
          Connect Now
        </button>
      </div>
    </>
  );
};

export default ConnectAppStep1;
