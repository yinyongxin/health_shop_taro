import { WareInfo } from "@/client";
import { appRouter } from "@/router";
import { View, Image, Text } from "@tarojs/components";
import classNames from "classnames";
import { useState } from "react";
import { LucideIcon } from "../LucideIcon";

export type SearchWareCardProps = {
  info: WareInfo;
  border?: boolean;
};
export const SearchWareCard = (props: SearchWareCardProps) => {
  const { border, info } = props;
  const [liked, setLiked] = useState(info.liked);
  return (
    <View
      className={classNames("pt-[24px] pl-[24px] w-1/2", "relative")}
      onClick={() => {
        appRouter.navigateTo("wareDetail");
      }}
    >
      <View
        className={classNames(
          "rounded-lg app-shadow-sm bg-white overflow-hidden",
          "relative",
          {
            "border-2 border-gray-100": border,
          },
        )}
      >
        <Image
          className="w-full h-[320px] bg-gray-200"
          mode="widthFix"
          src={props.info.mainPicture}
        />
        <View className="py-[16px] flex flex-col gap-[16px]">
          <View className="text-[28px] px-[16px] font-semibold truncate">
            {props.info.name}
          </View>
          <View className="text-[24px] px-[16px] text-gray-500 line-clamp-2 h-[60px] overflow-hidden">
            {props.info.deac}
          </View>
          <View className=" px-[16px] flex justify-between items-end">
            <View className="text-[32px] text-rose-500">
              <Text className="text-[24px]">¥</Text>
              <Text>{props.info.price}</Text>
            </View>
            <View className="text-[24px] text-gray-500">库存：{100}</View>
          </View>
        </View>
      </View>
      <View
        className="absolute top-[48px] right-[24px] "
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
      >
        <View
          className={classNames(
            "bg-blur size-[48px] flex-center rounded-full",
            {
              "bg-error text-white": liked,
            },
          )}
        >
          <LucideIcon name="star" />
        </View>
      </View>
    </View>
  );
};
