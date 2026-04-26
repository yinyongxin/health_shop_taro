import { View, Text } from "@tarojs/components";
import { AddressInfo } from "@/client";
import {
  AppButton,
  AppFixedBottom,
  AppPopup,
  AppTag,
  LucideIcon,
} from "@/components";
import { usePopupControl } from "@/hooks";
import { AddressList } from "@/components/AddressList";
import { appRouter } from "@/router";
import classNames from "classnames";
import { maskIdNo, maskPhone } from "@/utils";
import { EditAddressContent } from "@/components/EditAddressContent";
import { useAppUserStore } from "@/stores";
import { useRef } from "react";

type AddressSelectProps = {
  address?: AddressInfo;
  handleSelectAddress?: (val: AddressInfo) => void;
  className?: string;
};
const AddressSelect = (props: AddressSelectProps) => {
  const { address, handleSelectAddress, className } = props;
  const selectAddressControl = usePopupControl();

  const appUserStore = useAppUserStore();
  const addAddressControl = usePopupControl();

  const getAddAddressPopup = () => {
    return (
      <AppPopup
        title="新增服务信息"
        style={{
          height: "70vh",
        }}
        showClose
        destroyOnClose
        {...addAddressControl}
      >
        <View className="p-2 bg-gray-100 overflow-auto pb-20 bg-gray-100">
          <EditAddressContent
            success={() => {
              appUserStore.updateAddressList();
              addAddressControl.setOpen(false);
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
      <View className={classNames(className, "flex flex-col gap-2")}>
        {address ? (
          <View
            onClick={() => {
              selectAddressControl.setOpen(true);
            }}
            className="flex flex-col gap-1"
          >
            <View className="flex items-center gap-2">
              <View>{address.receiverName}</View>
              <View>{maskPhone(address.receiverPhone)}</View>
              <View>{maskIdNo(address?.idNo || "")}</View>
            </View>
            <View className="flex justify-between items-center gap-2">
              <View className="flex flex-col gap-1">
                <View className="flex-1 text-black flex items-center gap-2">
                  <View>{address.province}</View>
                  <View>{address.city}</View>
                  <View>{address.district}</View>
                </View>
              </View>
              <View className="text-gray-400">
                <LucideIcon name="chevron-right" size={20} />
              </View>
            </View>
            <View className="flex gap-[8px]">
              <View>{address.detailAddress}</View>
            </View>
          </View>
        ) : (
          <View
            className="flex-1 text-black flex justify-between py-2"
            onClick={() => {
              addAddressControl.setOpen(true);
            }}
          >
            <View className="text-orange-500">购买请填写必要信息</View>
            <View>去填写</View>
          </View>
        )}
      </View>

      {getAddAddressPopup()}

      <AppPopup
        style={{
          height: "60vh",
        }}
        {...selectAddressControl}
        title="选择地址"
        leftAction={
          <Text
            onClick={() => {
              appRouter.navigateTo("addAddress");
            }}
            className="text-sky-500 font-bold"
          >
            新增地址
          </Text>
        }
        showClose
      >
        <AddressList
          selectId={address?.id}
          addressCardProps={{
            showActions: false,
            showIdNo: true,
            className: classNames("border border-gray-200 app-shadow"),
            handleClick: (info) => {
              handleSelectAddress?.(info);
              selectAddressControl.setOpen(false);
            },
          }}
        />
      </AppPopup>
    </>
  );
};

export default AddressSelect;
