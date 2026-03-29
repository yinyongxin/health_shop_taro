import { ProductInfo } from "@/client";
import { appRouter } from "@/router";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
// import { useState } from "react";
// import { LucideIcon } from "../LucideIcon";
import { AppImage } from "../AppImage";

export type SearchWareCardProps = {
  info: ProductInfo;
  border?: boolean;
};
export const SearchWareCard = (props: SearchWareCardProps) => {
  const { border, info } = props;
  // const [liked, setLiked] = useState(false);
  return (
    <View
      className={classNames("pt-2 pl-2 w-1/2", "relative")}
      onClick={() => {
        appRouter.navigateTo("wareDetail", {
          query: {
            id: info.id.toString(),
          },
        });
      }}
    >
      <View
        className={classNames(
          "rounded-md bg-white overflow-hidden",
          "relative",
          {
            "border-2 border-gray-100": border,
          },
        )}
      >
        <View className="p-2">
          <AppImage
            className="w-full h-[280px] bg-gray-200 rounded-md"
            src={props.info.mainImage}
            mode="aspectFill"
          />
        </View>
        <View className="pb-2 flex flex-col gap-2">
          <View className="text-[28px] px-2 font-semibold truncate">
            {props.info.name}
          </View>
          <View className="text-[24px] px-2 text-gray-500 line-clamp-2 h-[60px] overflow-hidden">
            {props.info.description || "暂无描述"}
          </View>
          <View className=" px-2 flex justify-between items-end">
            <View className="flex gap-[8px] items-end text-rose-500 font-semibold">
              <Text className="text-[28px]">¥</Text>
              <Text className="text-[32px]">{props.info.price}</Text>
              {info.originalPrice !== info.price && (
                <Text className="text-gray-500 line-through">
                  {props.info.originalPrice}
                </Text>
              )}
            </View>
            <View className="text-[24px] text-gray-500">
              {/* 已售：{props.info.s} */}
            </View>
          </View>
        </View>
      </View>
      {/* <View
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
      </View> */}
    </View>
  );
};
