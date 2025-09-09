import { BasePage } from "@/components"
import { usePageParams } from "@/hooks"
import { View } from "@tarojs/components"

/** 结算页面 */
export default () => {
  usePageParams((values) => {
    console.log('values', values)
  })
  return (
    <BasePage>
      <View>结算</View>
    </BasePage>
  )
}