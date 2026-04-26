import { View, Text } from "@tarojs/components";
import { PropsWithChildren } from "react";

export type ServiceProgressProps = PropsWithChildren<{
  total: number;
  used: number;
  remaining: number;
  unit?: string;
}>;

const getProgressColor = (used: number, total: number) => {
  if (used === 0) return "bg-gray-300";
  if (used >= total) return "bg-rose-500";
  return "bg-emerald-500";
};

export const ServiceProgress = (props: ServiceProgressProps) => {
  const { total, used, remaining, unit = "" } = props;

  const usedPercent = total > 0 ? (used / total) * 100 : 0;

  return (
    <View className="flex flex-col gap-2">
      <View className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <View
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${getProgressColor(
            used,
            total,
          )}`}
          style={{ width: `${usedPercent}%` }}
        />
      </View>

      <View className="flex justify-between text-[24px] text-gray-400">
        <Text>剩余 {remaining}{unit}</Text>
        <Text>总计 {total}{unit}</Text>
      </View>
    </View>
  );
};