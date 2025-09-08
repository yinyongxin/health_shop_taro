import { getGetWares } from "@/client";
import { AppButton } from "@/components";
import { CartWareCard } from "@/components/CartWareCard";
import { useRequest } from "@/hooks";
import { OrderTabOptions, OrderTabOptionsValuesType } from "@/options";
import { appRouter } from "@/router";
import { View } from "@tarojs/components";
type OrderCardProps = {
  status?: OrderTabOptionsValuesType
}
export const OrderCard = (props: OrderCardProps) => {
  const { status = 'WaitReceipt' } = props;
  const { data } = useRequest(async () => {
    const res = await getGetWares();
    return res.data;
  });

  const getActions = () => {
    if (status === 'Received') {
      return <AppButton actived={false} size="sm" onClick={() => {
        appRouter.navigateTo('orderDetail')
      }}>
        查看详情
      </AppButton>
    }
    return (
      <>
        <AppButton status="secondary" actived={false} size="sm">
          查看物流
        </AppButton>
        <AppButton size="sm" actived={false}>确认收货</AppButton>
      </>
    )
  }

  const getStatusChinese = () => {
    return OrderTabOptions.find((item) => item.value === status)?.label || (status)
  }

  return (
    <View className="rounded-xl bg-white app-shadow-lg shadow-gray-200">
      <View className="py-[24px] px-[24px] flex items-center justify-between">
        <View className="text-[28px] font-semibold">2025-01-01 00:00:00</View>
        <View className="text-amber-500">{getStatusChinese()}</View>
      </View>
      <View>
        {data?.map((item) => (
          <CartWareCard
            key={item.id}
            info={item}
            showNumControl={false}
            shadow={false}
          />
        ))}
      </View>
      <View className="flex items-center px-[24px] pb-[24px]">
        <View className="flex-1">
          <View className="text-gray-500 text-[28px]">更多</View>
        </View>
        <View className=" flex gap-2">
          {getActions()}
        </View>
      </View>
    </View>
  );
};
