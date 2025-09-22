import { isH5 } from "@/utils";
import { View, ViewProps } from "@tarojs/components";
import classNames from "classnames";

export type BasePageProps = {
  bgProps?: ViewProps;
  wapperProps?: ViewProps;
  fullScreen?: boolean;
  loading?: boolean;
} & ViewProps;

export const BasePage = (props: BasePageProps) => {
  const {
    bgProps,
    children,
    className,
    wapperProps,
    fullScreen,
    loading,
    ...rest
  } = props;
  const {
    children: bgChildren,
    className: bgClassName,
    ...bgRest
  } = bgProps || {};

  const { className: wapperClassName, ...wapperRest } = wapperProps || {};
  const height = isH5 ? "h-dvh" : "h-[100vh]";
  const minHeight = isH5 ? "min-h-dvh" : "min-h-[100vh]";
  return (
    <View
      className={classNames(
        "relative flex flex-col",
        { [height]: fullScreen, [minHeight]: !fullScreen },
        className,
      )}
      {...rest}
    >
      {bgProps && (
        <View
          className={classNames("absolute inset-0", bgClassName)}
          {...bgRest}
        >
          {bgChildren}
        </View>
      )}

      <View
        className={classNames(
          "relative flex-1 flex flex-col",
          "overflow-auto",
          wapperClassName,
        )}
        {...wapperRest}
      >
        {children}
      </View>
      {loading && <View className="absolute inset-0 bg-black/20 z-[10]"></View>}
    </View>
  );
};
