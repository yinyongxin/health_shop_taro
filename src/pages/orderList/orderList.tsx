import {
  AppTabList,
  AppTabListItem,
  AppTopSearch,
  BasePage,
} from "@/components";
import { OrderTabOptions } from "@/options";
import { View, ScrollView } from "@tarojs/components";
import { useState } from "react";
import { wareListMock } from "@/mock";
import { OrderCard } from "./OrderCard";

const tabs = [
  {
    label: "全部",
    value: "all",
    icon: 'grid-2x2'
  },
  ...(OrderTabOptions as unknown as AppTabListItem[]),
];
const OrderList = () => {
  const [active, setActive] = useState<string>(tabs[0].value);
  return (
    <BasePage
      bgProps={{ className: "page-bg" }}
      fullScreen
      className="flex-1 myLikeList"
    >
      <View className="p-[24px]">
        <AppTopSearch />
      </View>
      <View className="flex-1 rounded-t-xl border-2 border-white flex flex-col overflow-hidden">
        <AppTabList active={active} tabs={tabs} onChange={setActive} />
        <ScrollView scrollY className="flex-1 bg-white">
          <View className="px-[24px] py-[32px] flex flex-col gap-[24px]">
            <OrderCard
              status="Received"
              wareList={wareListMock.filter((item) => item.id === "2")}
            />
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};

export default OrderList;
