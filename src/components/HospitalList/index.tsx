import { View } from "@tarojs/components";
import { BasePage } from "../BasePage";

export type HospitalListProps = {
  className?: string;
};

export const HospitalList = (props: HospitalListProps) => {
  const { className } = props;
  return <BasePage className={className}>医院列表</BasePage>;
};
