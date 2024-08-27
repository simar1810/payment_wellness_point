"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { API, RAZORPAY_API_KEY } from "../../../../../config";
import SuccessPaymentPopup from "@/components/popups/successPaymentPopup";
import FailurePaymentPopup from "@/components/popups/failurePaymentPopup";
import { API, RAZORPAY_API_KEY } from "@/config";

export default function IosPayment({ params }) {
  // console.log("params of /payment/[...paymentParams] => ", params);

  const [isSuccessPaymentModal, setIsSuccessPaymentModal] = useState(false);
  const [isFailurePaymentModal, setIsFailurePaymentModal] = useState(false);

  const [amount = "", coachId, planType, updateMode, subscriptionId = ""] =
    params.paymentParams;
  // console.log("amount => ", amount);
  // console.log("coachId => ", coachId);

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
    console.log("\norderResponse of razorpay => ", orderResponse);
    const toastId = toast.loading("Verifying Payment....");
    // await new Promise((r) => setTimeout(r, 3000));

    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        orderResponse;
      const response = await axios.put(`${API}/app/extendSubscriptionIos`, {
        coachId,
        planType,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        updateMode,
        subscriptionId,
      });

      console.log("response of verifying order api => ", response);
      if (response.status === 200) {
        toast.success("Payment Successful!");
        setIsSuccessPaymentModal(true);
      } else setIsFailurePaymentModal(true);
    } catch (err) {
      console.log("error in verifying payment api", err);
      setIsFailurePaymentModal(true);
      toast.error(
        err?.message ||
          err?.response?.data?.message ||
          "Payment Failed! Try Again!"
      );
    }
    toast.dismiss(toastId);
  };

  const displayRazorpay = async () => {
    if (!amount || amount.length === 0) return;

    const toastId = toast.loading("Please Wait....");

    try {
      const response = await axios.post(`${API}/app/razorpay/createOrder`, {
        amount,
        note: {
          AppId: "WellnessZ",
          PlanName: planType,
        },
      });

      console.log("response of ordering api => ", response);
      if (response.status === 200) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        toast.dismiss(toastId);

        if (!res) {
          toast.error("RazorPay failed to load");
          return;
        }

        const { amount, ...order } = response.data.data;

        console.log("order => ", order);
        const options = {
          image: "/White.png",
          key: RAZORPAY_API_KEY,
          amount: amount.toString(),
          note: order.notes,
          currency: order.currency,
          name: "WellnessZ",
          description: "Payment for WellnessZ",
          order_id: order.id,
          handler: async function (orderResponse) {
            handleVerifyPayment(orderResponse, amount);
          },
          prefill: {
            name: "WellnessZ User",
            email: "abc@gmail.com",
            contact: "9988776655",
          },
          theme: {
            color: "#7AC143",
          },
          retry: false,
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (paymentResponse) {
          toast.error("OOPS! Payment Failed!");
          console.log(paymentResponse.error);
        });
      }
    } catch (err) {
      console.log("error in ordering api", err);
      toast.error(
        err?.message ||
          err?.response?.data?.message ||
          "Payment Failed! Try Again!"
      );
    }

    toast.dismiss(toastId);
  };

  useEffect(() => {
    displayRazorpay();
  }, [amount]);

  return (
    <>
      <SuccessPaymentPopup
        isSuccessPaymentModal={isSuccessPaymentModal}
        setIsSuccessPaymentModal={setIsSuccessPaymentModal}
      />

      <FailurePaymentPopup
        isFailurePaymentModal={isFailurePaymentModal}
        setIsFailurePaymentModal={setIsFailurePaymentModal}
      />
    </>
  );
}
