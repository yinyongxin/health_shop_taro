import { ProductInfo } from "@/client";
import { AppButton } from "@/components";
import { isIOS } from "@/utils";
import { View } from "@tarojs/components";
import classNames from "classnames";

type ActionsProps = {
  info: ProductInfo;
  handleBuy: () => void;
};

export const Actions = (props: ActionsProps) => {
  const { handleBuy } = props;
  return (
    <>
      <View
        className={classNames(
          "fixed bottom-0 left-0 right-0 px-[24px] bg-blur flex app-shadow-lg",
          {
            "pb-[24px]": isIOS(),
          },
        )}
      >
        <View className="flex-3 flex gap-[16px] py-[24px]">
          <AppButton
            className="flex-3"
            onClick={() => {
              handleBuy();
            }}
          >
            立即购买
          </AppButton>
        </View>
      </View>
    </>
  );
};
