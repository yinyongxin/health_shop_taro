import { View } from "@tarojs/components";
import { useAppUserStore } from "@/stores";
import { AddressCard } from "./AddressCard";

export const AddressList = () => {
  const { addressList } = useAppUserStore();
  return (
    <View className="flex flex-col gap-[16px] px-[24px]">
      {addressList.map((address) => {
        return <AddressCard key={address.id} info={address} />;
      })}
    </View>
  );
};
