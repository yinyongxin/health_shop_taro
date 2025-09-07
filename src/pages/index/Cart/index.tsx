import { AppButton, BasePage } from "@/components";
import { CartWareCardList } from "@/components/CartWareCard/SearchWareCardList";
import { View, Text } from "@tarojs/components";

export const Cart = () => {
  return (
    <BasePage>
      <View className="pt-[24px] pb-[244px]">
        <View className="px-[24px]">
          <CartWareCardList />
        </View>
      </View>
      <View className="fixed bottom-[150px] left-0 right-0 px-[24px]">
        <View className="bg-blur app-shadow rounded-full p-[16px] flex">
          <View className="flex-4 flex items-center px-[32px]">
            <View className="flex-center gap-[8px]">
              <Text className="text-[32px]">合计</Text>
              <Text className="text-[32px] font-semibold">￥0.00</Text>
            </View>
          </View>
          <AppButton className="flex-1" round status="error">
            去结算
          </AppButton>
        </View>
      </View>
    </BasePage>
  );
};
