"use client";
import SuccessPaymentPopup from "@/components/popups/successPaymentPopup";
import { API, RAZORPAY_API_KEY } from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function IosPayment({ params }) {
  // console.log("params of /payment/[...paymentParams] => ", params);

  const [isSuccessPaymentModal, setIsSuccessPaymentModal] = useState(false);
  const [amount = "", coachId, planType] = params.paymentParams;
  // console.log("amount => ", amount);
  // console.log("coachId => ", coachId);
  // console.log("planType => ", planType);

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
      const response = await axios.post(`${API}/app/addSubscriptionIos`, {
        coachId,
        planType: parseInt(planType),
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
      });

      console.log("response of verifying order api => ", response);
      if (response.status === 200) {
        toast.success("Payment Successful!");
        setIsSuccessPaymentModal(true)
      }
    } catch (err) {
      console.log("error in verifying payment api", err);
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
          AppId: "NCF",
          PlanName:
            parseInt(planType) === 1 ? "Monthly Plan" : "3 Month Offer Plan",
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
          image: "/logo.svg",
          key: RAZORPAY_API_KEY,
          amount: amount.toString(),
          note: order.notes,
          currency: order.currency,
          name: "NCF",
          description: "Payment for NCF",
          order_id: order.id,
          handler: async function (orderResponse) {
            handleVerifyPayment(orderResponse, amount);
          },
          prefill: {
            name: "NCF User",
            email: "abc@gmail.com",
            contact: "9988776655",
          },
          theme: {
            color: "#E97A4A",
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
    <SuccessPaymentPopup
      isSuccessPaymentModal={isSuccessPaymentModal}
      setIsSuccessPaymentModal={setIsSuccessPaymentModal}
    />
  );
}
