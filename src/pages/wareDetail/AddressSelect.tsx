import { View, Text } from "@tarojs/components";
import { AddressInfo } from "@/client";
import { AppButton, AppPopup, AppTag, LucideIcon } from "@/components";
import { usePopupControl } from "@/hooks";
import { AddressList } from "@/components/AddressList";
import { appRouter } from "@/router";
import classNames from "classnames";
import { maskPhone } from "@/utils";

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
      <View className={classNames(className, "flex flex-col gap-[8px]")}>
        <View className="flex justify-between items-center gap-2">
          <View
            className="flex-1 text-black"
            onClick={() => {
              selectAddressControl.setOpen(true);
            }}
          >
            {address ? (
              <View className="flex-1 text-black flex items-center gap-2">
                <AppTag>{address.tag}</AppTag>
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
        {address && (
          <>
            <View className="flex gap-[8px]">
              <View>{address.detailAddress}</View>
            </View>
            <View className="flex gap-[8px]">
              <View>{address.receiverName}</View>
              <View>{maskPhone(address.receiverPhone)}</View>
            </View>
          </>
        )}
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
            isMaskPhone: true,
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
