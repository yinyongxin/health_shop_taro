import { getWxShopBannerList } from "@/client";
import { AppImage } from "@/components";
import { useRequest } from "@/hooks";
import { Swiper } from "@taroify/core";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import classNames from "classnames";

export type BannersPropsType = {
  orgId?: string;
  className?: string;
};

export const Banners = (props: BannersPropsType) => {
  const { orgId, className } = props;

  const { data, loading } = useRequest(async () => {
    const res = await getWxShopBannerList({
      query: { orgId },
    });
    return res.data?.data;
  });

  const handleClick = (jumpUrl?: string) => {
    if (!jumpUrl) return;
    Taro.navigateTo({ url: jumpUrl });
  };

  if (!orgId) {
    return null;
  }

  if (loading || !data?.length) {
    return <View className="h-[350px] flex-center bg-gray-100" />;
  }

  return (
    <View className={classNames("overflow-hidden", className)}>
      <Swiper className="h-[400px]" autoplay={4000}>
        <Swiper.Indicator />
        {data.map((item) => (
          <Swiper.Item key={item.id} onClick={() => handleClick(item.jumpUrl)}>
            <View className="size-full px-[24px]">
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
