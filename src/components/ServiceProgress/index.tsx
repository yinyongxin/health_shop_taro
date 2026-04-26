import { View, Text } from "@tarojs/components";
import { PropsWithChildren } from "react";
import classNames from "classnames";

export type ServiceProgressProps = PropsWithChildren<{
  total: number;
  used: number;
  remaining: number;
  unit?: string;
  showLabel?: boolean;
}>;

const getProgressColor = (used: number, total: number) => {
  if (used === 0) return { bg: "from-gray-300 to-gray-400", text: "text-gray-500" };
  if (used >= total) return { bg: "from-rose-400 to-rose-500", text: "text-rose-500" };
  return { bg: "from-emerald-400 to-emerald-500", text: "text-emerald-500" };
};

export const ServiceProgress = (props: ServiceProgressProps) => {
  const { total, used, remaining, unit = "", showLabel = true } = props;

  const usedPercent = total > 0 ? (used / total) * 100 : 0;
  const remainingPercent = total > 0 ? (remaining / total) * 100 : 0;
  const color = getProgressColor(used, total);
  const statusText = used >= total ? "已用完" : used > 0 ? "使用中" : "未使用";

  return (
    <View className="flex flex-col gap-2">
      {showLabel && (
        <View className="flex justify-between items-center text-[24px]">
          <View className="flex items-center gap-1">
            <View className={classNames("w-2 h-2 rounded-full", color.bg.replace("from-", "bg-").replace(" to-", "/bg-"))} />
            <Text className={color.text}>{statusText}</Text>
          </View>
          <Text className="text-gray-400">
            剩余 {remaining}{unit}
          </Text>
        </View>
      )}

      <View className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        {used > 0 && (
          <View
            className={classNames(
              "absolute left-0 top-0 h-full rounded-full transition-all duration-500",
              `bg-gradient-to-r ${color.bg}`,
            )}
            style={{ width: `${usedPercent}%` }}
          />
        )}
        <View
          className={classNames(
            "absolute top-0 h-full rounded-full transition-all duration-500",
            used === 0 ? "bg-gray-300" : "bg-gray-200",
          )}
          style={{
            left: used > 0 ? `${usedPercent}%` : "0",
            width: used > 0 ? `${remainingPercent}%` : "100%",
          }}
        />
      </View>

      <View className="flex justify-between text-[24px] text-gray-400">
        <Text>总计 {total}{unit}</Text>
        <Text>{usedPercent.toFixed(0)}%</Text>
      </View>
    </View>
  );
};