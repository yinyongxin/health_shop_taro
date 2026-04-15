import { ProductDetail } from "@/client";
import { AppButton, AppFixedBottom, AppPopup } from "@/components";
import { EditAddressContent } from "@/components/EditAddressContent";
import { usePopupControl } from "@/hooks";
import { useAppUserStore } from "@/stores";
import { isIOS } from "@/utils";
import { View } from "@tarojs/components";
import classNames from "classnames";

type ActionsProps = {
  info: ProductDetail;
  handleBuy: () => void;
};

export const Actions = (props: ActionsProps) => {
  const { handleBuy } = props;

  const appUserStore = useAppUserStore();
  const addAddressControl = usePopupControl();
  const getAddAddressPopup = () => {
    return (
      <AppPopup
        title="新增地址"
        style={{
          height: "70vh",
        }}
        showClose
        destroyOnClose
        {...addAddressControl}
      >
        <View className="p-2 bg-gray-100 overflow-auto pb-20">
          <EditAddressContent
            success={() => {
              appUserStore.updateAddressList();
              addAddressControl.setOpen(false);
              handleBuy();
            }}
            btn={
              <AppFixedBottom>
                <AppButton className="w-full" status="primary">
                  保存
                </AppButton>
              </AppFixedBottom>
            }
          />
        </View>
      </AppPopup>
    );
  };
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
        <View className="flex-3 flex gap-2 py-[24px]">
          <AppButton
            className="flex-3"
            onClick={() => {
              if (
                appUserStore.addressList &&
                !appUserStore.addressList.length
              ) {
                addAddressControl.setOpen(true);
                return;
              }
              handleBuy();
            }}
          >
            立即购买
          </AppButton>
        </View>
      </View>
      {getAddAddressPopup()}
    </>
  );
};
