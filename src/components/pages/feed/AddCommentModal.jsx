"use client";
import Loader from "@/components/loader/Loader";
import Spinner from "@/components/loader/Spinner";
import apiInstance from "@/helpers/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

export default function AddCommentModal({ setIsCommentModal, postId }) {
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const onCloseHandler = () => {
    setIsCommentModal(false);
  };

  const fetchComments = async () => {
    setCommentsLoading(true);
    // await new Promise((r) => setTimeout(r, 4000));
    try {
      const { data, status } = await apiInstance.loadComments(postId);
      if (status === 200) {
        console.log("data of fetching comments... -> ", data);

        setComments(data?.data);
      }
    } catch (err) {
      console.log("Error while fetching comments... -> ", err);
    }
    setCommentsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (!comment) {
      toast.error("Please enter comment");
      return;
    }

    setLoading(true);
    try {
      const { status } = await apiInstance.changeFeedActivity({
        person: "club-coach",
        postId,
        comment,
      });

      if (status === 200) {
        toast.success("Comment Added Successfully !");
        setComment("");
        fetchComments();
      }
    } catch (err) {
      console.log("Error while adding comment -> ", err);
      toast.error("Error while adding comment.");
    }
    setLoading(false);
  };

  return (
    <div
      className="w-[40rem] h-[550px] bg-white flex flex-col justify-between relative border-l border-t-gray-300
    "
    >
      <div className={`h-[25rem] mt-6 overflow-y-scroll scrollbar-hide`}>
        {/* <div className={`${commentsLoading || !comments || comments.length === 0 ? 'h-[28.4rem]' : 'h-[31.8rem]'} mt-12 overflow-y-scroll scrollbar-hide`}> */}
        {commentsLoading ? (
          <div>
            <Loader />
          </div>
        ) : !comments || comments.length === 0 ? (
          <div className="px-4 h-full flex justify-center items-center text-2xl">
            No comments Yet
          </div>
        ) : (
          comments.map((item, idx) => (
            <div
              key={idx}
              className={`flex gap-2 ${idx > 0 ? "mt-4" : ""} px-4 py-2`}
            >
              <div>
                <Image
                  src={
                    item?.userImage
                      ? item.userImage.length > 0
                        ? item.userImage
                        : "/profilePic.png"
                      : "/profilePic.png"
                  }
                  width={40}
                  height={40}
                  alt={item.userName + " dp"}
                  className="aspect-square"
                />
              </div>

              <div className="flex flex-col w-[90%]">
                <p className="font-bold">{item?.name ?? ""}</p>
                <p className="opacity-60 w-full">
                  {item?.comment
                    ? item.comment.length > 200
                      ? item.comment.slice(0, 200) + "..."
                      : item.comment
                    : ""}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="h-[3.9rem] border-t border-t-gray-300 border-l border-l-gray-300 flex justify-between items-center gap-2 px-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="outline-none border-none text-gray-500 w-full"
        />

        <button
          onClick={handleAddComment}
          className="text-[#4da8f7] font-[500] p-2"
        >
          {loading ? <Spinner /> : "Post"}
        </button>
      </div>

      <RxCross2
        className="text-[1.9rem] cursor-pointer absolute top-2 right-2"
        onClick={onCloseHandler}
      />
    </div>
  );
}
