import { View, ViewProps } from "@tarojs/components";
import classNames from "classnames";

export type BoxProps = {
  bgProps?: ViewProps;
  wapperProps?: ViewProps;
  radius?: "sm" | "md" | "lg";
} & ViewProps;

const Box = (props: BoxProps) => {
  const { bgProps, children, radius, className, wapperProps, ...rest } = props;
  const {
    children: bgChildren,
    className: bgClassName,
    ...bgRest
  } = bgProps || {};

  const { className: wapperClassName, ...wapperRest } = wapperProps || {};

  return (
    <View className={classNames("relative", className)} {...rest}>
      {bgProps && (
        <View
          className={classNames(
            "absolute inset-0",
            {
              "roudned-[16px]": radius === "sm",
              "roudned-[24px]": radius === "md",
              "roudned-[32px]": radius === "lg",
            },
            bgClassName,
          )}
          {...bgRest}
        >
          {bgChildren}
        </View>
      )}
      <View
        className={classNames("relative h-full", wapperClassName)}
        {...wapperRest}
      >
        {children}
      </View>
    </View>
  );
};
export default Box;
