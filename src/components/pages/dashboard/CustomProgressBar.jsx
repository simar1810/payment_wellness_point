const CustomProgressBar = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className='w-full bg-gray-300  rounded-lg overflow-hidden'>
      <div
        className='h-4 bg-[#036231] transition-width duration-300'
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default CustomProgressBar;
