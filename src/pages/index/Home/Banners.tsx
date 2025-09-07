import { getGetBannerList } from "@/client";
import Box from "@/components/Box";
import { useRequest } from "@/hooks";
import { Swiper, Image } from "@taroify/core";
import { View } from "@tarojs/components";

export const Banners = () => {
  const dataRequest = useRequest(async () => {
    const res = await getGetBannerList();
    return res.data;
  });
  return (
    <View className="rounded-lg bg-white overflow-hidden">
      <Swiper className="h-[350px]" autoplay={4000}>
        <Swiper.Indicator />
        {dataRequest.data?.map((item, index) => (
          <Swiper.Item key={index}>
            <Image src={item} className="w-full h-full rounded-lg" />
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  );
};
