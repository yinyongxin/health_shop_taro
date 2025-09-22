import { getWxShopCateProduct } from "@/client";
import { useRequest } from "@/hooks";
import { appRouter } from "@/router";
import { Swiper, Image } from "@taroify/core";
import { View } from "@tarojs/components";

export const Banners = () => {
  const dataRequest = useRequest(async () => {
    const res = await getWxShopCateProduct({
      query: { subCategoryId: "1" },
    });
    return res?.data;
  });
  const content = dataRequest.loading ? (
    <View className="h-[350px] flex-center bg-white"></View>
  ) : (
    <Swiper className="h-[350px]" autoplay={4000}>
      <Swiper.Indicator />
      {dataRequest.data?.rows?.map((item, index) => (
        <Swiper.Item
          key={index}
          className="bg-white"
          onClick={() => {
            appRouter.navigateTo("wareDetail", {
              query: {
                id: item.id.toString(),
              },
            });
          }}
        >
          <Image
            src={item.mainImage}
            className="w-full h-full rounded-lg"
            mode="aspectFill"
          />
        </Swiper.Item>
      ))}
    </Swiper>
  );
  return <View className="rounded-lg overflow-hidden">{content}</View>;
};
