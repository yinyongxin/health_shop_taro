import { AppButton, AppCell, BasePage, LucideIcon } from "@/components";
import { usePageParams } from "@/hooks";
import { appRouter } from "@/router";
import { calculateTotalPrice } from "@/utils/price";
import { View } from "@tarojs/components";

/** 结算页面 */
export default () => {
  const pageParams = usePageParams<"settlement">((values) => {
    console.log("values", values);
  });
  return (
    <BasePage>
      <View className="pb-[160px]">
        <View className="px-[24px] pt-[24px]">
          <View className="bg-white rounded-xl pb-[12px]">
            <View className="flex justify-between px-[24px] py-[12px]">
              <View className="text-gray-500">配送</View>
              <View className="font-semibold">预计2026-01-01送达</View>
            </View>
            <View className="flex justify-between px-[24px] py-[12px]">
              <View className="text-gray-500">配送偏好</View>
              <View className="font-semibold">送货上门</View>
            </View>
          </View>
        </View>

        <View className="px-[24px] pt-[24px]">
          <View className="bg-white rounded-xl py-[12px]">
            <View className="flex justify-between px-[24px] py-[12px]">
              <View className="flex items-center gap-1">
                <View>商品总价</View>
                <View className="text-[20px] text-gray-500">
                  共{pageParams.list.length}件
                </View>
              </View>
              <View className="font-semibold flex items-end gap-[4px]">
                <View className="pb-[4px]">￥</View>
                <View className="text-[32px] font-semibold">
                  {calculateTotalPrice(pageParams.list)}
                </View>
              </View>
            </View>
            <View className="flex justify-between px-[24px] py-[12px]">
              <View className="">运费</View>
              <View className="font-semibold flex items-end gap-[4px]">
                <View className="pb-[4px]">￥</View>
                <View className="text-[32px] font-semibold">0.0</View>
              </View>
            </View>
            <View className="flex justify-between px-[24px] py-[12px]">
              <View className="text-[32px] font-semibold">合计</View>
              <View className="font-semibold flex items-end gap-[4px]">
                <View className="pb-[4px]">￥</View>
                <View className="text-[32px] font-semibold">
                  {calculateTotalPrice(pageParams.list)}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="px-[24px] pt-[24px]">
          <View className="bg-white rounded-xl pb-[12px] flex flex-col gap-[12px]">
            <AppCell right={<LucideIcon name="check" size={20} />}>
              支付宝支付
            </AppCell>
            <AppCell right={<View></View>}>微信支付</AppCell>
          </View>
        </View>
      </View>
      <View className="fixed app-shadow bottom-0 left-0 right-0 bg-blur p-[24px]">
        <AppButton
          className="w-full"
          onClick={() => {
            appRouter.navigateTo("payResult");
          }}
        >
          立即支付
        </AppButton>
      </View>
    </BasePage>
  );
};
