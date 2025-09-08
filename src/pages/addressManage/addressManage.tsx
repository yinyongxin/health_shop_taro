import { BasePage } from "@/components"
import { AddressList } from "@/components/AddressList"
import { View } from "@tarojs/components"

const AddressManage = () => {
  return (
    <BasePage wapperProps={{
      className: 'py-[24px]'
    }}>
      <AddressList />
    </BasePage>
  )
}

export default AddressManage