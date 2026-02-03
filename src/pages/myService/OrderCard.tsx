import { OrderListItem } from "@/client";
import { AppButton } from "@/components";
import { ServiceList } from "@/components/ServiceList";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { getServiceStatusText } from "@/utils";
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
            appRouter.navigateTo("serviceUse", {
              query: { orderNo: info.orderNo },
            });
          }}
        >
          去使用核销
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

  return (
    <View className="rounded-xl bg-white app-shadow">
      <View className="py-[24px] px-[24px] flex items-center justify-between">
        <View className="text-[28px] font-semibold">{info.createAt}</View>
        <View className="text-amber-500">
          {getServiceStatusText(info.status, appUserStore.orderStatusList)}
        </View>
      </View>
      <View className="bg-white rounded-xl">
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
      </View>

      <View className="flex items-center px-[24px] pb-[24px] pt-[24px]">
        <View className="flex-1">
          <View className="text-[32px] font-semibold">
            <Text>￥</Text>
            <Text className="text-[40px]">{info.paymentAmount}</Text>
          </View>
        </View>
        <View className=" flex gap-2">{getActions()}</View>
      </View>
    </View>
  );
};
