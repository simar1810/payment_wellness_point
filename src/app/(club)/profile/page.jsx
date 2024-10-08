"use client";
import ProfileInfo from "@/components/pages/profile/ProfileInfo";
import ReviewsAndAwards from "@/components/pages/profile/ReviewAndAwards";
import { Backicon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [coachProfile, setCoachProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function fetchUserProfile() {
    try {
      setLoading(true);
      const { data, status } = await apiInstance.getCoachProfile();
      if (status === 200) {
        setCoachProfile(data.data);
      }
      // console.log("data => ", data.data);
    } catch (error) {
      console.log("error => ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="">
      <div className="bg-white flex items-center mb-2 p-4 px-6 border-t">
        <button className="mr-3 cursor-pointer" onClick={() => router.back()}>
          <Backicon h={18} w={18} c="#000" />
        </button>
        <h1 className="text-xl font-bold">Your Profile</h1>
      </div>
      <div className="flex p-8 gap-10 flex-col lg:flex-row">
        <ProfileInfo
          profile={coachProfile}
          fetchUserProfile={fetchUserProfile}
        />
        <ReviewsAndAwards
          reviews={coachProfile.ratingReview}
          awards={coachProfile.awards}
          fetchUserProfile={fetchUserProfile}
        />
      </div>
    </div>
  );
};

export default Page;
