import { ITouchEvent, View } from "@tarojs/components";
import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";

type TagStatus = "primary" | "secondary" | "success" | "error" | "warning";
type TagSize = "default" | "lg" | "xl";

const colors: Record<TagStatus, string> = {
  primary: "bg-linear-45 from-sky-100 to-sky-200 text-sky-600",
  success: "bg-linear-45 from-lime-100 to-lime-200 text-lime-600",
  error: "bg-linear-45 from-rose-100 to-rose-200 text-rose-600",
  warning: "bg-linear-45 from-amber-100 to-amber-200 text-amber-600",
  secondary: "bg-linear-45 from-gray-100 to-gray-200 text-gray-600",
};

const activeColors: Record<TagStatus, string> = {
  primary: "bg-linear-45 from-sky-500 to-sky-600 text-sky-100",
  success: "bg-linear-45 from-lime-500 to-lime-600 text-lime-100",
  error: "bg-linear-45 from-rose-500 to-rose-600 text-rose-100",
  warning: "bg-linear-45 from-amber-500 to-amber-600 text-amber-100",
  secondary: "bg-linear-45 from-gray-500 to-gray-600 text-gray-100",
};

const sizes: Record<TagSize, string> = {
  default: "px-[12px] py-[6px] rounded-[8px] text-[24px]",
  lg: "px-[24px] py-[8px] rounded-[8px] text-[26px]",
  xl: "px-[32px] py-[10px] rounded-[8px] text-[28px]",
};

export type AppTagProps = PropsWithChildren<{
  className?: string;
  round?: boolean;
  status?: TagStatus;
  size?: TagSize;
  actived?: boolean;
  onClick?: (e: ITouchEvent) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
}>;

export const AppTag = (props: AppTagProps) => {
  const {
    className,
    round = true,
    status = "primary",
    size = "default",
    actived = false,
    children,
    onClick,
    prefix,
    suffix,
  } = props;
  return (
    <View
      className={classNames([
        "flex gap-[4px] items-center justify-center",
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
      onClick={onClick}
    >
      {prefix}
      {children}
      {suffix}
    </View>
  );
};
