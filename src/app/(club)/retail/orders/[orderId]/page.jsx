"use client";

import { Backicon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { setCheckout } from "@/redux/slices/checkoutSlice";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "@/hooks/useOutsideClick";

const Page = ({ params }) => {
  const { orderId } = params;
  const searchParams = useSearchParams();
  const order = JSON.parse(searchParams.get("orderDetails"));
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState("0.00");
  const [showDiscount, setShowDiscount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [costPrice, setCostPrice] = useState(parseFloat(order?.costPrice || 0));
  const [salesPrice, setSalesPrice] = useState(
    parseFloat(order?.sellingPrice || 0)
  );
  const [profit, setProfit] = useState(parseFloat(order?.profit || 0));
  const dispatch = useDispatch();
  const router = useRouter();
  const discountRef = useRef(null);

  useOutsideClick(discountRef, () => setShowDiscount(false));

  useEffect(() => {
    setProducts(order.productModule);
    const dis =
      ((order?.costPrice - order?.sellingPrice) / order?.costPrice) * 100;
    setDiscount(dis.toFixed(2));
  }, []);

  useEffect(() => {
    const costPrice = products.reduce(
      (total, product) =>
        total + product.productMrpList[product?.margin] * product.quantity,
      0
    );
    const profit = products.reduce(
      (total, product) =>
        total +
        (product.productMrpList[0] - product.productMrpList[product?.margin]) *
        product.quantity,
      0
    );
    const sellingPrice = costPrice - (costPrice * discount) / 100;

    setCostPrice(parseFloat(costPrice));
    setProfit(parseFloat(profit));
    setSalesPrice(parseFloat(sellingPrice));
  }, [products, discount]);

  const incrementQuantity = (productId) => {
    if (!editMode) return;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (productId) => {
    if (!editMode) return;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    /*  const payload = {
      clientId: order?.clientId,
      clientName: order?.clientName,
      brand: order?.brandId,
      productModule: products.map((product) => ({
        productId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        price: product.quantity * product.productMrpList[product?.margin || 0],
        productImage: product.productImage,
        productMrpList: product.productMrpList,
      })),
      costPrice,
      sellingPrice: salesPrice,
      profit,
      customerMargin: 0,
      coachMargin: 0,
      person: "club-coach",
    }; */

    const newPayload = {
      productModule: products.map((product) => ({
        productId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        price: product.quantity * product.productMrpList[product?.margin || 0],
        productImage: product.productImage,
        productMrpList: product.productMrpList,
        productDescription: product.productDescription,
        margin: product.margin,
      })),
      profit: profit,
      costPrice: costPrice,
      sellingPrice: salesPrice,
      customerMargin: order?.customerMargin,
      coachMargin: order?.coachMargin,
    };

    console.log("newPayload", newPayload);

    try {
      setLoading(true);
      const { data, status } = await apiInstance.updateOrder(
        newPayload,
        orderId
      );
      if (status === 200) {
        dispatch(setCheckout({ order: data.data }));
        toast.success("Order updated successfully");
        router.push(
          `/retail/orders/${orderId}/success?invoice=${data.data.invoiceNumber}`
        );
      }
      setLoading(false);
    } catch (error) {
      toast.error("Error placing order");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 md:px-10  mt-6">
      <div className="px-4 md:px-10 w-full bg-white rounded-2xl shadow-md py-10">
        <div className="flex justify-between gap-6 flex-col md:flex-row">
          <div className="w-full lg:w-[70%] lg:pr-8">
            <div className="flex items-center gap-4 ">
              <button onClick={() => router.back()} className="cursor-pointer">
                <Backicon h={18} w={18} c="#000" />
              </button>
              <h1 className="font-bold text-xl">Shopping Cart</h1>
            </div>
            <div className="flex mb-4 mt-4">
              <span>Product Info</span>
            </div>
            <div className="flex flex-col gap-4 max-h-80 overflow-scroll scrollbar-hide">
              {products.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center mb-4 mt-2 border-b pb-4 relative"
                >
                  <div className="relative">
                    <Image
                      src={product.productImage}
                      alt={product.productName}
                      width={64}
                      height={64}
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 w-[50%] lg:w-[70%]">
                    <h3 className="font-semibold mb-1">
                      {product.productName}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {product.productDescription}
                    </p>
                    <div className="flex items-center mt-2 w-[100px]">
                      <button
                        onClick={() => decrementQuantity(product.productId)}
                        className="px-3 bg-[#036231] text-white text-lg"
                      >
                        -
                      </button>
                      <span className="mx-3 w-[100px]">{product.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(product.productId)}
                        className="px-3 bg-[#036231] text-white text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="ml-auto font-semibold min-w-[20%] text-center">
                    ₹{" "}
                    {product.quantity *
                      product.productMrpList[product.margin || 0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <form
            className="w-full lg:w-[35%] p-6 border rounded-xl min-h-[400px] flex flex-col justify-between"
            onSubmit={handlePlaceOrder}
          >
            <div className="mb-2">
              <h1 className="text-xl font-medium">Order Summary</h1>
            </div>
            <div className="mb-2 flex justify-between text-gray-500">
              <span>Cost Price</span>
              <span>{costPrice.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-gray-500">
              <div className="relative " ref={discountRef}>
                <button
                  type="button"
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => setShowDiscount(!showDiscount)}
                >
                  Discount %{" "}
                  <MdOutlineArrowDropDown fontSize={20} color="#000" />
                </button>

                {showDiscount && (
                  <div className="absolute top-10 left-0 flex flex-col bg-white border border-gray-300 rounded-lg w-32 z-10">
                    {[0, 15, 25].map((discountValue) => (
                      <button
                        key={discountValue}
                        onClick={() => {
                          setDiscount(discountValue);
                          setShowDiscount(false);
                        }}
                        className="hover:bg-gray-200 w-full text-left px-4 py-2"
                      >
                        {discountValue}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span>{discount}</span>
            </div>
            <div className="mb-2 flex justify-between text-gray-500">
              <span>Profit</span>
              <span>{profit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg border-t pt-6 mt-3">
              <span>MRP:</span>
              <span>{costPrice.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-lg pt-2">
              <span>Sales Price:</span>
              <span>{salesPrice.toFixed(2)}</span>
            </div>
            {!editMode ? (
              <button
                type="button"
                className="w-full mt-4 bg-[#036231] text-white py-2 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditMode(true);
                  toast.success("Edit mode activated");
                }}
              >
                Edit Order
              </button>
            ) : (
              <button
                type="submit"
                className="w-full mt-4 bg-[#036231] text-white py-2 rounded-md"
              >
                {loading ? (
                  <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px]">
                    <div className="w-5 h-5 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
