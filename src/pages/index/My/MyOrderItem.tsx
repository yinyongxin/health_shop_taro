import { View } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode } from "react";

type MyOrderItemProps = {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const MyOrderItem = (props: MyOrderItemProps) => {
  const { title, icon, onClick, className } = props;
  return (
    <View
      className={classNames(
        "flex-1 flex flex-col items-center gap-[16px] py-[16px]",
        className,
      )}
      onClick={onClick}
    >
      <View className="bg-gray-50 active:bg-gray-100 rounded-lg w-full py-[24px] flex justify-center items-center">
        {icon}
      </View>
      <View className="text-gray-500">{title}</View>
    </View>
  );
};
