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
      className={classNames("flex-1 flex flex-col items-center gap-2", className)}
      onClick={onClick}
    >
      <View
        className="w-full h-[90px] rounded-2xl flex items-center justify-center relative"
        style={{
          background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
        }}
      >
        {icon}
        <View className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-sky-500 flex items-center justify-center">
          <View className="w-1.5 h-1.5 rounded-full bg-white" />
        </View>
      </View>
      <Text className="text-[22px] text-slate-600">{title}</Text>
    </View>
  );
};