import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { YtPlayer } from "@/components/core";
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { FaBookmark } from "react-icons/fa";
import AddCommentModal from "./AddCommentModal";
import Spinner from "@/components/loader/Spinner";
import UploadFeedPopup from "./UploadFeedPopup";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const ShowFeeds = ({
  isUploadModalOpen,
  setIsUploadModalOpen,
  fetchAllFeeds,
  feedsData,
  setFeedsData,
  loading,
  hasMore,
}) => {
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [commentModalIdx, setCommentModalIdx] = useState(-1);

  const observerRef = useRef(null);
  console.log(hasMore);

  useEffect(() => {
    const debounceFetchAllFeeds = debounce(fetchAllFeeds, 300);
    debounceFetchAllFeeds();
  }, []);

  useEffect(() => {
    const handleIntersect = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading && hasMore) {
        console.log("Intersecting");

        const debounceFetchAllFeeds = debounce(fetchAllFeeds, 300);
        debounceFetchAllFeeds();
      }
    };

    const observer = new IntersectionObserver(handleIntersect);
    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, fetchAllFeeds, hasMore]);

  const handleLikeSave = async (flag = true, idx, field, postId) => {
    const feedsDataClone = [...feedsData];
    feedsDataClone[idx][field] = flag;
    setFeedsData(feedsDataClone);

    try {
      const activityObj = {
        isLikedByMe: "like",
        isSavedByMe: "save",
      };

      await apiInstance.changeFeedActivity({
        person: "club-coach",
        postId,
        [activityObj[field]]: flag,
      });
    } catch (err) {
      console.error("Error in changeFeedActivity:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-f4f4f4 p-8">
        {feedsData.length === 0 ? (
          <div>No feeds Available</div>
        ) : (
          feedsData.map((item, index) => (
            <div className="mb-20 flex" key={index}>
              <div className="h-[550px] w-[500px] bg-white flex flex-col justify-between">
                <div className="flex justify-between bg-white px-3 py-2 rounded-t-md">
                  <div className="flex justify-center items-center gap-2">
                    <Image
                      src={item?.userImg || "/profilePic.png"}
                      width={40}
                      height={40}
                      alt={`${item.userName} dp`}
                      className="aspect-square"
                    />
                    {item?.userName || "N/A"}
                  </div>
                </div>

                {item?.contentType === "img" ? (
                  item?.images?.length > 0 ? (
                    <Swiper
                      pagination={{ dynamicBullets: true }}
                      modules={[Pagination]}
                      className="h-96 w-[500px]"
                    >
                      {item.images.map((image, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="flex h-full w-full justify-center items-center bg-white">
                            <Image
                              src={image}
                              width={250}
                              height={100}
                              alt={`postImg-${idx + 1}`}
                              className="block object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div>Image Not Available</div>
                  )
                ) : (
                  <YtPlayer url={item?.video} />
                )}

                <div className="flex justify-between bg-white p-3 pt-5 border-t border-t-gray-300 rounded-b-md">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        handleLikeSave(
                          !item.isLikedByMe,
                          index,
                          "isLikedByMe",
                          item.postId
                        )
                      }
                    >
                      {item.isLikedByMe ? (
                        <FcLike fontSize={29} />
                      ) : (
                        <GoHeart fontSize={29} />
                      )}
                    </button>
                    <Image
                      src="/comment.svg"
                      width={23}
                      height={22}
                      alt="comment"
                      className="cursor-pointer"
                      onClick={() => {
                        setIsCommentModal(true);
                        setCommentModalIdx(index);
                      }}
                    />
                  </div>

                  <button
                    onClick={() =>
                      handleLikeSave(
                        !item.isSavedByMe,
                        index,
                        "isSavedByMe",
                        item.postId
                      )
                    }
                  >
                    {item.isSavedByMe ? (
                      <FaBookmark fontSize={25} />
                    ) : (
                      <Image
                        src="/save.svg"
                        width={19}
                        height={24}
                        alt="save"
                      />
                    )}
                  </button>
                </div>
              </div>
              {isCommentModal && commentModalIdx === index && (
                <AddCommentModal
                  setIsCommentModal={setIsCommentModal}
                  postId={item?.postId}
                />
              )}
            </div>
          ))
        )}

        {loading && <Spinner color="green" />}
        <div ref={observerRef} />
      </div>
      {isUploadModalOpen && (
        <UploadFeedPopup
          isUploadModalOpen={isUploadModalOpen}
          setIsUploadModalOpen={setIsUploadModalOpen}
        />
      )}
    </>
  );
};

export default ShowFeeds;
