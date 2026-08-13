import { View } from "@tarojs/components";
import classNames from "classnames";

export type AppDividerProps = {
  className?: string;
};

export const AppDivider = (props: AppDividerProps) => {
  const { className } = props;
  return (
    <View className={classNames(className)}>
      <View className="border-t-2 border-gray-100"></View>
    </View>
  );
};
