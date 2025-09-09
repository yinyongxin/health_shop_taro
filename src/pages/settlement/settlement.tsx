import { BasePage } from "@/components"
import { CartWareCardList } from "@/components/CartWareCard/SearchWareCardList"
import { usePageParams } from "@/hooks"
import { View } from "@tarojs/components"

/** 结算页面 */
export default () => {
  const pageParams = usePageParams<'settlement'>((values) => {
    console.log('values', values)
  })
  return (
    <BasePage>
      <View>
        <View className="px-[24px] pt-[24px]">
          <View className="bg-white rounded-lg">
            <CartWareCardList data={pageParams.list} className="gap-0!" cartWareCardProps={{
              showNumControl: false,
              shadow: false
            }} />
          </View>
        </View>
      </View>
    </BasePage>
  )
}