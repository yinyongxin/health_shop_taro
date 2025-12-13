import { View, Text } from "@tarojs/components";
import { AddressInfo } from "@/client";
import { AppButton, AppPopup, LucideIcon } from "@/components";
import { usePopupControl } from "@/hooks";
import { AddressList } from "@/components/AddressList";
import { appRouter } from "@/router";
import Box from "@/components/Box";
import classNames from "classnames";

type AddressSelectProps = {
  address?: AddressInfo;
  handleSelectAddress?: (val: AddressInfo) => void;
  className?: string;
};
const AddressSelect = (props: AddressSelectProps) => {
  const { address, handleSelectAddress, className } = props;
  const selectAddressControl = usePopupControl();
  return (
    <>
      <View
        className={classNames(
          "flex justify-between items-center gap-2 py-[12px]",
          className,
        )}
      >
        <View className="text-gray-400">地址</View>

        <View
          className="flex-1 text-black"
          onClick={() => {
            selectAddressControl.setOpen(true);
          }}
        >
          {address ? (
            <View className="flex-1 text-black flex gap-2">
              <View>{address.province}</View>
              <View>{address.city}</View>
              <View>{address.district}</View>
            </View>
          ) : (
            <View className="flex-1 text-black flex">去添加</View>
          )}
        </View>
        <View className="text-gray-400">
          <LucideIcon name="chevron-right" size={20} />
        </View>
      </View>
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
        footer={
          <AppButton
            className="w-full"
            onClick={() => selectAddressControl.setOpen(false)}
          >
            确定
          </AppButton>
        }
        showClose
      >
        <AddressList
          selectId={address?.id}
          addressCardProps={{
            showActions: false,
            handleClick: (info) => {
              handleSelectAddress?.(info);
            },
          }}
        />
      </AppPopup>
    </>
  );
};

export default AddressSelect;
