import { AppCell, AppDivier, BasePage, LucideIcon } from "@/components";
import { View } from "@tarojs/components";
import { Avatar } from "@taroify/core";
import { appRouter } from "@/router";
import { orderPay } from "@/utils/order";
import { FeatureBlocks } from "./FeatureBlocks";
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
        <View className="px-[24px] mt-[32px]">
          <View className="flex gap-[24px]">
            <Avatar src="./static/images/default-avatar.png" size="large" />
            <View className="flex-1 flex flex-col justify-around">
              <View className="text-[32px] font-semibold">微信用户</View>
            </View>
          </View>
        </View>
        <View className="px-[24px] mt-[32px]">
          <MyOrder />
        </View>
        <View className="px-[24px] mt-[32px]">
          <FeatureBlocks />
        </View>
        <View className="mt-[32px] px-[24px]">
          <View className="rounded-[24px] overflow-hidden bg-white">
            <AppCell
              icon={<LucideIcon name="map-pin-house" size={20} />}
              onClick={() => {
                appRouter.navigateTo("addressManage");
              }}
            >
              地址管理
            </AppCell>
            {/* <AppDivier className="px-[32px]" /> */}
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
