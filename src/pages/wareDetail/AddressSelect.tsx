import { View, Text } from "@tarojs/components";
import { AddressInfo } from "@/client";
import { AppButton, AppPopup, AppTag, LucideIcon } from "@/components";
import { usePopupControl } from "@/hooks";
import { AddressList } from "@/components/AddressList";
import { appRouter } from "@/router";
import classNames from "classnames";
import { maskIdNo, maskPhone } from "@/utils";

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
        className={classNames(className, "flex flex-col gap-2")}
        onClick={() => {
          selectAddressControl.setOpen(true);
        }}
      >
        {address ? (
          <View className="flex flex-col gap-1">
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
          <View className="flex-1 text-black flex justify-between py-2">
            <View className="text-orange-500">购买需要地址信息</View>
            <View>去添加</View>
          </View>
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
        showClose
      >
        <AddressList
          selectId={address?.id}
          addressCardProps={{
            showActions: false,
            showIdNo: true,
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
