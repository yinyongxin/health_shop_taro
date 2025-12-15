import { getImagePath } from "@/utils";
import { Image, ImageProps } from "@tarojs/components";

export interface AppImageProps extends ImageProps {}
export const AppImage = (props: AppImageProps) => {
  const { src, ...rest } = props;
  const srcUrl = src.startsWith("http") ? src : getImagePath(src);
  return <Image src={src ? srcUrl : ""} {...rest} />;
};
