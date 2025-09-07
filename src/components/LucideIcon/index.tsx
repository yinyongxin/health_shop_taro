import { View } from "@tarojs/components";
import classNames from "classnames";

export type LucideIconProps = {
  name?: string;
  size?: number | string;
  color?: string;
  className?: string;
  bg?: string;
};

/**
 * https://lucide.dev/icons/
 */
export const LucideIcon = (props: LucideIconProps) => {
  const { name, size, color, className } = props;
  return (
    <View
      style={{
        fontSize: size,
        color,
      }}
      className={classNames("inline-block", `icon-${name}`, className)}
    ></View>
  );
};
