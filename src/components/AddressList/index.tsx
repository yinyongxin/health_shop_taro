import { View } from "@tarojs/components"
import { AddressCard } from "./AddressCard"

type AddressListProps = {

}

export const AddressList = (props: AddressListProps) => {
  return (
    <View className="flex flex-col gap-[16px] px-[24px]">
      <AddressCard />
    </View>
  )
}