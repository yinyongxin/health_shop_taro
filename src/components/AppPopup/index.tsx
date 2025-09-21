import { Popup } from "@taroify/core";
import { PopupProps } from "@taroify/core/popup/popup";
import { View } from "@tarojs/components";
import { ReactNode } from "react";
import { Close } from "@taroify/icons";
import classNames from "classnames";

export type AppPopupProps = {
  title?: ReactNode;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  showClose?: boolean;
} & PopupProps;

export const AppPopup = (props: AppPopupProps) => {
  const {
    placement = "bottom",
    rounded = true,
    title,
    leftAction,
    rightAction,
    showClose = false,
    children,
    ...rest
  } = props;
  return (
    <Popup placement={placement} rounded={rounded} {...rest}>
      {(leftAction || leftAction || title) && (
        <View
          className={classNames(
            "h-[100px] w-full",
            " px-[32px]",
            "flex justify-start items-center",
            " absolute bg-white z-[1]",
          )}
        >
          <View className="flex-1 flex flex-start">{leftAction}</View>
          <View className="flex-2 text-[28px] font-bold flex-center">
            {title}
          </View>
          <View className="flex-1 flex flex-end">{rightAction}</View>
          {showClose && (
            <Popup.Close>
              <Close size={20} />
            </Popup.Close>
          )}
        </View>
      )}

      <View className={classNames({ "pt-[100px]": !!title })}>{children}</View>
    </Popup>
  );
};
