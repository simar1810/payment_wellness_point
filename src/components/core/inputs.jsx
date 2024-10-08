import { Searchicon } from "@/components/svgs";
import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import { useRef, useState } from "react";

export const SearchInput = ({ searchInput, handleSearchChange }) => {
  return (
    <div className='flex gap-3 items-center rounded-lg p-2 py-4 mb-3 bg-[#f4f4f4]'>
      <Searchicon w={20} h={20} />
      <input
        type='search'
        placeholder='Search Meals'
        className='w-full bg-[#f4f4f4] outline-none'
        value={searchInput}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
};

export const UploadImage = ({ handleChange }) => {
  return (
    <>
      <input
        type='file'
        name='image'
        id='image'
        className='hidden'
        accept='image/*'
        onChange={(e) => handleChange(e)}
      />
      <label
        htmlFor='image'
        className='flex flex-col items-center justify-center cursor-pointer min-h-[150px] border-2 border-gray-300 rounded-md w-full'
      >
        <div className='flex flex-col items-center'>
          <Image
            src='/uploadImgIcon.svg'
            width={40}
            height={40}
            className='mb-2'
            alt='Upload Image Icon'
          />
          <p className='text-gray-400'>Add Image</p>
        </div>
      </label>
    </>
  );
};

export const TextInput = ({ handleChange, value = "", name, placeholder }) => {
  return (
    <input
      type='text'
      name={name}
      placeholder={placeholder}
      className='w-full border-2 border-gray-300 rounded-md p-3 outline-none'
      onChange={(e) => handleChange(e)}
      value={value}
    />
  );
};

export const TextArea = ({ handleChange, value = "", name, placeholder }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      className='w-full border-2 border-gray-300 rounded-md p-3 outline-none min-h-24'
      onChange={(e) => handleChange(e)}
      value={value}
    />
  );
};

export const TimePicker = ({ name, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleTimeChange = (e) => {
    onChange({
      target: {
        name,
        value: e.target.value,
      },
    });
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <input
        type='text'
        name={name}
        value={value}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className='w-full border-2 border-gray-300 rounded-md p-3 outline-none'
        placeholder={placeholder ?? "Time to Eat"}
      />
      {isOpen && (
        <div className='absolute mt-2 w-full bg-white shadow-lg rounded z-50'>
          <input
            type='time'
            value={value}
            onChange={handleTimeChange}
            className='p-2 border rounded w-full outline-none'
          />
        </div>
      )}
    </div>
  );
};

export const DatePicker = ({ name, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDateChange = (e) => {
    onChange({
      target: {
        name,
        value: e.target.value,
      },
    });
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <input
        type='text'
        name={name}
        value={value}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className='w-full border-2 border-gray-300 rounded-md p-3 outline-none'
        placeholder={placeholder ?? "Time to Eat"}
      />
      {isOpen && (
        <div className='absolute mt-2 w-full bg-white shadow-lg rounded z-50'>
          <input
            type='date'
            value={value}
            onChange={handleDateChange}
            className='p-2 border rounded w-full outline-none'
          />
        </div>
      )}
    </div>
  );
};

export const OnboardingFormInput = ({ ...props }) => {
  const { title, value, handleChange, placeholder } = props;
  return (
    <div>
      <p className=' text-lg font-semibold '>{title}</p>
      <input
        type='text'
        value={value}
        className=' h-[50px] w-full border-[1px] border-[#00000060] border-solid text-lg  rounded-xl outline-none mt-1 px-4 '
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
