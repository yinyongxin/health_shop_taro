import { OrderDetailItemListItem } from "@/client";
import { View } from "@tarojs/components";
import { NewServiceBlock } from "@/components";
import { CartWareCard } from "./CartWareCard";

type ServiceListProps = {
  serviceList: OrderDetailItemListItem[];
  isService: number;
  product: {
    productName?: string;
    productImage?: string;
    productId: number;
  };
  showServiceDetail?: boolean;
};
export const ServiceList = (props: ServiceListProps) => {
  const { serviceList, isService, product, showServiceDetail } = props;

  const isFW = isService === 1;
  return (
    <>
      {isFW && (
        <View className="p-2 mb-2 flex flex-col gap-2">
          <View className="rounded-lg p-[24px] bg-linear-to-r from-gray-100 to-white text-[28px] font-semibold flex gap-2 justify-between">
            <View>{product?.productName}</View>
            <View className="text-sky-500">{serviceList.length}项服务</View>
          </View>
          {showServiceDetail && (
            <NewServiceBlock
              serviceList={serviceList.map((server) => {
                return {
                  id: server.itemId,
                  productId: product.productId,
                  totalPrice: server.price,
                  num: server.qty,
                  itemId: server.itemId,
                  itemName: server.itemName,
                  price: server.price,
                  selectedItems: [],
                  itemDesc: server.itemDesc,
                  createTime: server.createdAt,
                  updateTime: server.createdAt,
                  groupName: server.groupName,
                  unit: server.unit,
                };
              })}
            />
          )}
        </View>
      )}
      {!isFW &&
        serviceList.map((service) => {
          return (
            <CartWareCard
              itemName={service.itemName}
              key={service.itemId}
              product={product}
              border={false}
              shadow={false}
              price={service.price}
              qty={service.qty}
            />
          );
        })}
    </>
  );
};
