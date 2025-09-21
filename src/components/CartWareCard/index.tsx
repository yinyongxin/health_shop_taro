import { CartItem, postWxShopCartUpdate } from "@/client";
import { appRouter } from "@/router";
import { View, Image, Text } from "@tarojs/components";
import { useAppUserStore } from "@/stores";
import classNames from "classnames";
import { safeJson } from "@/utils";
import { useState } from "react";
import { AppTag } from "../AppTag";

export type CartWareCardProps = {
  info: CartItem;
  border?: boolean;
  showNumControl?: boolean;
  shadow?: boolean;
  defaultNum?: number;
};
export const CartWareCard = (props: CartWareCardProps) => {
  const appUserStore = useAppUserStore();
  const { border, showNumControl = true, shadow = true, info } = props;
  const handleAdd = async () => {
    const res = await postWxShopCartUpdate({
      body: {
        id: info.id!,
        quantity: info?.quantity! + 0,
      },
    });
  };
  const handleReduce = async () => {
    const res = await postWxShopCartUpdate({
      body: {
        id: info.id!,
        quantity: info?.quantity! + 0,
      },
    });
  };
  return (
    <View>
      <View
        className={classNames("rounded-lg  bg-white overflow-hidden", "flex", {
          "app-shadow-sm": shadow,
          "border-2 border-gray-100": border,
        })}
      >
        <View className="p-[24px] pr-[12] rounded-lg">
          <Image
            className="size-[180px] bg-gray-300 shrink-0 rounded-lg"
            mode="aspectFill"
            src={props.info?.mainPicture}
            onClick={() => {
              appRouter.navigateTo("wareDetail", {
                query: {
                  id: props.info.productName?.toString()!,
                },
              });
            }}
          />
        </View>
        <View className="flex-1 overflow-auto py-[32px] px-[24px] pl-[12px] flex flex-col justify-between">
          <View
            className="text-[28px] font-semibold truncate"
            onClick={() => {
              appRouter.navigateTo("wareDetail", {
                query: {
                  id: props.info.productId?.toString()!,
                },
              });
            }}
          >
            {props.info.productName}
          </View>
          <View className="flex gap-1">
            <AppTag status="secondary">
              {Object.values(safeJson.parse(props.info?.skuName || "", {}))}
            </AppTag>
          </View>
          <View className="flex justify-between items-end">
            <View className="flex-1 text-[32px] text-rose-500">
              <Text className="text-[24px]">¥</Text>
              <Text className="pl-[8px]">{props.info.price}</Text>
            </View>
            <View className="shirnk-0 flex items-center gap-2">
              {showNumControl && (
                <AppTag
                  status="secondary"
                  className="size-[48px]"
                  onClick={() => {
                    handleReduce();
                  }}
                >
                  -
                </AppTag>
              )}
              {!showNumControl && <View className="text-[28px]">数量</View>}
              <View className="text-[28px]">{info.quantity}</View>
              {showNumControl && (
                <AppTag
                  status="secondary"
                  className="size-[48px]"
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  +
                </AppTag>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
