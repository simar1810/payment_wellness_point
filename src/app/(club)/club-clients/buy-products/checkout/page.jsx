"use client";

import apiInstance from "@/helpers/api";
import { setCheckout } from "@/redux/slices/checkoutSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { PiCoinBold } from "react-icons/pi";
import { setOrder } from "@/redux/slices/vpOrderSlice";
import { Backicon, CrossIcon } from "@/components/svgs";
import { setVolumePointCheckout } from "@/redux/slices/volumePointCheckout";

const Page = () => {
  // const [margin, setMargin] = useState("50");
  const [margin, setMargin] = useState("0");
  const [discount, setDiscount] = useState("");
  // console.log("discount => ", discount);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const brandId = searchParams.get("brandId");
  const clientId = searchParams.get("clientId");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const cartProducts = useSelector(
    (state) => state.volumePointCheckout?.volumePointCheckout?.products
  );
  // console.log("cartProducts => ", cartProducts);

  useEffect(() => {
    if (cartProducts.length) {
      setProducts(cartProducts);
    }
  }, [cartProducts]);

  if (!cartProducts.length) {
    router.push(`/club-clients/buy-products?clientId=${clientId}`);
  }

  const updateProductQuantity = (productId, delta) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, quantity: Math.max(product.quantity + delta, 1) }
          : product
      )
    );
  };

  // console.log("Volume Point");

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!margin) {
      toast.error("Please select margin");
      return;
    }

    const costPrice = products.reduce(
      (total, product) =>
        total + product.productMrpList[margin] * product.quantity,
      0
    );

    const payload = {
      date,
      clientId,
      brand: brandId,
      productModule: products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        price: product.quantity * product.productMrpList[margin],
        productImage: product.productImage,
        productMrpList: product.productMrpList,
        productName: product.productName,
        productDescription: product.productDescription,
      })),
      volumePoints: products.reduce(
        (total, product) =>
          total +
          parseFloat(product.volumePoint ? product.volumePoint : 25) *
          product.quantity,
        0
      ),
      sellingPrice: orderTotal,
      profit: costPrice - orderTotal,
      coachMargin: margin,
    };

    // console.log("Payload", payload);

    try {
      setLoading(true);
      const { data, status } = await apiInstance.placeVolumePointOrder(payload);
      if (status === 200) {
        dispatch(setOrder(data.data));
        toast.success("Order placed successfully");
        router.push(`/club-clients/buy-products/success?clientId=${clientId}`);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error", error);
      toast.error("Error placing order");
      setLoading(false);
    }
  };

  const handleDiscountChange = (e) => {
    setDiscount(parseFloat(e.target.value) || "");
    // setMargin(e.target.value || "");
  };

  const itemTotal = useMemo(
    () =>
      products.reduce(
        (total, product) =>
          // total + (product.productMrpList[margin] ?? 0) * product.quantity,
          total + (product.productMrpList[0] ?? 0) * product.quantity,
        0
      ),
    // [products, margin]
    [products]
  );

  let orderTotal = useMemo(
    () =>
      products.reduce(
        (total, product) =>
          total + product.productMrpList[discount] * product.quantity,
        0
      ),
    [products, discount]
  );
  if (!orderTotal) {
    orderTotal = itemTotal;
  }

  const discountValue = discount ? parseInt(discount) : null;
  const discountPrice = itemTotal - orderTotal;
  // const discountPrice = products.reduce((total, product) => {
  //   if (discountValue !== null) {
  //     const maxPrice = Math.max(
  //       product.productMrpList[margin],
  //       product.productMrpList[discountValue]
  //     );
  //     const minPrice = Math.min(
  //       product.productMrpList[margin],
  //       product.productMrpList[discountValue]
  //     );
  //     return total + (maxPrice - minPrice) * product.quantity;
  //   }
  //   return total;
  // }, 0);

  // console.log("Discount Price", discountPrice);

  // const discountedTotal = itemTotal - discountPrice;

  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );

    dispatch(
      setVolumePointCheckout({
        products: products.filter((product) => product._id !== productId),
      })
    );
  };

  // const shipping = 0;
  // const orderTotal = discountedTotal + shipping;
  const volumePoints = products.reduce(
    (total, product) =>
      total +
      parseFloat(product.volumePoint ? product.volumePoint : 25) *
      product.quantity,
    0
  );

  return (
    <div className="flex justify-center items-center px-10 py-5">
      <div className="px-10 py-6 w-full bg-white rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
          <div className="w-full sm:w-[60%] pr-8">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="cursor-pointer">
                <Backicon h={18} w={18} c="#000" />
              </button>
              <h1 className="font-bold text-xl">Shopping Cart</h1>
            </div>

            <div className="flex mb-4 mt-4">
              <input
                type="date"
                placeholder="Date"
                name="date"
                className="w-80 border border-gray-300 rounded-md p-3 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="flex mb-4 mt-4">
              <span>Product Info</span>
            </div>

            <div className="flex flex-col gap-4 max-h-80 overflow-scroll scrollbar-hide">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center mb-4 mt-2 border-b pb-4 relative"
                >
                  <div className="relative">
                    <button
                      className="bg-gray-600 rounded-md p-1 cursor-pointer absolute  top-[-10px] right-0"
                      onClick={() => removeProduct(product._id)}
                    >
                      <CrossIcon h={18} w={18} c="#ccc" />
                    </button>
                    <Image
                      src={product.productImage}
                      alt={product.productName}
                      width={64}
                      height={64}
                      className="min-w-[100px] min-h-[100px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 w-[65%]">
                    <h3 className="font-semibold mb-1">
                      {product?.productName}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {product?.productDescription}
                    </p>
                    <div className="flex items-center mt-2 w-[100px]">
                      <button
                        onClick={() => updateProductQuantity(product._id, -1)}
                        className="px-3 bg-[#036231] text-white text-lg"
                      >
                        -
                      </button>
                      <span className="mx-3 w-[100px]">{product.quantity}</span>
                      <button
                        onClick={() => updateProductQuantity(product._id, 1)}
                        className="px-3 bg-[#036231] text-white text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="ml-auto font-semibold">
                    ₹{" "}
                    {product?.quantity * product?.productMrpList[margin] ??
                      "N/A"}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4 bg-[#90C8444D] rounded-lg px-4 py-2 w-fit">
              <PiCoinBold fontSize={22} color="#036231" />
              <p className="text-[#036231] font-semibold text-sm">
                Your Client will earn {volumePoints.toFixed(2)} Points with this
                Order.
              </p>
            </div>
          </div>

          <form
            className="w-full sm:w-[35%] p-6 border rounded-xl min-h-[400px] flex flex-col justify-between"
            onSubmit={handlePlaceOrder}
          >
            {/*  <div className='mb-2'>
              <select
                className={`w-full p-2 border border-gray-300 rounded outline-none ${
                  margin ? "text-black" : "text-gray-500"
                }`}
                name='margin'
                onChange={(e) => setMargin(e.target.value)}
                value={margin}
              >
                <option value=''>Select Margin</option>
                <option value='0'>0</option>
                <option value='15'>15</option>
                <option value='25'>25</option>
              </select>
            </div> */}
            <div className="mb-2">
              <select
                className={`w-full p-2 border border-gray-300 rounded outline-none ${discount ? "text-black" : "text-gray-500"
                  }`}
                name="discount"
                onChange={handleDiscountChange}
                value={discount}
              >
                <option value="">Select Discount %</option>
                <option value="0">0</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="35">35</option>
                <option value="42">42</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="mb-2">
              <h1 className="text-xl font-medium">Order Summary</h1>
            </div>

            <div className="mb-1 flex justify-between text-gray-500">
              <span>Item Total</span>
              <span>₹ {itemTotal.toFixed(2)}</span>
            </div>
            <div className="mb-1 flex justify-between text-gray-500">
              <span>Discount</span>
              <span>₹ {discountPrice.toFixed(2)}</span>
            </div>

            {/*    <div className='mb-1 flex justify-between text-gray-500'>
              <span>Shipping and handling:</span>
              <span>₹ {shipping.toFixed(2)}</span>
            </div> */}
            <div className="mb-1 flex justify-between text-xl border-t pt-3 mt-6">
              <span>Order Total:</span>
              <span>₹ {orderTotal.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-[#036231] text-white py-2 rounded-md"
            >
              {loading ? (
                <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px]">
                  <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                </div>
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
