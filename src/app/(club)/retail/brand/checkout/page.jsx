"use client";

import { Backicon, CrossIcon } from "@/components/svgs";
import apiInstance from "@/helpers/api";
import { setCheckout } from "@/redux/slices/checkoutSlice";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "@/hooks/useOutsideClick";

const CheckoutPage = ({ }) => {
  const client = useSelector((state) => state.checkout.checkout.client);
  const cartProducts = useSelector((state) => state.checkout.checkout.products);
  console.log("cartProducts => ", cartProducts);
  const searchParams = useSearchParams();
  const margin = searchParams.get("margin");
  const brandId = searchParams.get("brandId");
  const clientId = searchParams.get("clientId");
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState("0.00");
  const [showDiscount, setShowDiscount] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const discountRef = useRef(null);

  useOutsideClick(discountRef, () => setShowDiscount(false));

  console.log("client => ", client);

  useEffect(() => {
    if (!client || !brandId) {
      router.push("/retail");
    }
  }, [client, brandId, router]);

  useEffect(() => {
    setProducts(cartProducts);
  }, []);

  if (!cartProducts.length) {
    router.push(
      `/retail/brand/products?brandId=${brandId}&margin=${margin}&clientId=${clientId}`
    );
  }

  const incrementQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  console.log("products => ", products);

  const profit = products.reduce(
    (total, product) =>
      total +
      (product.productMrpList[0] - product.productMrpList[margin]) *
      product.quantity,
    0
  );
  const costPrice = products.reduce(
    (total, product) =>
      total + product.productMrpList[margin] * product.quantity,
    0
  );
  const salesPrice = costPrice - (costPrice * discount) / 100;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!margin) {
      toast.error("Please select margin");
      return;
    }

    const payload = {
      clientId: client._id,
      clientName: client.name,
      brand: brandId,
      productModule: products.map((product) => ({
        productId: product._id,
        productName: product.productName,
        quantity: product.quantity,
        price: product.quantity * product.productMrpList[margin],
        productDescription: product.productDescription,
        productImage: product.productImage,
        productMrpList: product.productMrpList,
        margin: margin,
      })),
      costPrice,
      sellingPrice: salesPrice,
      profit,
      customerMargin: margin,
      coachMargin: 0,
      person: "club-coach",
    };

    try {
      setLoading(true);
      const { data, status } = await apiInstance.placeOrder(payload);
      if (status === 200) {
        dispatch(setCheckout({ order: data.data }));
        toast.success("Order placed successfully");
        router.push("/retail/brand/success");
      }
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      toast.error("Error placing order");
      setLoading(false);
    }
  };

  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value) || "";
    setDiscount(discountValue);
  };

  /*  const itemTotal = products.reduce(
    (total, product) =>
      total + (product.productMrpList[margin] ?? 0) * product.quantity,
    0
  );

  const discountedTotal = itemTotal - (itemTotal * discount) / 100;
  const orderTotal = discountedTotal + shipping; */

  const removeProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );

    dispatch(
      setCheckout({
        products: products.filter((product) => product._id !== productId),
      })
    );
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 md:px-10">
      <div className="px-4 md:px-10 py-6 w-full bg-white rounded-2xl shadow-md">
        <div className="flex justify-between flex-col lg:flex-row">
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
            <div className="flex flex-col gap-4  max-h-80 overflow-scroll scrollbar-hide">
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
                        onClick={() => decrementQuantity(product._id)}
                        className="px-3 bg-[#036231] text-white text-lg"
                      >
                        -
                      </button>
                      <span className="mx-3 w-[100px]">{product.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(product._id)}
                        className="px-3 bg-[#036231] text-white text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="ml-auto font-semibold min-w-[30%] text-center">
                    ₹{" "}
                    {product?.quantity * product?.productMrpList[margin] ??
                      "N/A"}
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
                  <div className="absolute top-10 left-0 flex flex-col  bg-white border border-gray-300 rounded-lg w-32 z-10">
                    {[0, 15, 25].map((discount) => (
                      <button
                        key={discount}
                        onClick={() => {
                          setDiscount(discount);
                          setShowDiscount(false);
                        }}
                        className="hover:bg-gray-200 w-full text-left px-4 py-2"
                      >
                        {discount}
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

            {/* <div className='mb-2 flex justify-between text-gray-500'>
              <span>Discounted Total</span>
              <span>{discountedTotal.toFixed(2)}</span>
            </div> */}
            {/* <div className='mb-2 flex justify-between text-gray-500'>
              <span>Shipping and handling:</span>
              <span>{shipping.toFixed(2)}</span>
            </div> */}
            {/*  <div className='mb-2 flex justify-between text-gray-500'>
                <span>Before tax:</span>
                <span>{beforeTax.toFixed(2)}</span>
              </div>
              <div className='mb-2 flex justify-between text-gray-500'>
                <span>Tax Collected:</span>
                <span>{taxCollected.toFixed(2)}</span>
              </div> */}
            <div className="flex justify-between text-lg border-t pt-6 mt-3">
              <span>MRP:</span>
              <span>{costPrice.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-lg pt-2">
              <span>Sales Price:</span>
              <span>{salesPrice.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-[#036231] text-white py-2 rounded-md"
            >
              {loading ? (
                <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] ">
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

export default CheckoutPage;
