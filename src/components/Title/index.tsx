import { Text, View } from "@tarojs/components";
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
      className={classNames("flex justify-between items-center", className)}
    >
      <View className="flex items-center gap-3">
        <View className="w-1 h-[28px] bg-gradient-to-b from-sky-500 to-sky-400 rounded-full" />
        <Text className="text-[30px] font-semibold text-slate-800">{children}</Text>
        {more && (
          <View className="flex items-center gap-1 pl-2 border-l border-slate-200">
            <Text
              className="text-[24px] text-slate-400"
              onClick={more?.onClick}
            >
              {more?.text || "更多"}
            </Text>
            <Text className="text-slate-300 text-[20px]">›</Text>
          </View>
        )}
      </View>

      {action && (
        <View
          className="flex items-center gap-1 py-2 px-3 rounded-full active:bg-slate-100"
          onClick={action?.onClick}
        >
          <Text className="text-[24px] text-sky-500">{action?.text}</Text>
          {action?.icon || <Text className="text-sky-500 text-[20px]">›</Text>}
        </View>
      )}
    </View>
  );
};