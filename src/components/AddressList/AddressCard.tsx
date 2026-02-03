import { AddressInfo, getWxShopAddrDel, postWxShopAddrEdit } from "@/client";
import { Checkbox, Dialog } from "@taroify/core";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { appToast, maskPhone } from "@/utils";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { AppTag } from "../AppTag";

export type AddressCardProps = {
  info: AddressInfo;
  showActions?: boolean;
  className?: string;
  checked?: boolean;
  handleClick?: (info: AddressInfo) => void;
  rightAction?: React.ReactNode;
  isMaskPhone?: boolean;
};

export const AddressCard = (props: AddressCardProps) => {
  const {
    showActions = true,
    className,
    info,
    checked,
    handleClick,
    rightAction,
    isMaskPhone,
  } = props;
  const appUserStore = useAppUserStore();
  const handleDelete = async () => {
    const res = await getWxShopAddrDel({
      query: {
        id: info.id?.toString(),
      },
    });
    if (res.data?.code === 0) {
      appUserStore.updateAddressList();
      appToast.success("删除成功");
    } else {
      appToast.error(res?.data?.msg ?? "删除失败");
    }
  };

  const handleSetDefault = async () => {
    const isDefault = info.isDefault === 1 ? 0 : 1;
    if (appUserStore.addressList.length === 1 || info.isDefault === 1) {
      return;
    }
    const res = await postWxShopAddrEdit({
      body: {
        id: info.id,
        isDefault,
      },
    });
    if (res.data?.code === 0) {
      appUserStore.updateAddressList();
      appToast.success("设置成功");
    } else {
      appToast.error(res?.data?.msg ?? "设置失败");
    }
  };

  return (
    <View
      className={classNames("bg-white rounded-lg py-[24px] ", className)}
      onClick={() => handleClick?.(info)}
    >
      <View className="flex">
        <View className="flex-1 flex flex-col gap-[16px]">
          <View className="w-full px-2 flex justify-between">
            <View className="flex items-center gap-2">
              <AppTag>{info.tag}</AppTag>
              <View className="text-[28px] font-semibold">
                {info.receiverName}
              </View>
              <View>
                {isMaskPhone
                  ? maskPhone(info.receiverPhone)
                  : info.receiverPhone}
              </View>
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
        </View>
        {rightAction}
      </View>
      {showActions && (
        <View className="border-t border-gray-200 px-2 pt-2 mt-2 flex justify-between items-center">
          <Checkbox
            checked={info.isDefault === 1}
            size={18}
            className="text-[24px]!"
            onClick={() => handleSetDefault()}
          >
            默认地址
          </Checkbox>
          <View className="flex gap-2 items-center">
            <View
              className="text-rose-500"
              onClick={() => {
                Dialog.confirm({
                  title: "确定删除吗？",

                  onConfirm: () => {
                    handleDelete();
                  },
                });
              }}
            >
              删除
            </View>
            <View
              className="text-sky-500"
              onClick={() => {
                appRouter.navigateTo("editAddress", {
                  query: { detail: info },
                });
              }}
            >
              编辑
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
