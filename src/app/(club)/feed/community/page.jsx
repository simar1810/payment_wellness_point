"use client";
import { useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { PiUsersThree } from "react-icons/pi";
import apiInstance from "@/helpers/api";
import "swiper/css";
import "swiper/css/pagination";
import ShowFeeds from "@/components/pages/feed/ShowFeeds";

const FeedSection = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [feedsData, setFeedsData] = useState([]);
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("our");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchAllFeeds = async (tab = currentTab, pageNum = page) => {
    if (!hasMore) return;

    setLoading(true);
    try {
      console.log("fetchAllFeeds called with tab:", tab, "and page:", pageNum);
      const { data, status } = await apiInstance.getAllFeeds(tab, pageNum);
      if (status === 200) {
        console.log("fetchAllFeeds data:", data);
        setFeedsData((prev) => [...prev, ...(data?.data ?? [])]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("fetchAllFeeds error:", err);
      setHasMore(false);
    }
    setLoading(false);
  };

  const handleTabSwitch = (tab) => {
    console.log("handleTabSwitch called with tab:", tab);
    setCurrentTab(tab);
    setPage(1);
    setFeedsData([]);
    setHasMore(true);
    fetchAllFeeds(tab, 1);
  };

  return (
    <section>
      <div className="flex justify-between p-4 sticky w-full top-0 bg-white z-[1000]">
        <div className="flex gap-2 text-12 font-bold">
          <button
            className={`flex justify-center items-center py-2 px-4 gap-2 ${currentTab === "our"
                ? "bg-[#036231] text-white"
                : "bg-[#00000020] text-[#828282]"
              } rounded-[20px]`}
            onClick={() => handleTabSwitch("our")}
          >
            <PiUsersThree fontSize={25} />
            My Community
          </button>
          <button
            className={`flex justify-center items-center py-2 px-4 gap-2 ${currentTab === "global"
                ? "bg-[#036231] text-white"
                : "bg-[#00000020] text-[#828282]"
              } rounded-[20px]`}
            onClick={() => handleTabSwitch("global")}
          >
            <CiGlobe fontSize={25} />
            Global Community
          </button>
        </div>
        <button
          className="bg-[#036231] text-white text-[1rem] py-2 px-4 rounded-md"
          onClick={() => setIsUploadModalOpen(true)}
        >
          +New Post
        </button>
      </div>

      <ShowFeeds
        isUploadModalOpen={isUploadModalOpen}
        setIsUploadModalOpen={setIsUploadModalOpen}
        fetchAllFeeds={fetchAllFeeds}
        feedsData={feedsData}
        setFeedsData={setFeedsData}
        loading={loading}
        hasMore={hasMore}
      />

      {/*   <div className="flex flex-col justify-center items-center bg-f4f4f4 p-8">
        {feedsData.length === 0 ? (
          <div>No feeds Available</div>
        ) : (
          feedsData.map((item, index) => (
            <div className="mb-8 flex" key={index}>
              <div className="h-[595px] w-[500px]">
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

                <div className="flex justify-between bg-white p-3 border-t border-t-gray-300 rounded-b-md">
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

        {loading && <Loader />}
        <div ref={observerRef} />
      </div> */}
    </section>
  );
};

export default FeedSection;
