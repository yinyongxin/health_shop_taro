import { AppCell, AppDivier, BasePage, LucideIcon } from "@/components";
import { View } from "@tarojs/components";
import { Avatar } from "@taroify/core";
import { appRouter } from "@/router";
import { MyOrder } from "./MyOrder";

const UserMy = () => {
  return (
    <BasePage
      bgProps={{
        children: (
          <View className="h-[40vh] bg-linear-to-b from-[#E5ECFB] via-[#D7E8FD] to-[#f6f6f6]"></View>
        ),
      }}
    >
      <View className="pb-[144px]">
        <View className="px-2 mt-3">
          <View className="flex gap-2">
            <Avatar src="./static/images/default-avatar.png" size="large" />
            <View className="flex-1 flex flex-col justify-around">
              <View className="text-3 font-semibold">微信用户</View>
            </View>
          </View>
        </View>
        <View className="px-2 mt-3">
          <MyOrder />
        </View>
        {/* <View className="px-2 mt-3">
          <FeatureBlocks />
        </View> */}
        <View className="mt-3 px-2">
          <View className="rounded-lg overflow-hidden bg-white">
            <AppCell
              icon={<LucideIcon name="hand-coins" size={20} />}
              onClick={() => {
                appRouter.navigateTo("afterSalesService");
              }}
            >
              退款售后
            </AppCell>
            <AppDivier className="px-3" />
            <AppCell
              icon={<LucideIcon name="hand-platter" size={20} />}
              onClick={() => {
                appRouter.navigateTo("myService");
              }}
            >
              我的服务
            </AppCell>
            <AppDivier className="px-3" />
            <AppCell
              icon={<LucideIcon name="map-pin-house" size={20} />}
              onClick={() => {
                appRouter.navigateTo("addressManage");
              }}
            >
              地址管理
            </AppCell>

            {/* <AppCell
              icon={<LucideIcon name="settings" size={20} />}
              onClick={() => {
                showToast({ title: "尽请期待", icon: "none" });
              }}
            >
              设置
            </AppCell> */}
          </View>
        </View>
      </View>
    </BasePage>
  );
};
export default UserMy;
