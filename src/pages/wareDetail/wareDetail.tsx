import { getGetWare } from "@/client";
import { AppButton, AppTag, BasePage, LucideIcon } from "@/components";
import Box from "@/components/Box";
import { useRequest } from "@/hooks";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { Swiper } from "@taroify/core";
import { Image, View, Text } from "@tarojs/components";

const WareDetail = () => {
  const appUserStore = useAppUserStore();
  const { data } = useRequest(async () => {
    const res = await getGetWare();
    return res.data;
  });
  return (
    <BasePage>
      <View className="pb-[200px]">
        <Swiper className="h-[600px]" autoplay={4000}>
          <Swiper.Indicator />
          {data?.pictureList?.map((item, index) => (
            <Swiper.Item key={index}>
              <Image src={item} className="w-full h-full bg-gray-200" />
            </Swiper.Item>
          ))}
        </Swiper>
        <View className="px-[24px] pt-[32px]">
          <Box
            bgProps={{
              className: "bg-white rounded-lg",
            }}
          >
            <View className="px-[24px] py-[24px] flex flex-col gap-[16px]">
              <View className="flex justify-between items-center">
                <View className="text-[40px] font-bold text-rose-500">
                  ￥{data?.price}
                </View>
                <View className="text-gray-500">
                  库存剩余：{data?.inventory}
                </View>
              </View>
              <View className="text-[32px] font-bold">{data?.name}</View>
              <View className="text-gray-500">{data?.deac}</View>
              <View className="flex gap-[8px]">
                <View>
                  <AppTag size="lg" status="error">
                    热销榜第一
                  </AppTag>
                </View>
              </View>
            </View>
          </Box>
        </View>
        <View className="px-[24px] pt-[32px]">
          <Box
            bgProps={{
              className: "bg-white rounded-lg",
            }}
          >
            <View className="px-[24px] py-[12px] flex flex-col">
              <View className="flex justify-between items-center gap-2 py-[12px]">
                <View className="text-gray-400">已选</View>
                <View className="flex-1 text-black">我是已经选择的内容</View>
                <View className="text-gray-400">
                  <LucideIcon name="chevron-right" size={20} />
                </View>
              </View>
              <View className="flex justify-between gap-2 py-[12px]">
                <View className="text-gray-400">地址</View>
                <View className="flex-1 text-black">浙江省 杭州市 西湖区</View>
                <View className="text-gray-400">
                  <LucideIcon name="chevron-right" size={20} />
                </View>
              </View>
              <View className="">
                <View className="flex flex-col gap-[16px]">
                  <View className="bg-gray-100 rounded">
                    <View className="px-[24px] py-[24px]">
                      <View className="flex justify-between items-center">
                        <View className="flex items-center gap-[8px]">
                          <LucideIcon size={14} name="truck" />
                          <View>商品配送</View>
                        </View>
                        <LucideIcon
                          size={14}
                          name="square-check"
                          className="text-orange-500"
                        />
                      </View>
                      <View className="flex  items-center gap-2 pt-1">
                        <View className="text-orange-500">有现货</View>
                        <View>今日18:00前付款</View>
                        <View> 预计2025-01-02送达</View>
                      </View>
                    </View>
                  </View>
                  <View className="rounded">
                    <View className="px-[24px] py-[24px]">
                      <View className="flex justify-between items-center">
                        <View className="flex items-center gap-[8px]">
                          <LucideIcon size={14} name="truck" />
                          <View>到店自取</View>
                        </View>
                        <LucideIcon
                          size={14}
                          name="square-check"
                          className="text-gray-500"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex justify-between items-center gap-2 py-[12px]">
                <View className="text-gray-400">服务</View>
                <View className="flex-1 text-black flex gap-2">
                  <AppTag
                    size="default"
                    status="secondary"
                    prefix={<LucideIcon name="truck" />}
                  >
                    包邮
                  </AppTag>
                  <AppTag
                    size="default"
                    status="secondary"
                    prefix={<LucideIcon name="truck" />}
                  >
                    包退
                  </AppTag>
                  <AppTag
                    size="default"
                    status="secondary"
                    prefix={<LucideIcon name="truck" />}
                  >
                    包换
                  </AppTag>
                </View>
                <View className="text-gray-400">
                  <LucideIcon name="chevron-right" size={20} />
                </View>
              </View>
            </View>
          </Box>
        </View>
        <View className="px-[24px] pt-[32px]">
          <Box
            bgProps={{
              className: "bg-white rounded-lg",
            }}
          >
            <View className="px-[24px] py-[24px] flex flex-col gap-[16px]">
              <View className="flex justify-between items-center">
                <View className="text-[32px]">商品评价</View>
                <View className="text-gray-500 flex items-center">
                  查看全部
                  <LucideIcon name="chevron-right" size={20} />
                </View>
              </View>
              <View className="pt-[12px]">
                <View className="flex gap-[16px]">
                  <AppTag status="secondary">经济</AppTag>
                  <AppTag status="secondary">耐用</AppTag>
                </View>
              </View>
              <View className="pt-[12px]">
                <View className="flex gap-[16px]">
                  <View className="flex-1 h-[150px] rounded-md flex-center bg-gray-100">
                    <LucideIcon name="image" size={16} />
                  </View>
                  <View className="flex-1 h-[150px] rounded-md flex-center bg-gray-100">
                    <LucideIcon name="image" size={16} />
                  </View>
                  <View className="flex-1 h-[150px] rounded-md flex-center bg-gray-100">
                    <LucideIcon name="image" size={16} />
                  </View>
                  <View className="flex-1 h-[150px] rounded-md flex-center bg-gray-100">
                    <LucideIcon name="image" size={16} />
                  </View>
                </View>
              </View>
            </View>
          </Box>
        </View>
        <View className="pt-[32px]">
          <View className="flex justify-center text-[32px] font-semibold">
            商品详情
          </View>
          <View className="h-[500px] flex-center">
            <LucideIcon name="image" size={120} />
          </View>
          <View className="h-[500px] flex-center">
            <LucideIcon name="image" size={120} />
          </View>
          <View className="h-[500px] flex-center">
            <LucideIcon name="image" size={120} />
          </View>
          <View className="h-[500px] flex-center">
            <LucideIcon name="image" size={120} />
          </View>
          <View className="h-[500px] flex-center">
            <LucideIcon name="image" size={120} />
          </View>
        </View>
      </View>

      <View className="fixed bottom-0 left-0 right-0 px-[24px] bg-blur flex app-shadow-lg">
        <View className="flex-1 flex items-center justify-around">
          <View className="flex flex-col active:text-blue-500 items-center gap-1">
            <LucideIcon name="phone" size={18} />
            <Text className="text-[20px]">客服</Text>
          </View>
          <View className="flex flex-col active:text-blue-500 items-center gap-1">
            <LucideIcon name="star" size={20} />
            <Text className="text-[20px]">收藏</Text>
          </View>
          <View
            className="flex flex-col active:text-blue-500 items-center gap-1"
            onClick={() => {
              appUserStore.updateTabActive("cart");
              appRouter.reLaunch("index");
            }}
          >
            <LucideIcon name="shopping-cart" size={20} />
            <Text className="text-[20px]">购物车</Text>
          </View>
        </View>
        <View className="flex-2 flex gap-[16px] py-[24px]">
          <AppButton status="warning" className="flex-1">
            加入购物车
          </AppButton>
          <AppButton status="error" className="flex-1">
            立即购买
          </AppButton>
        </View>
      </View>
    </BasePage>
  );
};
export default WareDetail;
