import { View } from "@tarojs/components";
import { useAppUserStore } from "@/stores";
import { Empty } from "@taroify/core";
import { AddressCard, AddressCardProps } from "./AddressCard";

type AddressListProps = {
  addressCardProps?: Partial<Omit<AddressCardProps, "info">>;
  selectId?: number;
};
export const AddressList = (props: AddressListProps) => {
  const { addressCardProps } = props;
  const { addressList } = useAppUserStore();

  if (!addressList.length) {
    return (
      <Empty>
        <Empty.Image />
        <Empty.Description>空空如也</Empty.Description>
      </Empty>
    );
  }
  return (
    <View className="flex flex-col gap-2 px-[24px]">
      {addressList.map((address) => {
        return (
          <AddressCard
            key={address.id}
            info={address}
            {...addressCardProps}
            showIdNo
            checked={address.id === props.selectId}
          />
        );
      })}
    </View>
  );
};
