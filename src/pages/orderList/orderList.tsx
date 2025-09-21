import { AppTabList, AppTopSearch, BasePage } from "@/components";
import { View } from "@tarojs/components";
import { useState } from "react";
import { useAppUserStore } from "@/stores";
import { OrderStatusIcon } from "@/options";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopOrderMy, OrderInfo } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { AppList } from "@/components/AppList";
import { OrderCard } from "./OrderCard";

const OrderList = () => {
  const pageParams = usePageParams<"orderList">();
  const { orderStatus } = useAppUserStore();
  const tabs = [
    {
      label: "全部",
      value: "all",
      icon: "grid-2x2",
    },
    ...orderStatus.map((item, index) => {
      return {
        label: item.dictLabel,
        value: item.dictValue,
        icon: OrderStatusIcon[index],
      };
    }),
  ];
  const [active, setActive] = useState(pageParams.status || "all");

  const dataRequest = useRequest(
    async (pageNum: number = 1) => {
      const res = await getWxShopOrderMy({
        query: {
          orgId: APP_ENV_CONFIG.ORG_ID,
          status: active === "all" ? undefined : active,
          pageNum: pageNum.toString(),
          pageSize: "10",
        },
      });
      let list: OrderInfo[] = [];
      if (pageNum !== 1) {
        list = dataRequest.data?.list.concat(res.data?.rows || []) || [];
      } else {
        list = res.data?.rows || [];
      }
      return {
        list,
        pagination: {
          total: res?.data?.total || 0,
          pageNum,
          pageSize: 10,
        },
      };
    },
    {
      refreshDeps: [active],
    },
  );
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
        <AppTabList
          className="bg-none"
          active={active}
          tabs={tabs}
          onChange={setActive}
        />
        <AppList
          className="flex-1"
          loading={dataRequest.loading}
          {...dataRequest.data}
          bodyProps={{
            className: "px-[24px] py-[32px] flex flex-col gap-[24px]",
          }}
          itemRender={(item) => <OrderCard info={item} />}
          onLoad={(pageNum) => {
            dataRequest.run(pageNum);
          }}
        ></AppList>
      </View>
    </BasePage>
  );
};

export default OrderList;
