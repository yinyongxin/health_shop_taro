import { CartItem } from "@/client";
import { appRouter } from "@/router";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { safeJson } from "@/utils";
import { ReactNode } from "react";
import { AppTag } from "../AppTag";
import { AppImage } from "../AppImage";

export type CartWareCardProps = {
  info: CartItem;
  border?: boolean;
  shadow?: boolean;
  bottom?: ReactNode;
};
export const CartWareCard = (props: CartWareCardProps) => {
  const { border, shadow = true, info, bottom } = props;
  const goToDetailPage = () => {
    appRouter.navigateTo("wareDetail", {
      query: {
        id: info.productId?.toString()!,
      },
    });
  };

  const skuNames = Object.values(
    safeJson.parse(info?.itemName || "", {}),
  ) as string[];

  return (
    <View
      className={classNames(
        "rounded-lg  bg-white overflow-hidden flex flex-col gap-[12px]",
      )}
    >
      <View
        className={classNames("flex", {
          "app-shadow-sm": shadow,
          "border-2 border-gray-100": border,
        })}
      >
        <View className="p-[24px] pr-[12] rounded-lg">
          <AppImage
            className="size-[180px] bg-gray-300 shrink-0 rounded-lg"
            mode="aspectFill"
            src={info?.productImage || ""}
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
            {info.productName}
          </View>
          <View className="flex gap-1">
            {skuNames && skuNames.length > 0 && (
              <AppTag status="secondary">{skuNames}</AppTag>
            )}
          </View>
          <View className="flex justify-between items-end">
            <View className="flex-1 text-[32px] text-rose-500">
              <Text className="text-[24px]">¥</Text>
              <Text className="pl-[8px]">{info.price}</Text>
            </View>
          </View>
        </View>
      </View>
      {bottom}
    </View>
  );
};
