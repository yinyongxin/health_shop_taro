import { View } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode } from "react";

export type InfoCardItemProps = {
  label?: ReactNode;
  value?: ReactNode;
  lableClassName?: string;
  valueClassName?: string;
};

export const InfoCardItem = (props: InfoCardItemProps) => {
  const { label, value, lableClassName, valueClassName } = props;
  return (
    <View className="flex text-[26px] gap-[24px]">
      <View>
        <View
          className={classNames("text-[#525252] w-[110px]", lableClassName)}
        >
          {label}
        </View>
      </View>
      <View className={classNames("flex-1 font-semibold", valueClassName)}>
        {value}
      </View>
    </View>
  );
};
