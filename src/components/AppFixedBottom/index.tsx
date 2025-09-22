import { isIOS } from "@/utils";
import { View } from "@tarojs/components";
import classNames from "classnames";

type AppFixedBottomProps = {
  children?: React.ReactNode;
  className?: string;
};
export const AppFixedBottom = (props: AppFixedBottomProps) => {
  const { children, className } = props;
  return (
    <View
      className={classNames(
        "fixed z-[50] bottom-0 left-0 right-0 bg-white px-[24px] py-[24px] app-shadow",
        {
          "pb-[48px]": isIOS(),
        },
        className,
      )}
    >
      {children}
    </View>
  );
};
