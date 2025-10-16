import { CartItem, postWxShopCartUpdate } from "@/client";
import { appRouter } from "@/router";
import { View, Image, Text } from "@tarojs/components";
import { useAppUserStore } from "@/stores";
import classNames from "classnames";
import { safeJson } from "@/utils";
import { AppTag } from "../AppTag";
import React from "react";

export type CartWareCardProps = {
  info: CartItem;
  border?: boolean;
  showNumControl?: boolean;
  shadow?: boolean;
  defaultNum?: number;
  bottom?: React.ReactNode;
};
export const CartWareCard = (props: CartWareCardProps) => {
  const appUserStore = useAppUserStore();
  const { border, showNumControl = true, shadow = true, info, bottom } = props;
  const handleAdd = async () => {
    const res = await postWxShopCartUpdate({
      body: {
        id: info.id!,
        quantity: info?.quantity! + 1,
      },
    });
    if (res.data?.code === 0) {
      appUserStore.updateCartInfo();
    }
  };
  const handleReduce = async () => {
    if (info?.quantity! <= 1) {
      return;
    }
    const res = await postWxShopCartUpdate({
      body: {
        id: info.id!,
        quantity: info?.quantity! - 1,
      },
    });
    if (res.data?.code === 0) {
      appUserStore.updateCartInfo();
    }
  };
  const goToDetailPage = () => {
    appRouter.navigateTo("wareDetail", {
      query: {
        id: props.info.productId?.toString()!,
      },
    });
  };
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
          <Image
            className="size-[180px] bg-gray-300 shrink-0 rounded-lg"
            mode="aspectFill"
            src={props.info?.image || ""}
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
      {bottom}
    </View>
  );
};
