import { AppFeatureBlocksItem, LucideIcon } from "@/components";
import { appRouter } from "@/router";
import { View, Image } from "@tarojs/components";

export const FeatureBlocks = () => {
  return (
    <View className="bg-white rounded-[24px]">
      <View className="mt-[16px]">
        <View className="flex justify-between py-[24px] pr-[24px]">
          <AppFeatureBlocksItem
            title="联系客服"
            icon={
              <LucideIcon name="message-circle-more" size={28} />
              // <Image
              //   className="size-[80px]"
              //   src="assets\svgs\medical-history-svgrepo-com.svg"
              // />
            }
          />
          <AppFeatureBlocksItem
            title="收藏"
            icon={
              <LucideIcon name="star" size={28} />
              // <Image
              //   className="size-[80px]"
              //   src="assets\svgs\medical-history-svgrepo-com.svg"
              // />
            }
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
