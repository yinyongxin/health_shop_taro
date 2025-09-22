import { OrderInfo } from "@/client";
import { AppButton } from "@/components";
import { CartWareCard } from "@/components/CartWareCard";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { View } from "@tarojs/components";

type OrderCardProps = {
  info: OrderInfo;
};
export const OrderCard = (props: OrderCardProps) => {
  const { info } = props;

  const appUserStore = useAppUserStore();

  const getActions = () => {
    if (info.status === 0) {
      return (
        <AppButton
          actived={false}
          size="sm"
          status="error"
          onClick={() => {
            appRouter.navigateTo("orderPay", {
              query: { orderNo: info.orderNo },
            });
          }}
        >
          去支付
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
    // }
    return (
      <>
        <AppButton status="secondary" actived={false} size="sm">
          查看物流
        </AppButton>
        <AppButton size="sm" actived={false}>
          确认收货
        </AppButton>
      </>
    );
  };

  const getStatusText = () => {
    return appUserStore.orderStatusList.find((item) => {
      return item.dictValue === info.status.toString();
    })?.dictLabel;
  };

  return (
    <View className="rounded-lg bg-white app-shadow-lg shadow-gray-200">
      <View className="py-[24px] px-[24px] flex items-center justify-between">
        <View className="text-[28px] font-semibold">{info.createdAt}</View>
        <View className="text-amber-500">{getStatusText()}</View>
      </View>
      <View className="flex items-center px-[24px] pb-[24px]">
        <View className="flex-1">
          <View className="text-gray-500 text-[28px]">更多</View>
        </View>
        <View className=" flex gap-2">{getActions()}</View>
      </View>
    </View>
  );
};
