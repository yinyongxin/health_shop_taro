import { appRouter } from "@/router";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode } from "react";
import { AppTag } from "../AppTag";
import { AppImage } from "../AppImage";

export type CartWareCardProps = {
  product: {
    productName: string;
    productImage: string;
    productId: number;
  };
  price: number;
  itemName: string;
  border?: boolean;
  shadow?: boolean;
  bottom?: ReactNode;
  qty?: number;
};
export const CartWareCard = (props: CartWareCardProps) => {
  const {
    border,
    shadow = true,
    price,
    itemName,
    bottom,
    product,
    qty,
  } = props;
  const goToDetailPage = () => {
    appRouter.navigateTo("wareDetail", {
      query: {
        id: product.productId.toString()!,
      },
    });
  };
  return (
    <View
      className={classNames(
        "rounded-xl  bg-white overflow-hidden flex flex-col gap-[12px]",
      )}
    >
      <View
        className={classNames("flex", {
          "app-shadow-sm": shadow,
          "border-2 border-gray-100": border,
        })}
      >
        <View className="p-[24px] pr-[12] rounded-xl">
          <AppImage
            className="size-[180px] bg-gray-300 shrink-0 rounded-xl"
            mode="aspectFill"
            src={product.productImage || ""}
            onClick={() => {
              goToDetailPage();
            }}
          />
        </View>
        <View className="flex-1 overflow-auto py-[32px] px-[24px] pl-[12px] flex flex-col justify-between">
          <View
            className="text-[28px] font-semibold truncate"
            onClick={() => {
              goToDetailPage();
            }}
          >
            {product.productName}
          </View>
          <View className="flex gap-1">
            <AppTag status="secondary">{itemName}</AppTag>
          </View>
          <View className="flex justify-between items-end">
            <View className="flex-1 text-[32px] text-rose-500">
              <Text className="text-[24px]">¥</Text>
              <Text className="pl-[8px]">{price}</Text>
            </View>
            {qty && <View className="text-[32px]">×{qty}</View>}
          </View>
        </View>
      </View>
      {bottom}
    </View>
  );
};
