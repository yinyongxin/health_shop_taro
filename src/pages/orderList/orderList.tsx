import { AppTabList, BasePage } from "@/components";
import { useState } from "react";
import { useAppUserStore } from "@/stores";
import { OrderStatusIcon } from "@/options";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopOrderMy, OrderInfo } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { AppList } from "@/components/AppList";
import classNames from "classnames";
import { OrderCard } from "./OrderCard";

const OrderList = () => {
  const pageParams = usePageParams<"orderList">();
  const { orderStatusList } = useAppUserStore();
  const tabs = [
    {
      label: "全部",
      value: "all",
      icon: "grid-2x2",
    },
    ...orderStatusList.map((item, index) => {
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
      {pageParams.status === "all" && (
        <AppTabList
          className="bg-none"
          active={active}
          tabs={tabs}
          onChange={setActive}
        />
      )}
      <AppList
        className="flex-1"
        loading={dataRequest.loading}
        {...dataRequest.data}
        bodyProps={{
          className: classNames(
            "px-[24px] pt-[16px] pb-[32px] flex flex-col gap-[24px]",
            {
              "pt-[24px]": pageParams.status !== "all",
            },
          ),
        }}
        itemRender={(item) => <OrderCard info={item} />}
        onLoad={(pageNum) => {
          dataRequest.run(pageNum);
        }}
      ></AppList>
    </BasePage>
  );
};

export default OrderList;
