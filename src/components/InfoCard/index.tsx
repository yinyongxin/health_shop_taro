import { Divider } from "@taroify/core";
import { View } from "@tarojs/components";
import { ReactNode } from "react";
import { InfoCardItem, InfoCardItemProps } from "./InfoCardItem";

export type InfoCardProps = {
  title?: ReactNode;
  list?: InfoCardItemProps[];
  children?: ReactNode;
};

export const InfoCard = (props: InfoCardProps) => {
  const { title, list, children } = props;
  return (
    <View className="bg-white app-shadow rounded-[12px] py-[24px]">
      <View className="px-[24px] text-[32px] font-semibold">{title}</View>
      {title && <Divider className="mt-[24px]" />}
      {list && list.length > 0 && (
        <View className="px-[24px] flex flex-col gap-[16px]">
          {list.map((item, index) => {
            return <InfoCardItem key={index} {...item} />;
          })}
        </View>
      )}
      {children}
    </View>
  );
};
