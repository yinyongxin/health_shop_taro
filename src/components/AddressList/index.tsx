import { View } from "@tarojs/components";
import { useAppUserStore } from "@/stores";
import { AddressCard, AddressCardProps } from "./AddressCard";

type AddressListProps = {
  addressCardProps?: Partial<Omit<AddressCardProps, "info">>;
  selectId?: number;
};
export const AddressList = (props: AddressListProps) => {
  const { addressCardProps } = props;
  const { addressList } = useAppUserStore();
  return (
    <View className="flex flex-col gap-[16px] px-[24px]">
      {addressList.map((address) => {
        return (
          <AddressCard
            key={address.id}
            info={address}
            {...addressCardProps}
            checked={address.id === props.selectId}
          />
        );
      })}
    </View>
  );
};
