const { default: Image } = require("next/image");

const Page = () => {
  return (
    <div className='min-h-[100vh] bg-[#f4f4f4] p-10 flex justify-center items-center'>
      <div className='bg-white min-h-[550px] w-full shadow-lg p-6 flex flex-col justify-center items-center rounded-lg'>
        <Image
          src='/Worktime-rafiki.png'
          alt='Coming Soon'
          width={300}
          height={300}
        />
        <div className='text-center mt-4'>
          <h1 className='text-3xl font-bold text-[#036231]'>Coming Soon</h1>
          <p className='text-[#575757] mt-2'>
            Stay tuned with us to revolutionise your fitness Journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
