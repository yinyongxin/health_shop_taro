import { WareInfo } from "@/client";
import { appRouter } from "@/router";
import { View, Image, Text } from "@tarojs/components";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { AppTag } from "../AppTag";
import { useAppUserStore } from "@/stores";

export type CartWareCardProps = {
  info: WareInfo;
  border?: boolean;
  showNumControl?: boolean;
  shadow?: boolean;
  numChange?: (num: number) => void;
};
export const CartWareCard = (props: CartWareCardProps) => {
  const appUserStore = useAppUserStore()
  const { border, showNumControl = true, shadow = true, numChange } = props;
  const [num, setNum] = useState(1);
  const handleAdd = () => {
    setNum(num + 1);
  };
  const handleReduce = () => {
    if (num <= 1) {
      return;
    }
    setNum(num - 1);
  };
  useEffect(() => {
    numChange?.(num)
    appUserStore.updateCartNum(props.info.id, num)
  }, [num])
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
            src={props.info.mainPicture}
            onClick={() => {
              appRouter.navigateTo("wareDetail", {
                query: {
                  id: props.info.id,
                }
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
                  id: props.info.id,
                }
              });
            }}
          >
            {props.info.name}
          </View>
          <View className="flex gap-1">
            <AppTag status="secondary">大小</AppTag>
            <AppTag status="secondary">颜色</AppTag>
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
              <View className="text-[28px]">{num}</View>
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
