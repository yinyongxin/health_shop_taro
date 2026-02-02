import { AppTabList, BasePage } from "@/components";
import { useEffect, useRef, useState } from "react";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopAfterSaleList } from "@/client";
import { AppList } from "@/components/AppList";
import classNames from "classnames";
import { useDidShow } from "@tarojs/taro";
import { appLoading } from "@/utils";
import { SaleStatusEnum } from "@/enums";
import { Skeleton } from "./Skeleton";
import { AfterSaleCard } from "./AfterSaleCard";

const OrderList = () => {
  const pageParams = usePageParams<"afterSalesService">();
  const tabs = [
    {
      label: "全部",
      value: "all",
    },
    ...Object.keys(SaleStatusEnum).map((item) => {
      const { value, label } = SaleStatusEnum[item];
      return {
        label,
        value,
      };
    }),
  ];
  const [active, setActive] = useState<string | undefined>();

  useEffect(() => {
    setActive(pageParams.status || "all");
  }, [pageParams.status]);

  const dataRequest = useRequest(
    async (pageNum: number = 1, pageSize?: number) => {
      if (!active) {
        return;
      }
      const res = await getWxShopAfterSaleList({
        query: {
          status: active === "all" ? undefined : active,
          pageNum: pageNum,
          pageSize: pageSize ?? 10,
        },
      });
      let list: any[] = [];
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
      manual: true,
    },
  );
  const isInit = useRef(true);

  const acitveChange = async () => {
    appLoading.show("加载中...");
    await dataRequest.run(1);
    appLoading.hide();
  };

  useEffect(() => {
    if (!isInit.current) {
      acitveChange();
    }
    isInit.current = false;
  }, [active]);

  useDidShow(() => {
    dataRequest.run(1);
  });

  return (
    <BasePage fullScreen>
      <AppTabList
        className="bg-none"
        active={active}
        tabs={tabs}
        onChange={setActive}
      />
      <AppList
        skeleton={<Skeleton />}
        className="flex-1"
        loading={dataRequest.loading}
        bodyProps={{
          className: classNames(
            "px-[24px] pt-[16px] pb-[32px] flex flex-col gap-[24px] pt-[24px]",
          ),
        }}
        itemRender={(item) => <AfterSaleCard info={item} />}
        onLoad={(pageNum) => {
          dataRequest.run(pageNum);
        }}
        {...dataRequest.data}
      />
    </BasePage>
  );
};

export default OrderList;
