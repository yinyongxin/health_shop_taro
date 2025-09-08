import { View } from "@tarojs/components"
import { AddressCard } from "./AddressCard"

type AddressListProps = {

}

export const AddressList = (props: AddressListProps) => {
  return (
    <View>
      <AddressCard />
    </View>
  )
}