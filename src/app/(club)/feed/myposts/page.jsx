"use client";
import { useState } from "react";
import apiInstance from "@/helpers/api";
import { Backicon } from "@/components/svgs";
import { useRouter } from "next/navigation";
import ShowFeeds from "@/components/pages/feed/ShowFeeds";

export default function MyPosts() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [feedsData, setFeedsData] = useState([]);
  const [page, setPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchAllFeeds = async () => {
    if (!hasMore) {
      return;
    }

    setLoading(true);
    try {
      const { data, status } = await apiInstance.getMyPosts(page);
      console.log("fetch All Feeds response => ", data);
      if (status === 200) {
        setFeedsData((prev) => [...prev, ...(data?.data?.myPosts ?? [])]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("fetch All Feeds error => ", err);
      setHasMore(false);
      // toast.error(err?.response?.data?.message || "Can not fetch Feeds");
    }
    setLoading(false);
  };

  console.log("Page", page);

  return (
    <section>
      <div className="flex justify-between p-4 sticky w-[100%] top-0 bg-white z-[1000]">
        <div className=" flex gap-3 items-center">
          <button className="cursor-pointer" onClick={() => router.back()}>
            <Backicon h={20} w={20} c="#000" />
          </button>
          <p className=" font-semibold text-xl">My Posts</p>
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
    </section>
  );
}
