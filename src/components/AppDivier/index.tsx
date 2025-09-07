import { View } from "@tarojs/components";
import classNames from "classnames";

export type AppDivierProps = {
  className?: string;
};

export const AppDivier = (props: AppDivierProps) => {
  const { className } = props;
  return (
    <View className={classNames(className)}>
      <View className="border-t-2 border-gray-100"></View>
    </View>
  );
};
