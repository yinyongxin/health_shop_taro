import { AppFeatureBlocksItem, LucideIcon } from "@/components";
import { appRouter } from "@/router";
import { View } from "@tarojs/components";
import { showToast } from "@tarojs/taro";

export const FeatureBlocks = () => {
  return (
    <View className="bg-white rounded-[24px]">
      <View className="mt-[16px]">
        <View className="flex justify-between py-[24px] pr-[24px]">
          <AppFeatureBlocksItem
            title="联系客服"
            icon={<LucideIcon name="message-circle-more" size={28} />}
            onClick={() => {
              showToast({ title: "尽请期待", icon: "none" });
            }}
          />
          <AppFeatureBlocksItem
            title="收藏"
            icon={<LucideIcon name="star" size={28} />}
            onClick={() => {
              appRouter.navigateTo("myLikeList");
            }}
          />
          <View className="w-1/5"></View>
          <View className="w-1/5"></View>
          <View className="w-1/5"></View>
        </View>
      </View>
    </View>
  );
};
