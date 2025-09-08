import { getGetBannerList } from "@/client";
import { useRequest } from "@/hooks";
import { Swiper, Image } from "@taroify/core";
import { View } from "@tarojs/components";

export const Banners = () => {
  const dataRequest = useRequest(async () => {
    const res = await getGetBannerList();
    return [
      "https://img1.baidu.com/it/u=2437736190,1883216804&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=500",
      "https://img1.baidu.com/it/u=2078821852,4115791612&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
    ];
  });
  return (
    <View className="rounded-lg overflow-hidden">
      <Swiper className="h-[350px]" autoplay={4000}>
        <Swiper.Indicator />
        {dataRequest.data?.map((item, index) => (
          <Swiper.Item key={index} className="bg-white">
            <Image
              src={item}
              className="w-full h-full rounded-lg"
              mode="aspectFill"
            />
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  );
};
