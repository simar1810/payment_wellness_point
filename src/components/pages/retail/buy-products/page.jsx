"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import apiInstance from "@/helpers/api";
import { Backicon, Searchicon } from "@/components/svgs";
import { GrNotes } from "react-icons/gr";
import Loader from "@/components/loader/Loader";

const ProductsPage = ({
  existingCart = [],
  dispatchFunction,
  redirectUrl,
  clientId,
  brandId,
  margin,
}) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([...existingCart]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data, status } = await apiInstance.getBrandProducts(brandId);
        if (status === 200) {
          setProducts((prevProducts) =>
            data.data?.map((product) => ({
              ...product,
              quantity: 1,
            }))
          );
        }
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [brandId]);

  const handleAddToCart = (productId) => {
    const product = products.find((product) => product._id === productId);
    setCart((prevCart) => [...prevCart, product]);
    // dispatch(setCheckout([...cart, product]));
  };

  const handleIncrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      })
    );
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      })
    );
  };

  const handleDecrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) => {
        if (product._id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
    );

    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product._id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
    );
  };

  const handleGoToCart = () => {
    if (products.length > 0) {
      router.push(
        `${redirectUrl}?brandId=${brandId}&margin=${margin}&clientId=${clientId}`
      );
      dispatch(
        dispatchFunction({
          brand: brandId,
          products: cart,
          // client: clientId,
        })
      );
    } else {
      toast.error("Please select at least one product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen px-4 md:px-10">
      <div className="px-4 md:px-10 py-6 w-full bg-white rounded-2xl shadow-md">
        <div className="flex justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4 ">
            <button onClick={() => router.back()} className="cursor-pointer">
              <Backicon h={18} w={18} c="#000" />
            </button>
            <h1 className="font-bold text-xl">Products</h1>
          </div>

          <div className="flex items-center gap-4 border rounded-md  p-3 w-[200px] md:min-w-[260px]">
            <Searchicon h={18} w={18} c="#c9c9c9" />
            <input
              type="text"
              placeholder="Search category or products"
              className="outline-none w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 h-[450px] max-h-[450px] overflow-scroll scrollbar-hide">
          {loading ? (
            <div className="flex-col gap-4 w-full flex items-center justify-center py-[3px] min-h-96">
              <div className="w-10 h-10 border-2 text-green-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-green-400 rounded-full"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-[500px]">
              <div className="flex items-center justify-center bg-[#90C8444D] rounded-full p-4 mb-2">
                <GrNotes fontSize={25} color="#036231" />
              </div>
              <h1 className="font-semibold text-lg">No Products Available</h1>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-start mb-4 border-b pb-4"
              >
                <Image
                  src={product.productImage}
                  alt={product.productName}
                  width={64}
                  height={64}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-4 md:ml-6 w-[40%] lg:w-[70%]">
                  <h3 className="font-semibold mb-1">{product.productName}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 md:line-clamp-none">
                    {product.productDescription}
                  </p>
                  <div className="mt-2 font-semibold">
                    {/* ₹{product.productMrpList[margin] ?? "N/A"} */}
                    ₹{product.productMrpList[0] ?? "N/A"}
                  </div>
                </div>
                {cart.find((item) => item._id === product._id) ? (
                  <div className="flex items-center justify-between space-x-2 ml-auto min-w-[80px] lg:min-w-[125px]">
                    <button
                      onClick={() => handleDecrementQuantity(product._id)}
                      className="px-3 bg-[#036231] text-white text-lg"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => handleIncrementQuantity(product._id)}
                      className="px-3 bg-[#036231] text-white text-lg"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-[#036231] text-white md:px-6 py-3 rounded-lg self-start ml-auto w-[30%] text-sm md:text-[18px] lg:w-[13%]"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleGoToCart}
              className="bg-[#036231] text-white px-10 py-3 rounded-lg text-lg"
            >
              Go to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
