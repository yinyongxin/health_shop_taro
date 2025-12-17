import { OrderListItem } from "@/client";
import { safeJson } from "@/utils";
import { CartWareCard } from "./CartWareCard";
import { ServiceBlock } from "./ServiceBlock";

type ServiceListProps = {
  serviceList: OrderListItem["productList"][number]["services"];
  isService: number;
  product: {
    productName: string;
    productImage: string;
    productId: number;
  };
};
export const ServiceList = (props: ServiceListProps) => {
  const { serviceList, isService, product } = props;

  const isFW = isService === 1;
  return (
    <>
      {isFW && <ServiceBlock serviceList={serviceList} />}
      {!isFW &&
        serviceList.map((service) => {
          return (
            <CartWareCard
              itemName={
                Object.values(
                  safeJson.parse(service.itemName || "", {}),
                )[0] as string
              }
              key={service.itemId}
              product={product}
              border={false}
              shadow={false}
              price={service.price}
            />
          );
        })}
    </>
  );
};
