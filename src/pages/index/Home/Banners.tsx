import { getWxShopBannerList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { AppImage } from "@/components";
import { useRequest } from "@/hooks";
import { Swiper } from "@taroify/core";
import { View } from "@tarojs/components";

export const Banners = () => {
  const dataRequest = useRequest(async () => {
    const cateListRes = await getWxShopBannerList({
      query: { orgId: APP_ENV_CONFIG.ORG_ID },
    });
    console.log("轮播图数据", cateListRes.data?.data);
    return cateListRes.data?.data;
  });
  const content = dataRequest.loading ? (
    <View className="h-[350px] flex-center bg-white"></View>
  ) : (
    <Swiper className="h-[350px]" autoplay={4000}>
      <Swiper.Indicator />
      {dataRequest.data?.map((item, index) => (
        <Swiper.Item
          key={index}
          className="px-[24px]"
          onClick={() => {
            const { jumpUrl } = item;
            if (jumpUrl) {
              window.open(jumpUrl, "_blank");
            }
          }}
        >
          <View className="bg-white size-full">
            <AppImage
              src={item.imagePath}
              className="w-full h-full rounded-xl"
              mode="aspectFill"
            />
          </View>
        </Swiper.Item>
      ))}
    </Swiper>
  );
  return <View className="overflow-hidden">{content}</View>;
};
