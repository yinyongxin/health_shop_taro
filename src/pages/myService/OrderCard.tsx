import { OrderListItem } from "@/client";
import { AppButton } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { ServiceList } from "@/components/ServiceList";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { View, Text } from "@tarojs/components";

type OrderCardProps = {
  info: OrderListItem;
};
export const OrderCard = (props: OrderCardProps) => {
  const { info } = props;

  const appUserStore = useAppUserStore();

  const getActions = () => {
    if (info.status === 2) {
      return (
        <AppButton
          actived={false}
          size="sm"
          status="success"
          onClick={() => {
            appRouter.navigateTo("orderPay", {
              query: { orderNo: info.orderNo },
            });
          }}
        >
          去使用
        </AppButton>
      );
    }
    return (
      <AppButton
        actived={false}
        size="sm"
        onClick={() => {
          appRouter.navigateTo("orderDetail", {
            query: { orderNo: info.orderNo },
          });
        }}
      >
        查看详情
      </AppButton>
    );
  };

  const getStatusText = () => {
    return appUserStore.orderStatusList.find((item) => {
      return item.dictValue === info.status.toString();
    })?.dictLabel;
  };

  return (
    <View className="rounded-lg bg-white app-shadow">
      <View className="py-[24px] px-[24px] flex items-center justify-between">
        <View className="text-[28px] font-semibold">{info.createAt}</View>
        <View className="text-amber-500">{getStatusText()}</View>
      </View>
      <View className="bg-white rounded-lg">
        {info.productList.map((product) => {
          return (
            <ServiceList
              key={product.productId}
              product={{
                productId: product.productId,
                productName: product.productName,
                productImage: product.productImage,
              }}
              serviceList={product.services}
              isService={info.isService}
            />
          );
        })}
        <View className="flex flex-col gap-2 px-[24px]">
          <View className="border-t-[1px] border-gray-200 pt-[24px] ">
            <InfoCardItem
              label="付款金额"
              lableClassName="text-[32px] font-semibold w-auto"
              valueClassName="text-end"
              value={
                <View className="text-[32px] font-semibold">
                  <Text>￥</Text>
                  <Text>{info.paymentAmount}</Text>
                </View>
              }
            />
          </View>
        </View>
      </View>

      <View className="flex items-center px-[24px] pb-[24px] pt-[24px]">
        <View className="flex-1">
          <View className="text-gray-500 text-[28px]">
            {/* {info.orderNo} */}
          </View>
        </View>
        <View className=" flex gap-2">{getActions()}</View>
      </View>
    </View>
  );
};
