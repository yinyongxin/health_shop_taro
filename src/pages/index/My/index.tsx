import { AppCell, AppDivier, BasePage, LucideIcon } from "@/components";
import { Text, View } from "@tarojs/components";
import { Avatar } from "@taroify/core";
import { appRouter } from "@/router";
import { MyOrder } from "./MyOrder";

const UserMy = () => {
  return (
    <BasePage
      bgProps={{
        children: (
          <View
            className="h-[40vh]"
            style={{
              background:
                "linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 50%, #F8FAFC 100%)",
            }}
          />
        ),
      }}
    >
      <View className="pb-[144px]">
        {/* 用户信息卡片 */}
        <View className="px-3 mt-3">
          <View
            className="flex items-center gap-4 p-5 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 24px 0 rgba(14, 165, 233, 0.12)",
            }}
          >
            <View className="relative">
              <Avatar src="./static/images/default-avatar.png" size="large" />
              <View className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center border-2 border-white">
                <Text className="text-white text-xs">✓</Text>
              </View>
            </View>
            <View className="flex-1 flex flex-col">
              <Text className="text-[32px] font-semibold text-slate-800">
                微信用户
              </Text>
              <Text className="text-[24px] text-slate-500 mt-2">
                欢迎使用健康商城
              </Text>
            </View>
          </View>
        </View>

        {/* 我的订单 */}
        <View className="px-3 mt-4">
          <MyOrder />
        </View>

        {/* 功能菜单 */}
        <View className="mt-4 px-3">
          <View
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 2px 16px 0 rgba(0,0,0,0.04)",
            }}
          >
            <AppCell
              icon={
                <View className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <LucideIcon
                    className="text-amber-500"
                    name="hand-coins"
                    size={20}
                  />
                </View>
              }
              onClick={() => {
                appRouter.navigateTo("afterSalesService");
              }}
            >
              <Text className="text-slate-700">退款售后</Text>
            </AppCell>
            <AppDivier className="mx-5" />
            <AppCell
              icon={
                <View className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <LucideIcon
                    className="text-sky-500"
                    name="hand-platter"
                    size={20}
                  />
                </View>
              }
              onClick={() => {
                appRouter.navigateTo("myService");
              }}
            >
              <Text className="text-slate-700">我的服务</Text>
            </AppCell>
            <AppDivier className="mx-5" />
            <AppCell
              icon={
                <View className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <LucideIcon
                    className="text-emerald-500"
                    name="map-pin-house"
                    size={20}
                  />
                </View>
              }
              onClick={() => {
                appRouter.navigateTo("addressManage");
              }}
            >
              <Text className="text-slate-700">地址管理</Text>
            </AppCell>
          </View>
        </View>
      </View>
    </BasePage>
  );
};
export default UserMy;
