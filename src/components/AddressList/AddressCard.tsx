import { AddressInfo } from "@/client";
import { Checkbox } from "@taroify/core";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { AppTag } from "../AppTag";

export type AddressCardProps = {
  info: AddressInfo;
  showActions?: boolean;
  className?: string;
  checked?: boolean;
};

export const AddressCard = (props: AddressCardProps) => {
  const { showActions = true, className, info, checked } = props;
  console.log({ checked });
  return (
    <View
      className={classNames(
        "bg-white rounded-lg app-shadow py-[24px] flex flex-col gap-[16px]",
        className,
      )}
    >
      <View className="w-full px-2 flex justify-between">
        <View className="flex items-center gap-2">
          <AppTag>{info.tag}</AppTag>
          <View className="text-[28px] font-semibold">{info.receiverName}</View>
          <View>{info.receiverPhone}</View>
        </View>
        <View>
          {checked !== undefined && checked && (
            <AppTag status="error">当前地址</AppTag>
          )}
        </View>
      </View>
      <View className="flex items-center gap-2 px-2">
        <View>{info.province}</View>
        <View>{info.city}</View>
        <View>{info.district}</View>
        <View>{info.street}</View>
      </View>
      <View className="px-2">
        <View>{info.detailAddress}</View>
      </View>
      {showActions && (
        <View className="border-t border-gray-200 px-2 pt-2 flex justify-between items-center">
          <Checkbox
            checked={info.isDefault === 1}
            size={18}
            className="text-[24px]!"
          >
            默认地址
          </Checkbox>
          <View className="flex gap-2 items-center">
            <View className="text-rose-500">删除</View>
            <View className="text-sky-500">编辑</View>
          </View>
        </View>
      )}
    </View>
  );
};
