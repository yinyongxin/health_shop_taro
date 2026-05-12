import { getImagePath } from "@/utils";
import { Image, ImageProps } from "@tarojs/components";
import { previewImage } from "@tarojs/taro";

export interface AppImageProps extends Omit<ImageProps, "preview"> {
  preview?: boolean;
}

export const AppImage = (props: AppImageProps) => {
  const { src, preview, ...rest } = props;
  const srcUrl = src?.startsWith("http") ? src : getImagePath(src);
  return (
    <Image
      src={src ? srcUrl : ""}
      {...rest}
      onClick={() => {
        if (preview && srcUrl) {
          previewImage({ urls: [srcUrl], current: srcUrl });
        }
      }}
    />
  );
};
