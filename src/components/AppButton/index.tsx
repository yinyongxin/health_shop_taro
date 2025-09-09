import { View } from "@tarojs/components";
import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import { LucideIcon } from "../LucideIcon";

type AppButtonStatus =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning";
type AppButtonSize = "sm" | "default" | "lg" | "xl";

const colors: Record<AppButtonStatus, string> = {
  primary: "bg-linear-45 from-sky-100 to-sky-200 text-sky-600",
  success: "bg-linear-45 from-lime-100 to-lime-200 text-lime-600",
  error: "bg-linear-45 from-rose-100 to-rose-200 text-rose-600",
  warning: "bg-linear-45 from-amber-100 to-amber-200 text-amber-600",
  secondary: "bg-linear-45 from-gray-100 to-gray-200 text-gray-600",
};

const activeColors: Record<AppButtonStatus, string> = {
  primary: "bg-linear-45 from-sky-400 to-sky-600 text-sky-100",
  success: "bg-linear-45 from-lime-400 to-lime-600 text-lime-100",
  error: "bg-linear-45 from-rose-400 to-rose-600 text-rose-100",
  warning: "bg-linear-45 from-amber-400 to-amber-600 text-amber-100",
  secondary: "bg-linear-45 from-gray-400 to-gray-600 text-gray-100",
};

const sizes: Record<AppButtonSize, string> = {
  sm: "px-[24px] py-[16px] rounded-[12px] text-[24px]",
  default: "px-[32px] py-[24px] rounded-[16px] text-[28px]",
  lg: "px-[40px] py-[28px] rounded-[24px] text-[30px]",
  xl: "px-[48px] py-[32px] rounded-[32px] text-[32px]",
};

export type AppButtonProps = PropsWithChildren<{
  className?: string;
  round?: boolean;
  status?: AppButtonStatus;
  size?: AppButtonSize;
  actived?: boolean;
  onClick?: () => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
}>;

export const AppButton = (props: AppButtonProps) => {
  const {
    className,
    round = false,
    status = "primary",
    size = "default",
    actived = true,
    children,
    onClick,
    prefix,
    suffix,
    loading = false,
  } = props;
  return (
    <View
      className={classNames([
        "flex gap-[8px] items-center justify-center",
        "active:opacity-75",
        sizes?.[size],
        {
          [activeColors?.[status]]: actived,
          [colors?.[status]]: !actived,
        },
        {
          "rounded-full": round,
        },
        className,
      ])}
      onClick={() => {
        if (loading) {
          return;
        }
        onClick?.();
      }}
    >
      {loading ? <LucideIcon name="loader" className="animate-spin" /> : prefix}
      {children}
      {suffix}
    </View>
  );
};
