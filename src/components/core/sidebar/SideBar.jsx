"use client";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  LogoutIcon,
  AppIcon,
  ClubIcon,
  CrossIcon,
  CameraIcon,
  Editicon,
} from "../../svgs";
import { useEffect, useState } from "react";
import Clubfeature from "./clubfeature";
import Appfeature from "./appfeature";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setFeaturePreference } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";
import SubscriptionSideBarIcon from "@/components/svgs/subscriptionSideBarIcon";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { isAppConnected, featurePreference, user } = useSelector(
    (state) => state.user
  );
  // console.log("featurePreference in sidebar => ", featurePreference);
  // console.log("isAppConnected in sidebar => ", isAppConnected);
  // console.log("user in sidebar => ", user);
  const { subscriptionStatus = false } = user;

  const [open, setOpen] = useState(false);

  function Setstate(prop) {
    if (prop === "app") {
      router.push("/coming-soon");
      return;
    }
    if (prop === "app" && !isAppConnected) {
      router.push("/connect-to-app");
      // router.push("/coming-soon");
      return;
    }
    if (prop === "subscription") {
      router.push("/subscription");
    }
    dispatch(setFeaturePreference(prop));
  }

  const handleLogout = () => {
    // Cookies.remove("refreshToken");
    // Cookies.remove("coachId");
    const allCookies = Cookies.get();

    for (const cookie in allCookies) {
      Cookies.remove(cookie);
    }
    router.push("/login");
    toast.success("Logged Out Successfully");
  };

  useEffect(() => {
    const appFeaturesRoutes = [
      "/profile",
      "/app-dashboard",
      "/app-clients",
      "/recipes",
      "/feed",
      "/feed/myposts",
      "/feed/savedposts",
      "/notes",
      "/reminders",
      "/retail",
    ];

    const clubFeaturesRoutes = [
      "/club-dashboard",
      "/club-clients",
      "/linkgenerator",
      "/meeting",
    ];

    if (appFeaturesRoutes.includes(pathname)) {
      dispatch(setFeaturePreference("app"));
    } else if (clubFeaturesRoutes.includes(pathname)) {
      dispatch(setFeaturePreference("club"));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    const pathNames = (pathname || "/null").split("/");
    // console.log("pathNames => ", pathNames);

    if ((pathNames[1] || "") !== "subscription" && !subscriptionStatus) {
      router.push("subscription");
    }
  }, [subscriptionStatus, router, pathname]);

  return (
    <>
      <div
        className={`h-full w-[290px] bg-white flex flex-col items-center py-4 absolute md:relative ${!open ? "left-[-290px]" : "left-0"
          } transition-all  duration-300 md:left-0 md:relative z-50`}
      >
        <button
          className="self-end mr-6 md:hidden"
          onClick={() => setOpen(false)}
        >
          <CrossIcon h={25} w={25} c="#036231" />
        </button>

        <section className="w-[90%] h-full relative flex flex-col py-4 px-2  overflow-y-scroll scrollbar-hide box-border ">
          <div className="flex flex-col justify-center items-center text-center">
            <button
              onClick={() => {
                router.push(`/coach-profile/${user?._id}`);
                setOpen(false);
              }}
            >
              <div className="h-[100px] w-[100px] relative  border-solid rounded-full flex items-center justify-center mb-5">
                <Image
                  src={user?.profilePhoto || "/default-user-dp.svg"}
                  alt="Profile Picture"
                  priority
                  width={80}
                  height={80}
                  className="h-[95px] w-[95px] mb-2 rounded-full -mt-[1px] object-cover "
                />
                <div className="h-[30px] w-[30px] rounded-full bg-[#036231] absolute right-0 bottom-3 flex items-center justify-center cursor-pointer">
                  <Editicon h={15} w={15} c={"white"} />
                </div>
              </div>
            </button>
            <h2 className="font-bold -mt-2 mb-1">
              Hello {user?.name || "Coach"}!
            </h2>
            {user?.email && (
              <p className="text-[12px] text-[#82867E]">{user?.email}</p>
            )}
          </div>

          <div className=" mt-3 p-2 h-full max-h-[430px] overflow-scroll scrollbar-hide">
            <div
              onClick={() => Setstate("club")}
              className={`"w-full h-[35px] relative  rounded-md flex items-center  gap-3 cursor-pointer  pl-5 ${featurePreference === "club"
                  ? "text-white bg-[#036231]"
                  : " text-[#494949]"
                } `}
            >
              <div className=" w-[25px]">
                <ClubIcon
                  h={20}
                  w={20}
                  c={featurePreference === "club" ? "white" : "#036231"}
                />
              </div>
              <p className=" text-[16px]   font-medium ">Club Features</p>
            </div>

            <div
              className={` rounded-lg w-full pl-3 mt-1 mb-6 transition-all duration-300 ${featurePreference === "club"
                  ? "h-[230px]"
                  : " h-[0px] overflow-hidden"
                } `}
            >
              <Clubfeature setOpen={setOpen} />
            </div>

            <div
              className={`px-2 ${featurePreference === "club" ? " pb-2" : " pt-2"
                } `}
            >
              <div className=" h-[1.5px] w-full bg-[#00000040]"></div>
            </div>

            <div
              onClick={() => {
                Setstate("app");
                setOpen(false);
              }}
              className={`"w-full h-[35px] relative  rounded-md flex items-center mt-1  gap-3 cursor-pointer  pl-5 ${featurePreference === "app"
                  ? "text-white bg-[#036231]"
                  : " text-[#494949]"
                } `}
            >
              <div className=" w-[25px]">
                <AppIcon
                  h={25}
                  w={25}
                  c={featurePreference === "app" ? "white" : "#036231"}
                />
              </div>
              <p className=" text-[16px]   font-medium">App Features</p>
            </div>

            <div
              className={` rounded-lg mt-1 w-full pl-3 transition-all duration-300 ${featurePreference === "app"
                  ? "h-[190px]"
                  : " h-[0px] overflow-hidden"
                } `}
            >
              {isAppConnected && <Appfeature setOpen={setOpen} />}
            </div>
          </div>

          <div
            onClick={() => {
              Setstate("subscription");
              setOpen(false);
            }}
            className={`w-[92%] h-[35px] rounded-md flex items-center ml-2  gap-3 cursor-pointer  pl-5 absolute bottom-[3.6rem] ${featurePreference === "subscription"
                ? "text-white bg-[#036231]"
                : "text-[#494949] bg-white"
              }`}
          >
            <div className="w-[25px]">
              <SubscriptionSideBarIcon
                h={20}
                w={20}
                c={featurePreference === "subscription" ? "white" : "#036231"}
              />
            </div>
            <p className="text-[16px] font-medium">Subscription</p>
          </div>

          <div className=" w-full absolute bottom-2 px-2">
            <button
              className="w-full h-[35px] rounded-md flex items-center  gap-3 cursor-pointer  pl-5 bg-[#F6F6F6]"
              onClick={handleLogout}
            >
              <LogoutIcon h={20} w={20} c="#FF5959" />
              <p className=" text-[16px] font-semibold text-[#3C3D3C]">
                Log out
              </p>
            </button>
          </div>
        </section>
      </div>

      {!open && (
        <div className="absolute flex items-center left-8 h-[10%] md:hidden">
          <button onClick={() => setOpen(true)} className="z-50">
            <RxHamburgerMenu fontSize={35} color="#036231" />
          </button>
        </div>
      )}
    </>
  );
}
