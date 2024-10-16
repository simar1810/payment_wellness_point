"use client";
import apiInstance from "@/helpers/api";
import {
  setClubSystem,
  setIsAppConnected,
  setIsLoggedIn,
  setUser,
} from "@/redux/slices/userSlice";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AuthGuardian = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();

  const { isLoggedIn = false } = useSelector((state) => state.user);

  useEffect(() => {
    const checkClubCoach = async () => {
      try {
        const { data } = await apiInstance.isClubCoach();

        if (data.status) {
          dispatch(setIsLoggedIn(true));

          const isAppConnected =
            data?.data?.inAppId && data.data.inAppId.length > 0 ? true : false;
          dispatch(setIsAppConnected(isAppConnected));
          const subscriptionStatus =
            data?.data?.subscriptionStatus &&
              data?.data?.subscriptionStatus === "true"
              ? true
              : false;

          const user = {
            _id: data?.data?._id ?? null,
            email: data?.data?.email ?? null,
            name: data?.data?.name ?? null,
            profilePhoto: data?.data?.profilePhoto ?? null,
            mobileNumber: data?.data?.mobileNumber ?? null,
            city: data?.data?.city ?? null,
            joiningDate: data?.data?.joiningDate ?? null,
            monthlyVpDeduction: data?.data?.monthlyVpDeduction ?? 100,
            subscriptionStatus,
            rollNumberInitials: data?.data?.rollNumberInitials,
            freeTrialVPDays: data?.data?.freeTrialVPDays
          };
          dispatch(setUser(user));
          dispatch(setClubSystem(parseInt(data?.data?.clubSystem) ?? 1));

          if (
            !subscriptionStatus &&
            !(pathName || "/null").includes("subscription")
          ) {
            router.push("/subscription");
          }
        } else {
          toast.error("Please Login Again!");
          router.push("/login");
        }
      } catch (err) {
        toast.error("Please Login Again!");
        router.push("/login");
      }
    };
    checkClubCoach();
  }, [router, dispatch, pathName]);

  return isLoggedIn ? <>{children}</> : null;
};

export default AuthGuardian;
