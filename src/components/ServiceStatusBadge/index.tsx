import { View, Text } from "@tarojs/components";
import { PropsWithChildren } from "react";
import classNames from "classnames";

export type ServiceStatusBadgeProps = PropsWithChildren<{
  status: "pending" | "using" | "completed" | "refund" | "cancelled";
}>;

const statusConfig = {
  pending: {
    text: "待使用",
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    textColor: "text-amber-600",
    border: "border-amber-200",
  },
  using: {
    text: "使用中",
    dot: "bg-sky-500",
    bg: "bg-sky-50",
    textColor: "text-sky-600",
    border: "border-sky-200",
  },
  completed: {
    text: "已完成",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    textColor: "text-emerald-600",
    border: "border-emerald-200",
  },
  refund: {
    text: "退款中",
    dot: "bg-rose-500",
    bg: "bg-rose-50",
    textColor: "text-rose-600",
    border: "border-rose-200",
  },
  cancelled: {
    text: "已取消",
    dot: "bg-gray-500",
    bg: "bg-gray-50",
    textColor: "text-gray-500",
    border: "border-gray-200",
  },
};

export const ServiceStatusBadge = (props: ServiceStatusBadgeProps) => {
  const { status } = props;
  const config = statusConfig[status];

  return (
    <View
      className={classNames(
        "inline-flex items-center px-3 py-1.5 rounded-full border",
        config.bg,
        config.textColor,
        config.border,
      )}
    >
      <View
        className={classNames("w-1.5 h-1.5 rounded-full mr-2", config.dot)}
      />
      <Text className={classNames("text-[24px] font-medium")}>
        {config.text}
      </Text>
    </View>
  );
};
