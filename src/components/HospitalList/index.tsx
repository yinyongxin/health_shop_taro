import { View } from "@tarojs/components";
import classNames from "classnames";
import { appRouter } from "@/router";
import { useAppEnvStore } from "@/stores";
import { BasePage } from "../BasePage";

export type HospitalListProps = {
  className?: string;
};

export const HospitalList = (props: HospitalListProps) => {
  const { hospitalList = [] } = useAppEnvStore();
  const { className } = props;

  const handleClick = (orgId: string) => {
    console.log("点击了医院", orgId);
    appRouter.navigateTo("wareList", {
      query: { orgId },
    });
  };
  return (
    <BasePage className={classNames(className, "p-2")}>
      {hospitalList.map((item) => (
        <View
          key={item.orgId}
          className="mb-2 px-4 py-3 bg-white rounded-lg app-shadow"
          onClick={() => handleClick(item.orgId)}
        >
          <View className="text-[32px] font-bold">{item.orgName}</View>
          <View className="text-sm text-gray-500 mt-2">{item.orgId}</View>
        </View>
      ))}
    </BasePage>
  );
};
