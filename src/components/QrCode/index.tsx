import { View, Image } from "@tarojs/components";
import classNames from "classnames";
import { AppImage } from "../AppImage";

export type QrCodeProps = {
  className?: string;
};
export const QrCode = (props: QrCodeProps) => {
  const { className } = props;
  return (
    <View className={classNames("flex flex-center", className)}>
      <Image className="size-[600px]" src="./static/images/order.png"></Image>
    </View>
  );
};
