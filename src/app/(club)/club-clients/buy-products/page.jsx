"use client";

import ProductsPage from "@/components/pages/retail/buy-products/page";
import { setVolumePointCheckout } from "@/redux/slices/volumePointCheckout";

const { useSearchParams } = require("next/navigation");

const Page = () => {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const brandId = "65c9b87727653f65c27ba58e";
  const margin = "50";

  return (
    <ProductsPage
      dispatchFunction={setVolumePointCheckout}
      redirectUrl="/club-clients/buy-products/checkout"
      clientId={clientId}
      brandId={brandId}
      margin={margin}
    />
  );
};

export default Page;
