import { LucideIcon } from "@/components";
import { Text, View } from "@tarojs/components";
import { appRouter } from "@/router";
import { useAppEnvStore } from "@/stores";
import { OrderStatusIcon } from "@/options";
import { MyOrderItem } from "./MyOrderItem";

export const MyOrder = () => {
  const { orderStatusList } = useAppEnvStore();

  const getStatusBg = (index: number) => {
    const bgs = [
      "from-sky-50 to-sky-100",
      "from-amber-50 to-amber-100",
      "from-emerald-50 to-emerald-100",
      "from-rose-50 to-rose-100",
      "from-violet-50 to-violet-100",
    ];
    return bgs[index % bgs.length];
  };

  return (
    <View
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* 标题栏 */}
      <View className="px-5 pt-5 flex justify-between items-center">
        <Text className="text-[30px] font-semibold text-slate-800">我的订单</Text>
        <View
          className="flex items-center gap-1 py-2 px-3 rounded-full active:bg-slate-100"
          onClick={() => {
            appRouter.navigateTo("orderList", { query: { status: "all" } });
          }}
        >
          <Text className="text-[24px] text-slate-500">全部订单</Text>
          <LucideIcon className="text-slate-400" name="chevron-right" size={20} />
        </View>
      </View>

      {/* 订单状态列表 */}
      <View className="px-4 pb-5 pt-2">
        <View className="flex justify-between">
          {orderStatusList.slice(0, 5).map((status, index) => {
            return (
              <MyOrderItem
                key={status.dictCode}
                title={status.dictLabel}
                icon={
                  <LucideIcon
                    className={index === 0 ? "text-sky-500" : index === 1 ? "text-amber-500" : index === 2 ? "text-emerald-500" : "text-slate-400"}
                    name={OrderStatusIcon[index]}
                    size={26}
                  />
                }
                onClick={() => {
                  appRouter.navigateTo("orderList", {
                    query: {
                      status: status.dictValue,
                    },
                  });
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};