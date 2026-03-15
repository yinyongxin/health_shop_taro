import { getWxShopBannerList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { AppImage } from "@/components";
import { useRequest } from "@/hooks";
import { Swiper } from "@taroify/core";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

export const Banners = () => {
  const { data, loading } = useRequest(async () => {
    const res = await getWxShopBannerList({
      query: { orgId: APP_ENV_CONFIG.ORG_ID },
    });
    return res.data?.data;
  });

  const handleClick = (jumpUrl?: string) => {
    if (!jumpUrl) return;
    Taro.navigateTo({ url: jumpUrl });
  };

  if (loading || !data?.length) {
    return <View className="h-[350px] flex-center bg-gray-100" />;
  }

  return (
    <View className="overflow-hidden">
      <Swiper className="h-[350px]" autoplay={4000}>
        <Swiper.Indicator />
        {data.map((item) => (
          <Swiper.Item key={item.id} onClick={() => handleClick(item.jumpUrl)}>
            <View className="bg-white size-full px-[24px]">
              <AppImage
                src={item.imagePath}
                className="w-full h-full rounded-xl"
                mode="aspectFill"
              />
            </View>
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  );
};
