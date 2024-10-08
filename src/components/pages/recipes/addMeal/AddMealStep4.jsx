import { useState } from "react";
import {
  TextArea,
  TextInput,
  TimePicker,
  UploadImage,
} from "../../../core/inputs";
import Image from "next/image";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";

const AddNewRecipe = ({ setMealData, setStep, setData }) => {
  const [loading, setLoading] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
    description: "",
    calories: "",
    image: null,
  });

  const addMeal = async (formData) => {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.addMeal(formData);
      console.log(data);
      if (status === 200) {
        toast.success("Meal added successfully");
        setStep(5);
        /*    setMealData((prev) => [
         ...prev,
          {
            ...newMeal,
            image: ,
          },
        ]); */
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error adding meal");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewMeal((prev) => ({
        ...prev,
        image: {
          file: files[0],
          preview: URL.createObjectURL(files[0]),
        },
      }));
    } else {
      setNewMeal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const keys = ["name", "description", "calories", "image"];
    for (const key of keys) {
      if (!newMeal[key] || newMeal[key].length === 0) {
        toast.error(`${key} is required`);
        return;
      }
    }
    /*     setMealData((prev) => [
      ...prev,
      {
        ...newMeal,
        image: newMeal.image.file,
      },
    ]); */
    const formData = new FormData();
    formData.append("file", newMeal.image.file);
    formData.append("name", newMeal.name);
    formData.append("description", newMeal.description);
    formData.append("calories", newMeal.calories);
    formData.append("person", "club-coach");

    addMeal(formData);
  };

  return (
    <div className='bg-white p-5 rounded-b-2xl'>
      <form
        className='flex flex-col justify-between items-center gap-4 min-h-96 max-h-[500px] overflow-scroll scrollbar-hide relative'
        onSubmit={handleSubmit}
      >
        {newMeal?.image ? (
          <Image
            src={newMeal?.image.preview}
            alt='Uploaded Image'
            width={150}
            height={150}
            className='w-full h-52 rounded-md'
          />
        ) : (
          <UploadImage handleChange={handleChange} />
        )}
        <TextInput
          name='name'
          placeholder='Name'
          handleChange={handleChange}
          value={newMeal.name}
        />
        <TextArea
          name='description'
          placeholder='Description'
          handleChange={handleChange}
          value={newMeal.description}
        />

        <TextInput
          name='calories'
          placeholder='Calories'
          handleChange={handleChange}
          value={newMeal.calories}
        />
        <button
          type='submit'
          className='bg-[#036231] text-white rounded-lg p-2 py-3 px-4'
        >
          {loading ? (
            <div className='flex-col gap-4 w-full flex items-center justify-center py-[3px]'>
              <div className='w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full'></div>
            </div>
          ) : (
            "Add Meal"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddNewRecipe;
