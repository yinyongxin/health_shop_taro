import { View, Text } from "@tarojs/components";
import { Arrow } from "@taroify/icons";
import classNames from "classnames";
import { ReactNode } from "react";

export type TitleProps = {
  children?: ReactNode;
  className?: string;
  action?: {
    text: string;
    onClick?: () => void;
    icon?: ReactNode;
  };
  more?: {
    text?: string;
    onClick?: () => void;
  };
};

export const Title = (props: TitleProps) => {
  const { children, action, className, more } = props;

  return (
    <View
      className={classNames(
        "flex justify-between items-center gap-[12px] align-middle",
        className,
      )}
    >
      <View className="w-[12px] h-[32px] bg-linear-to-b from-blue-400 to-blue-500 rounded-full"></View>
      <View className="flex-1 flex items-center gap-[12px] font-semibold ">
        <Text className="text-[32px]">{children}</Text>
        {more && (
          <>
            <View className="border-l-2 border-gray-300 h-[24px]"></View>
            <View className="text-gray-400" onClick={more?.onClick}>
              <Text>{more?.text || "更多"}</Text>
              <Arrow />
            </View>
          </>
        )}
      </View>
      {action && (
        <View
          className="text-gray-500 text-[28px] flex items-center gap-[8px]"
          onClick={action?.onClick}
        >
          <Text>{action?.text}</Text>
          {action?.icon || <Arrow />}
        </View>
      )}
    </View>
  );
};
