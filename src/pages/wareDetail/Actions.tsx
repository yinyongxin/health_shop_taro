import { LucideIcon, AppButton } from "@/components";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { View, Text } from "@tarojs/components";

export const Actions = () => {
  const appUserStore = useAppUserStore();
  return (
    <View className="fixed bottom-0 left-0 right-0 px-[24px] bg-blur flex app-shadow-lg">
      <View className="flex-1 flex items-center justify-around">
        <View className="flex flex-col active:text-blue-500 items-center gap-1">
          <LucideIcon name="phone" size={18} />
          <Text className="text-[20px]">客服</Text>
        </View>
        <View className="flex flex-col active:text-blue-500 items-center gap-1">
          <LucideIcon name="star" size={20} />
          <Text className="text-[20px]">收藏</Text>
        </View>
        <View
          className="flex flex-col active:text-blue-500 items-center gap-1"
          onClick={() => {
            appUserStore.updateTabActive("cart");
            appRouter.reLaunch("index");
          }}
        >
          <LucideIcon name="shopping-cart" size={20} />
          <Text className="text-[20px]">购物车</Text>
        </View>
      </View>
      <View className="flex-2 flex gap-[16px] py-[24px]">
        <AppButton status="warning" className="flex-1">
          加入购物车
        </AppButton>
        <AppButton status="error" className="flex-1">
          立即购买
        </AppButton>
      </View>
    </View>
  )
}