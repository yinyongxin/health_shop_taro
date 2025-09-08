import { BasePage } from "@/components";
import { usePageParams, useRequest } from "@/hooks";
import { Swiper } from "@taroify/core";
import { Image, View } from "@tarojs/components";
import { warelist } from "@/mock";
import { Evaluate } from "./Evaluate";
import { DetailInfo } from "./DetailInfo";
import { Actions } from "./Actions";
import { BaseInfo } from "./BaseInfo";
import { Delivery } from "./Delivery";

const WareDetail = () => {
  const pageParams = usePageParams<"wareDetail">();
  const { data } = useRequest(async () => {
    // const res = await getGetWare();
    const detail = warelist.find((item) => item.id === pageParams.id);
    return detail;
  });
  return (
    <BasePage>
      <View className="pb-[200px]">
        <Swiper className="h-[600px]" autoplay={4000}>
          <Swiper.Indicator />
          {data?.pictureList?.map((item, index) => (
            <Swiper.Item key={index}>
              <Image
                src={item}
                className="w-full h-full bg-gray-200"
                mode="aspectFill"
              />
            </Swiper.Item>
          ))}
        </Swiper>
        <View className="px-[24px] pt-[32px]">
          {data && <BaseInfo info={data} />}
        </View>
        <View className="px-[24px] pt-[32px]">
          <Delivery />
        </View>
        <View className="px-[24px] pt-[32px]">
          <Evaluate />
        </View>
        <DetailInfo />
      </View>

      <Actions />
    </BasePage>
  );
};
export default WareDetail;
