import { getGetBannerList } from "@/client";
import Box from "@/components/Box";
import { useRequest } from "@/hooks";
import { Swiper, Image } from "@taroify/core";

export const Banners = () => {
  const dataRequest = useRequest(async () => {
    const res = await getGetBannerList();
    return res.data;
  });
  return (
    <Box
      bgProps={{
        className: "rounded-lg bg-white",
      }}
    >
      <Swiper className="h-[350px]" autoplay={4000}>
        <Swiper.Indicator />
        {dataRequest.data?.map((item, index) => (
          <Swiper.Item key={index}>
            <Image src={item} className="w-full h-full rounded-lg" />
          </Swiper.Item>
        ))}
      </Swiper>
    </Box>
  );
};
