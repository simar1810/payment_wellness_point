"use client";

import { useSearchParams } from "next/navigation";
import { setCheckout } from "@/redux/slices/checkoutSlice";
import ProductsPage from "@/components/pages/retail/buy-products/page";
import { useSelector } from "react-redux";

const Page = () => {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brandId");
  const margin = searchParams.get("margin");
  const clientId = searchParams.get("clientId");
  // const existingCart = useSelector((state) => state.checkout.checkout.products);

  return (
    <ProductsPage
      // existingCart={existingCart}
      dispatchFunction={setCheckout}
      redirectUrl='/retail/brand/checkout'
      clientId={clientId}
      brandId={brandId}
      margin={margin}
    />
  );
};

export default Page;
