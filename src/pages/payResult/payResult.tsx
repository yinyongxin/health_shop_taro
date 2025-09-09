import { AppButton, BasePage, LucideIcon } from "@/components";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { View, Text } from "@tarojs/components";

const PayResult = () => {
  const appUserStore = useAppUserStore();
  return (
    <BasePage
      bgProps={{
        className: "page-bg",
      }}
    >
      <View className="flex flex-col items-center justify-center pt-[200px]">
        <View className="size-[300px] rounded-full flex-center bg-linear-to-tr from-lime-300 to-lime-500">
          <LucideIcon name="circle-check" size={60} className="text-white" />
        </View>
        <Text className="text-[40px] font-semibold mt-[40px]">支付成功</Text>
        <Text className="text-[24px] text-gray-500 mt-[16px]">
          请耐心等待发货
        </Text>
        <View className="w-3/5 mt-[64px]">
          <AppButton
            onClick={() => {
              appUserStore.updateTabActive("home");
              appRouter.reLaunch("index");
            }}
          >
            返回首页
          </AppButton>
        </View>
      </View>
      {/* <View className="fixed bottom-0 left-0 right-0 bg-blur p-[24px]"></View> */}
    </BasePage>
  );
};
export default PayResult;
