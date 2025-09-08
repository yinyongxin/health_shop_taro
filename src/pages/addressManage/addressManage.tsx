import { AppButton, BasePage, LucideIcon } from "@/components"
import { AddressList } from "@/components/AddressList"
import { View } from "@tarojs/components"

const AddressManage = () => {
  return (
    <>
      <BasePage wapperProps={{
        className: 'py-[24px] pb-[160px]'
      }}>
        <AddressList />
      </BasePage>
      <View className="p-2 bg-blur fixed bottom-0 w-full">
        <AppButton prefix={<LucideIcon name="plus" />} round>新增地址</AppButton>
      </View>
    </>
  )
}

export default AddressManage