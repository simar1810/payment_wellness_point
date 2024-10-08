import { Modal } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TextArea, TextInput, UploadImage } from "../../core/inputs";
import toast from "react-hot-toast";
import apiInstance from "@/helpers/api";
import { compressFile } from "@/helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { resetMealKit, setMealKit } from "@/redux/slices/mealKitSlice";

const AddMealKitPopup = ({
  data,
  setData,
  isAddMealKitModalOpen,
  setIsAddMealKitModalOpen,
  setIsAddMealModalOpen,
}) => {
  const mealKitdata = useSelector((state) => state.mealKit.mealKit);

  const [mealKitData, setMealKitData] = useState({
    image: {
      preview: "",
      file: mealKitdata?.image || null,
    },
    name: mealKitdata?.name || "",
    description: mealKitdata?.description || "",
    meals: [],
  });
  const dispatch = useDispatch();

  const onCloseHandler = () => {
    setIsAddMealKitModalOpen(false);
    setData((prev) => prev.slice(0, -1));
    dispatch(resetMealKit());
  };

  console.log("Data in kit ==> ", mealKitdata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keys = ["image", "name"];
    for (const key of keys) {
      if (key === "image" && !mealKitData[key].file) {
        toast.error("Image is required");
        return;
      }
      if (!mealKitData[key]) {
        toast.error(`${key} is required`);
        return;
      }
    }
    dispatch(
      setMealKit({
        ...mealKitData,
        image: mealKitData.image.file,
      })
    );
    setIsAddMealKitModalOpen(false);
    setIsAddMealModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setMealKitData((prev) => ({
        ...prev,
        image: {
          preview: URL.createObjectURL(e.target.files[0]),
          file: e.target.files[0],
        },
      }));
    } else {
      setMealKitData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const generatePreviewImage = (image) => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return "";
  };

  return (
    <Modal
      open={isAddMealKitModalOpen}
      onClose={setIsAddMealKitModalOpen}
      className="flex items-center justify-center"
    >
      <div className="w-[90%] md:w-[50%] lg:w-[30%]  outline-none">
        <div className="h-[2rem] bg-[#036231] flex items-center p-[2rem] justify-center rounded-t-2xl">
          <div className="text-white text-[1.3rem] flex justify-center items-center relative w-full">
            Create Meal Kit
            <button
              className="cursor-pointer absolute right-0"
              onClick={onCloseHandler}
            >
              <RxCross2 />
            </button>
          </div>
        </div>
        <form
          className="bg-white w-full min-h-96 rounded-b-2xl px-6 py-8 flex flex-col justify-between gap-20"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <div>
              {!mealKitData?.image?.preview && mealKitData?.image?.file ? (
                <Image
                  src={generatePreviewImage(mealKitData?.image?.file)}
                  alt="Uploaded Image"
                  width={150}
                  height={150}
                  className="w-full h-52 rounded-md"
                />
              ) : mealKitData?.image?.preview ? (
                <Image
                  src={mealKitData?.image?.preview}
                  alt="Uploaded Image"
                  width={150}
                  height={150}
                  className="w-full h-52 rounded-md object-cover"
                />
              ) : (
                <UploadImage handleChange={handleChange} />
              )}
            </div>
            <div>
              <TextInput
                handleChange={handleChange}
                name="name"
                placeholder="Name"
                value={mealKitData.name}
              />
            </div>
            <div>
              <TextArea
                handleChange={handleChange}
                name="description"
                placeholder="Description"
                value={mealKitData.description}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#036231] text-white rounded-md p-3"
          >
            Add Meals
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddMealKitPopup;
