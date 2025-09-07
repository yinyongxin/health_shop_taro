import { View } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode } from "react";

type AppFeatureBlocksItemProps = {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const AppFeatureBlocksItem = (props: AppFeatureBlocksItemProps) => {
  const { title, icon, onClick, className } = props;
  return (
    <View className="w-1/5 pl-[24px]">
      <View
        className={classNames(
          "flex flex-col items-center gap-[16px]",
          className,
        )}
        onClick={onClick}
      >
        <View className="bg-gray-50 active:bg-gray-100 rounded-lg w-full py-[24px] flex justify-center items-center">
          {icon}
        </View>
        <View className="text-gray-500">{title}</View>
      </View>
    </View>
  );
};
