import { View } from "@tarojs/components";
import { FC, PropsWithChildren, ReactNode } from "react";
import { LucideIcon } from "../LucideIcon";

export const AppCell: FC<
  PropsWithChildren<{
    icon: ReactNode;
    onClick?: () => void;
  }>
> = ({ icon, onClick, children }) => {
  return (
    <View
      className="flex items-center gap-[32px] px-[32px] py-[24px] active:bg-gray-50"
      onClick={() => onClick?.()}
    >
      {icon}
      <View className="flex-1 text-[28px] font-semibold">{children}</View>
      <LucideIcon name="chevron-right" size={24} className="text-gray-300" />
    </View>
  );
};
