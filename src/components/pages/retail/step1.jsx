import { TextArea, TextInput, UploadImage } from "@/components/core/inputs";
import Image from "next/image";

const AddKitStep1 = ({
  setData,
  kitData,
  setKitData,
  isAddKitModalOpen,
  setIsAddKitModalOpen,
  setStep,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setKitData((prev) => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setKitData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prev) => [...prev, kitData]);
    setStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white w-full min-h-96 rounded-b-2xl px-6 py-6 flex flex-col justify-between gap-4'
    >
      {kitData?.image ? (
        <Image
          src={kitData?.image || ""}
          width={150}
          height={150}
          className='w-full h-52 rounded-md'
          alt='Product'
        />
      ) : (
        <UploadImage handleChange={handleChange} />
      )}
      <TextInput handleChange={handleChange} name='name' placeholder='Name'
        value={kitData.name}
      />
      <TextArea
        handleChange={handleChange}
        name='description'
        placeholder='Description'
        value={kitData.description}
      />
      <TextArea
        handleChange={handleChange}
        name='productDetails'
        placeholder='Product Details'
        value={kitData.productDetails}
      />
      <TextInput handleChange={handleChange} name='price' placeholder='Price'
        value={kitData.price}
      />
      <button
        type='submit'
        className='bg-[#036231] text-white rounded-md py-4 px-4'
      >
        Add Product
      </button>
    </form>
  );
};

export default AddKitStep1;
