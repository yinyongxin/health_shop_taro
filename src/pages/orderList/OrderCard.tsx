import { WareInfo } from "@/client";
import { AppButton } from "@/components";
import { CartWareCard } from "@/components/CartWareCard";
import { useRequest } from "@/hooks";
import { getOrderTabOptionsLabel, OrderTabOptionsValuesType } from "@/options";
import { appRouter } from "@/router";
import { View } from "@tarojs/components";
import { showToast } from "@tarojs/taro";

type OrderCardProps = {
  status?: OrderTabOptionsValuesType;
  wareList?: WareInfo[];
};
export const OrderCard = (props: OrderCardProps) => {
  const { status = "WaitReceipt", wareList } = props;
  const { data } = useRequest(async () => {
    return wareList;
  });

  const getActions = () => {
    if (status === "Received") {
      return (
        <AppButton
          actived={false}
          size="sm"
          onClick={() => {
            appRouter.navigateTo("orderDetail", {
              query: { id: "1" },
            });
          }}
        >
          查看详情
        </AppButton>
      );
    }
    return (
      <>
        <AppButton
          status="secondary"
          actived={false}
          size="sm"
          onClick={() => {
            showToast({
              title: "暂无数据",
              icon: "none",
              duration: 2000,
            });
          }}
        >
          查看物流
        </AppButton>
        <AppButton
          size="sm"
          actived={false}
          onClick={() => {
            showToast({
              title: "发货后确认",
              icon: "none",
              duration: 2000,
            });
          }}
        >
          确认收货
        </AppButton>
      </>
    );
  };

  return (
    <View className="rounded-lg bg-white app-shadow-lg shadow-gray-200">
      <View className="py-[24px] px-[24px] flex items-center justify-between">
        <View className="text-[28px] font-semibold">2025-01-01 00:00:00</View>
        <View className="text-amber-500">
          {getOrderTabOptionsLabel(status)}
        </View>
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
        <View className=" flex gap-2">{getActions()}</View>
      </View>
    </View>
  );
};
