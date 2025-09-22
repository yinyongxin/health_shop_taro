import { AppTag, BasePage } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { wareListMock } from "@/mock";
import { View, Image } from "@tarojs/components";
import { CartWareCard } from "@/components/CartWareCard";
import { getWxShopOrderDetail } from "@/client";
import { APP_ENV_CONFIG } from "@/common";

export default () => {
  const pageParams = usePageParams<"orderDetail">();
  const { data } = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: {
        orgId: APP_ENV_CONFIG.ORG_ID,
        orderNo: pageParams.orderNo,
      },
    });
    console.log(res.data);
  });
  return (
    <BasePage>
      <View className="flex flex-col gap-[32px] p-[24px]">
        <View className="text-[32px] font-semibold">已收货</View>
        <View className="bg-white rounded-lg flex flex-col gap-1 pb-[24px]">
          {/* {data && (
            <CartWareCard showNumControl={false} shadow={false} info={data} />
          )} */}
          <View className="flex-center flex-col h-[500px]">
            <Image
              className="size-[300px]"
              src="https://img1.baidu.com/it/u=2359346518,83708928&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            />
            <View className="text-[32px] font-semibold mt-[24px]">
              0107 2435 2566 23
            </View>
          </View>
          <View className="px-[24px]">
            <View className="flex items-center justify-between">
              <View className="flex items-center gap-[16px]">
                <View className="text-[32px] font-semibold">待使用</View>
                <View className="text-gray-500F">2025-10-10 00:00:00过期</View>
              </View>
              <View>
                <AppTag status="secondary">申请退款</AppTag>
              </View>
            </View>
          </View>
          <View className="px-[24px]">
            <View className="text-gray-500F">
              请在过期时间内使用，过期后将无法使用
            </View>
          </View>
        </View>
        <View className="bg-white rounded-lg p-[24px] flex flex-col gap-1">
          <InfoCardItem label="手机号码" value="17637810750" />
          <InfoCardItem label="订单编号" value="DDBH134543523453254" />
          <InfoCardItem
            label="交易快照"
            value="当日发生交易纠纷是可作为交易凭证"
          />
          <InfoCardItem label="下单时间" value="2025-05-05 05:05:05" />
        </View>
      </View>
    </BasePage>
  );
};
