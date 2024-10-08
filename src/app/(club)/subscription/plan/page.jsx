"use client";
import {
  TickIcon,
  Backicon,
  OneMonthIcon,
  ThreeMonthIcon,
  OneYearIcon,
} from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { RAZORPAY_API_KEY } from "@/helpers/apiConfig";
import { setUser } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

export default function Page() {
  const cardData = [
    {
      duration: "1",
      Plan: "monthly",
      disciption:
        "Get started with essential analytics and support, perfect for Club Owners.",
      amount: "499",
      trackVisits: "250,000",
      supportType: "Normal",
      teamMembers: "3",
      isPopular: false,
      icon: <OneMonthIcon h={40} w={40} />,
      whatsIncluded: [
        "All analytics features: Google Meet and Zoom Integration.",
        "Unlimited Meetings: Monitor unlimited meetings, ensuring detailed tracking and insights.",
        "Normal support: Benefit from standard customer support for any issues or queries.",
        "Single Login: Single login on the platform.",
      ],
    },
    {
      duration: "3",
      Plan: "Quaterly",
      disciption:
        "Boost your coaching with advanced analytics and premium support, great for Organization & teams. and above",
      amount: "1199",
      trackVisits: "1,000,000",
      supportType: "Premium",
      teamMembers: "10",
      isPopular: true,
      icon: <ThreeMonthIcon h={35} w={35} />,
      whatsIncluded: [
        "All 1 month Features",
        "Funnel Insights: Gain insights into your client conversion funnel for better decision-making.",
        "App Connect: Connect your WellnessZ App with WellnessZ Club to form the ultimate coaching environment.",
      ],
    },
    {
      duration: "6",
      Plan: "Bi-Annually",
      disciption:
        "Achieve more with extensive tracking and dedicated support, ideal for Big Leaders.",
      amount: "1999",
      trackVisits: "5,000,000",
      supportType: "Dedicated",
      teamMembers: "50",
      isPopular: false,
      icon: <OneYearIcon h={35} w={35} />,
      whatsIncluded: [
        "All 3 Month Featuers",
        "Premium support: Access priority customer support for faster resolution of any issues.",
        "One extra login: Enjoy an additional login for better team management.",
      ],
    },
  ];

  return (
    <div className=" h-full w-full overflow-scroll scrollbar-hide p-2">
      <div className="w-[250%] sm:w-full overflow-x-scroll sm:scrollbar-hide  bg-white  flex flex-col items-center rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-6 ">
        <div className=" w-full">
          <Link href={"/subscription"}>
            <button className=" bg-[#036231] text-white flex items-center gap-2 px-3 py-1 rounded-md">
              <Backicon h={15} w={15} c={"white"} />
              Back
            </button>
          </Link>
        </div>

        <div className="mt-4 sm:mt-0 flex flex-col items-center self-start sm:self-auto">
          <p className="text-3xl font-semibold">Membership Plans</p>
          <p className="text-[#00000080] text-xl font-medium mt-1">
            Choose the plan that better Suits You
          </p>
        </div>

        <div className="w-fit flex items-center justify-center mt-10 gap-10 p-10">
          {cardData.map((data, index) => (
            <Card key={index} prop={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ prop }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const {
    duration,
    Plan,
    disciption,
    amount,
    trackVisits,
    supportType,
    teamMembers,
    isPopular,
    icon,
  } = prop;
  const [isHover, setIsHover] = useState(false);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handleVerifyPayment = async (orderResponse) => {
    // console.log("\norderResponse of razorpay => ", orderResponse);
    const toastId = toast.loading("Verifying Payment....");
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        orderResponse;
      const { data, status } = await apiInstance.addClubSubscription({
        planType: parseInt(duration),
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        paymentStatus: "paid",
      });

      // console.log("response of addClubSubscription api => ", data);
      if (status === 200) {
        dispatch(setUser({ ...user, subscriptionStatus: true }));
        router.replace("/club-dashboard");
        toast.success("Payment Successful!");
      }
    } catch (err) {
      console.error("error in addClubSubscription api", err);
      toast.error(err?.response?.data?.message || "Payment Failed! Try Again!");
    }
    toast.dismiss(toastId);
  };

  const displayRazorpay = async () => {
    if (!amount || amount.length === 0) {
      // console.log("Amount is required");
      toast.error("Something Went Wrong!");
      return;
    }
    const toastId = toast.loading("Please Wait....");

    try {
      const { data, status } = await apiInstance.createRazorpayOrder({
        amount,
        note: {
          AppId: "WellnessZ_Club",
          PlanName:
            parseInt(duration) === 1
              ? "Monthly Plan"
              : parseInt(duration) === 3
                ? "3 Month Plan"
                : "6 Month PLan",
        },
      });

      // console.log("response of ordering api => ", data);
      if (status === 200) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        toast.dismiss(toastId);

        if (!res) {
          toast.error("RazorPay failed to load");
          return;
        }

        const { amount, ...order } = data.data;

        // console.log("order => ", order);
        const options = {
          image: "/logo.png",
          key: RAZORPAY_API_KEY,
          amount: amount.toString(),
          note: order.notes,
          currency: order.currency,
          name: "WellnessZ Club",
          description: "Payment for WellnessZ Club",
          order_id: order.id,
          handler: async function (orderResponse) {
            handleVerifyPayment(orderResponse, amount);
          },
          prefill: {
            name: "WellnessZ_Club User",
            email: "abc@gmail.com",
            contact: "9988776655",
          },
          theme: {
            color: "#036231",
          },
          retry: false,
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (paymentResponse) {
          toast.error("OOPS! Payment Failed!");
          console.error(paymentResponse.error);
        });
      }
    } catch (err) {
      console.error("error in ordering api", err);
      toast.error(err?.response?.data?.message || "Payment Failed! Try Again!");
    }

    toast.dismiss(toastId);
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`sm:w-[30%] h-[35rem] flex flex-col justify-center cursor-pointer transition-all duration-200 relative  rounded-xl p-6 ${isHover
          ? " bg-[#036231] -translate-y-6"
          : "shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        } `}
    >
      {isPopular && (
        <div
          className={`absolute right-5 top-2 font-extralight  px-3 rounded bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 ${isHover ? "bg-white text-white" : "bg-[#036231] text-[#036231]"
            }`}
        >
          Best Selling
        </div>
      )}

      <div className=" flex items-center gap-3">
        <div className=" w-[60px] h-[60px] bg-[#ECEBFF] rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        <p className={`font-bold text-[20px] ${isHover ? " text-white" : ""}`}>
          {duration} Month Plan
        </p>
      </div>

      <p className=" text-[#00000070] text-sm mt-2">{disciption}</p>

      <p
        className={`font-extrabold text-[35px] mt-1 ${isHover ? " text-white" : ""
          }`}
      >
        ₹{amount}
        <span className="text-[#00000070] text-lg font-medium">/{Plan}</span>
      </p>

      <p className={`font-bold text-lg mt-2 ${isHover ? " text-white" : ""}`}>
        Whats included
      </p>

      <div className="mt-1 flex flex-col gap-1">
        {prop.whatsIncluded.map((item, idx) => (
          <div className="flex items-center gap-3" key={idx}>
            <div
              className={`h-[25px] w-[25px]  rounded-full flex items-center justify-center ${isHover ? "bg-white" : "bg-[#036231]"
                }`}
            >
              <TickIcon h={15} w={15} c={isHover ? "#036231" : "white"} />
            </div>
            <p className={`text-[15px] w-[90%] ${isHover ? "text-white" : ""}`}>
              {item}
            </p>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-3  font-bold  rounded-full mt-6 ${isHover ? "text-[#036231] bg-[white]" : "text-white bg-[#036231]"
          }`}
        onClick={displayRazorpay}
      >
        Buy Now
      </button>
    </div>
  );
}
