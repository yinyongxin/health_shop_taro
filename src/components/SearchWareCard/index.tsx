import { ProductInfo } from "@/client";
import { appRouter } from "@/router";
import { View, Image, Text } from "@tarojs/components";
import classNames from "classnames";
import { useState } from "react";
import { LucideIcon } from "../LucideIcon";
import { AppImage } from "../AppImage";

export type SearchWareCardProps = {
  info: ProductInfo;
  border?: boolean;
};
export const SearchWareCard = (props: SearchWareCardProps) => {
  const { border, info } = props;
  const [liked, setLiked] = useState(false);
  return (
    <View
      className={classNames("pt-[24px] pl-[24px] w-1/2", "relative")}
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
          "rounded-lg app-shadow-sm bg-white overflow-hidden",
          "relative",
          {
            "border-2 border-gray-100": border,
          },
        )}
      >
        <AppImage
          className="w-full h-[320px] bg-gray-200"
          src={props.info.mainImage}
          mode="aspectFill"
        />
        <View className="py-[16px] flex flex-col gap-[16px]">
          <View className="text-[28px] px-[16px] font-semibold truncate">
            {props.info.name}
          </View>
          <View className="text-[24px] px-[16px] text-gray-500 line-clamp-2 h-[60px] overflow-hidden">
            {props.info.description}
          </View>
          <View className=" px-[16px] flex justify-between items-end">
            <View className="flex gap-[4px] items-end">
              <Text className="text-[24px]">¥</Text>
              <Text className="text-[32px] text-rose-500">
                {props.info.price}
              </Text>
              <Text className="text-gary-500 line-through">
                {props.info.originalPrice}
              </Text>
            </View>
            <View className="text-[24px] text-gray-500">
              {/* 已售：{props.info.s} */}
            </View>
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
