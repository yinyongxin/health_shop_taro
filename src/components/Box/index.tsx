import { View, ViewProps } from "@tarojs/components";
import classNames from "classnames";

export type BoxProps = {
  bgProps?: ViewProps;
  wrapperProps?: ViewProps;
  radius?: "sm" | "md" | "lg";
} & ViewProps;

export const Box = (props: BoxProps) => {
  const { bgProps, children, radius, className, wrapperProps, ...rest } = props;
  const {
    children: bgChildren,
    className: bgClassName,
    ...bgRest
  } = bgProps || {};

  const { className: wrapperClassName, ...wrapperRest } = wrapperProps || {};

  return (
    <View className={classNames("relative", className)} {...rest}>
      {bgProps && (
        <View
          className={classNames(
            "absolute inset-0",
            {
              "rounded-[2px]": radius === "sm",
              "rounded-[24px]": radius === "md",
              "rounded-[32px]": radius === "lg",
            },
            bgClassName,
          )}
          {...bgRest}
        >
          {bgChildren}
        </View>
      )}
      <View
        className={classNames("relative h-full", wrapperClassName)}
        {...wrapperRest}
      >
        {children}
      </View>
    </View>
  );
};
