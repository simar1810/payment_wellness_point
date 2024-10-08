import React from "react";
import { Statcard } from ".";
import {
  Activeicon,
  Mealsicon,
  Ordericon,
  Revenueicon,
  TotalClientIcon,
} from "@/components/svgs";
import Image from "next/image";

function Statistics({ data, revenue, loading }) {
  return (
    <div className="  w-full grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
      <Statcard
        c={"#FFF9F9"}
        child={
          <Image
            height={25}
            width={35}
            src={"/clients-icon.svg"}
            alt="clients-icon"
          />
        }
        quantity={data?.numOfClients || 0}
        title={"Total Customer"}
        loading={loading}
        name={"total-clients"}
        redirect={"/app-clients"}
      />
      <Statcard
        c={"#F8FFF2"}
        child={<Activeicon h={25} w={25} />}
        quantity={data?.activeClients || 0}
        title={"Active Members"}
        name={"active-members"}
        redirect={"/app-clients"}
      />
      <Statcard
        c={"#FFF9F9"}
        child={<Mealsicon h={25} w={25} />}
        quantity={data?.meals || 0}
        title={"Meals Created"}
        name={"meals-created"}
        redirect={"/recipes"}
      />
      <Statcard
        c={"#FAF9FF"}
        child={
          <Image
            height={25}
            width={35}
            src={"/order-icon.svg"}
            alt="order-icon"
          />
        }
        quantity={data?.orders || 0}
        title={"Orders"}
        name={"orders"}
        redirect={"/retail"}
      />
      <Statcard
        c={"#F6FDFF"}
        child={<Revenueicon h={25} w={25} />}
        quantity={revenue?.salepercentage || 0}
        title={"Monthly Revenue"}
        name={"monthly-revenue"}
        redirect={"/retail/orders"}
      />
    </div>
  );
}

export default Statistics;
