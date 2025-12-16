import { AppTabList, BasePage } from "@/components";
import { useEffect, useRef, useState } from "react";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopMyServiceOrder, OrderInfo } from "@/client";
import { View } from "@tarojs/components";
import { AppList } from "@/components/AppList";
import classNames from "classnames";
import { appLoading } from "@/utils";
import { useDidShow } from "@tarojs/taro";
import { OrderCard } from "./OrderCard";
import { Skeleton } from "./Skeleton";

const MyService = () => {
  const pageParams = usePageParams<"orderList">();
  const tabs = [
    {
      label: "全部",
      value: "1",
      icon: "grid-2x2",
    },
    {
      label: "服务中",
      value: "2",
      icon: "handshake",
    },
    {
      label: "已结束",
      value: "3",
      icon: "user-round-x",
    },
  ];
  const [active, setActive] = useState("3");

  const dataRequest = useRequest(
    async (pageNum: number = 1, pageSize?: number) => {
      const res = await getWxShopMyServiceOrder({
        query: {
          status: Number(active),
          pageNum: pageNum.toString(),
          pageSize: pageSize?.toString() ?? "10",
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
    <BasePage fullScreen className="flex-1 myLikeList">
      <View>
        <AppTabList
          className="bg-none"
          active={active}
          tabs={tabs}
          onChange={setActive}
        />
      </View>
      {dataRequest.loading && !dataRequest.data ? (
        <Skeleton />
      ) : (
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
      )}
    </BasePage>
  );
};

export default MyService;
