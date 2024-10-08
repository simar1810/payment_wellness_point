"use client";
import Loader from "@/components/loader/Loader";
import apiInstance from "@/helpers/api";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { YtThumbnail } from "@/components/core";
import { compressFile } from "@/helpers/utils";

export default function UploadFeedPopup({
  isUploadModalOpen,
  setIsUploadModalOpen,
}) {
  const [isPostUploaded, setIsPostUploaded] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  // console.log("previewImages => ", previewImages);
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState("img");

  const [values, setValues] = useState({});
  const { caption, community, images, video } = values;
  console.log("values for uploading post => ", values);

  const onCloseHandler = () => {
    // setPreviewImg(null)
    setIsUploadModalOpen(false);
  };

  const handleChange = (e, key) => {
    if (key === "img") {
      // const file = e.target.files[0];
      // console.log("e.target.file => ", file);
      // const imageUrl = URL.createObjectURL(file);
      // setPreviewImg(imageUrl);
      // setValues((prev) => ({ ...prev, img: file }));

      const files = e.target.files;
      if (Object.keys(files).length > 5) {
        toast.error("More than 5 images are not allowed");
        return;
      }
      console.log("e.target.files => ", files);
      setPreviewImages(() =>
        (Object.keys(files) || []).map((file) =>
          URL.createObjectURL(files[file])
        )
      );
      setValues((prev) => ({ ...prev, images: files }));
    } else {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
    }
  };

  const handleSubmit = async () => {
    if (!images && contentType === "img") {
      toast.error("Please Upload Image");
      return;
    } else if (!video && contentType === "vid") {
      toast.error("Please Enter Video Link");
      return;
    } else if (!caption) {
      toast.error("Caption can not be empty");
      return;
    } else if (!community) {
      toast.error("Please select a community");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append("file", img);
      if (contentType === "img") {
        for (let i = 0; i < images.length; i++) {
          toast.loading("Compressing Image...");
          console.log("Befor Compressing => ", images[i]);
          const compressedFile = await compressFile(images[i]);
          console.log("compressedFile => ", compressedFile);
          toast.dismiss();
          formData.append(`file${i + 1}`, compressedFile);
          // formData.append(`file${i + 1}`, images[i]);
        }
      } else {
        formData.append("video", video);
      }

      formData.append("caption", caption);
      formData.append("type", community);
      formData.append("contentType", contentType);
      formData.append("person", "coach");
      formData.append("uploadedBy", "club-coach");

      const { data, status } = await apiInstance.uploadFeed(formData);

      if (status === 200) {
        console.log("response of uploadFeed => ", data);
        toast.success("Post Uploaded Successfully !");
        setIsPostUploaded(true);
      } else if (status === 413) {
        toast.error("Images size limit exceeds");
      }
    } catch (err) {
      console.log("Error while uploading post -> ", err);
      toast.error("Error while uploading post.");
    }
    setLoading(false);
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Modal
      open={isUploadModalOpen}
      onClose={onCloseHandler}
      className='flex items-center justify-center'
    >
      <div className='w-[30%] outline-none'>
        <div className='h-[2rem] bg-[#036231] flex items-center px-[2rem] py-[1.5rem] justify-end rounded-t-2xl'>
          <div className='text-white text-[1.3rem] flex items-center gap-[7rem]'>
            Create New Post
            <RxCross2 className='cursor-pointer' onClick={onCloseHandler} />
          </div>
        </div>
        {isPostUploaded ? (
          <div className='bg-white px-[2rem] py-[8rem] flex flex-col justify-center items-center rounded-b-2xl'>
            <Image
              src={"/postUploadedImg.svg"}
              alt='postUploadedImg'
              width={250}
              height={100}
            />
            Successfully Posted !!!
          </div>
        ) : (
          <div className='bg-white px-[2rem] py-[1rem] flex flex-col gap-4 justify-center items-center rounded-b-2xl'>
            <div className='flex self-start gap-2 text-[12px] font-bold'>
              <button
                className={`flex justify-center items-center py-2 px-4 gap-2 ${contentType === "img"
                    ? "bg-[#036231] text-white"
                    : "bg-[#00000020] text-[#828282]"
                  } rounded-[20px]`}
                onClick={() => setContentType("img")}
              >
                Images
              </button>
              <button
                className={`flex justify-center items-center py-2 px-4 gap-2 ${contentType === "vid"
                    ? "bg-[#036231] text-white"
                    : "bg-[#00000020] text-[#828282]"
                  } rounded-[20px]`}
                onClick={() => setContentType("vid")}
              >
                Video
              </button>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className='w-full flex flex-col gap-4'>
                {contentType === "img" && (
                  <div className='w-full flex justify-center'>
                    {previewImages && previewImages.length > 0 ? (
                      <Slider
                        {...settings}
                        dots={previewImages.length > 1}
                        className='w-full h-fit mb-4'
                      >
                        {previewImages.map((img, idx) => (
                          <div
                            key={idx}
                            className='flex justify-center items-center'
                          >
                            <Image
                              src={img ?? ""}
                              alt='previewImg'
                              width={150}
                              height={100}
                              className='self-center rounded-xl aspect-square'
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <label
                        htmlFor='image'
                        className='text-sm font-medium text-gray-700 border border-gray-400 w-full rounded-2xl h-[10rem] flex flex-col justify-center items-center gap-4 cursor-pointer'
                      >
                        <Image
                          src={"/uploadImgIcon.svg"}
                          alt='uploadImgIcon'
                          width={50}
                          height={100}
                        />
                        <p>Add Images</p>
                        {/* <p>(Upto 5)</p> */}
                      </label>
                    )}

                    <input
                      type='file'
                      id='image'
                      multiple
                      onChange={(e) => handleChange(e, "img")}
                      name='image'
                      className='hidden'
                    />
                  </div>
                )}

                {contentType === "vid" && (
                  <div>
                    <input
                      type='text'
                      onChange={(e) => handleChange(e, "video")}
                      value={video}
                      placeholder='Video Link'
                      className='w-full border-gray-400 border outline-none rounded-2xl p-[1rem]'
                    />
                  </div>
                )}

                {/* https://youtu.be/G_qNC8BZbXw?si=7pp2c-Yo4OGBKEWJ */}
                {contentType === "vid" && video && video.length > 0 && (
                  <div className='w-full flex justify-center items-center'>
                    <YtThumbnail url={video ?? ""} width={150} size='default' />
                  </div>
                )}

                <div>
                  <textarea
                    type='text'
                    onChange={(e) => handleChange(e, "caption")}
                    value={caption}
                    placeholder='Caption'
                    className='w-full border-gray-400 border outline-none rounded-2xl h-[4rem] p-[1rem]'
                  />
                </div>

                <div className='flex flex-col gap-3'>
                  <p className='font-bold'>Select Community</p>
                  <div className='border border-gray-400 w-full rounded-2xl flex flex-col justify-center items-center gap-4 p-[1rem]'>
                    <div className='flex justify-between w-full'>
                      <label
                        htmlFor='option1'
                        className='ml-2 text-gray-700 cursor-pointer'
                      >
                        Global Community
                      </label>
                      <input
                        type='radio'
                        id='option1'
                        name='options'
                        onChange={(e) => handleChange(e, "community")}
                        value='global'
                        checked={community === "global" ? true : false}
                        className='h-5 w-5 cursor-pointer'
                      //   className="h-5 w-5 accent-green-500 border-none outline-none checked:outline-none checked:border-none ring-transparent"
                      />
                    </div>

                    <div className='h-[1px] w-full bg-gray-400'></div>

                    <div className='flex justify-between w-full'>
                      <label
                        htmlFor='option2'
                        className='ml-2 text-gray-700 cursor-pointer'
                      >
                        Our Community
                      </label>
                      <input
                        type='radio'
                        id='option2'
                        name='options'
                        onChange={(e) => handleChange(e, "community")}
                        value='our'
                        checked={community === "our" ? true : false}
                        className='h-5 w-5 cursor-pointer'
                      //   className="h-5 w-5 accent-green-500 border-none outline-none checked:outline-none checked:border-none ring-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className='rounded-xl bg-[#036231] text-white py-[0.7rem]'
                  onClick={handleSubmit}
                >
                  Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
