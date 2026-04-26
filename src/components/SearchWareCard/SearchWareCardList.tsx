import { useRef } from "react";
import { getWxShopProductSearch, type ProductDetail } from "@/client";
import { usePopupControl, useRequest } from "@/hooks";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { View } from "@tarojs/components";
import { SearchWareCard, SearchWareCardProps } from ".";
import { AppList } from "../AppList";
import { Skeleton } from "./Skeleton";
import { AppPopup } from "../AppPopup";
import { AppButton } from "../AppButton";
import { AppFixedBottom } from "../AppFixedBottom";
import { EditAddressContent } from "../EditAddressContent";

export type SearchWareCardListProps = {
  className?: string;
  searchWareCardProps?: Partial<SearchWareCardProps>;
  searchKey?: string;
  refreshNumber?: number;
  order?: "new" | "sell";
  orgId?: string;
};

export const SearchWareCardList = (props: SearchWareCardListProps) => {
  const {
    searchKey = "",
    className,
    searchWareCardProps,
    refreshNumber,
    order,
    orgId,
  } = props;

  const dataRequest = useRequest(
    async (pageNum: number = 1) => {
      const res = await getWxShopProductSearch({
        query: {
          orgId,
          searchKey: searchKey,
          pageNum: pageNum.toString(),
          pageSize: "20",
          orderBy: order || undefined,
        },
      });
      let list: ProductDetail[] = [];
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
          pageSize: 20,
        },
      };
    },
    {
      refreshDeps: [searchKey, refreshNumber, order],
    },
  );

  const ref = useRef({
    id: "",
  });
  const appUserStore = useAppUserStore();
  const addAddressControl = usePopupControl();

  const getAddAddressPopup = () => {
    return (
      <AppPopup
        title="新增服务信息"
        style={{
          height: "70vh",
        }}
        showClose
        destroyOnClose
        {...addAddressControl}
      >
        <View className="p-4 overflow-auto pb-20">
          <EditAddressContent
            success={() => {
              appUserStore.updateAddressList();
              appRouter.navigateTo("wareDetail", {
                query: {
                  id: ref.current.id,
                },
              });
              addAddressControl.setOpen(false);
            }}
            btn={
              <AppFixedBottom>
                <AppButton className="w-full" status="primary">
                  保存
                </AppButton>
              </AppFixedBottom>
            }
          />
        </View>
      </AppPopup>
    );
  };

  if (dataRequest.loading && !dataRequest.data) {
    return <Skeleton />;
  }

  return (
    <>
      <AppList
        {...dataRequest.data}
        loading={dataRequest.loading}
        bodyProps={{
          className: "flex flex-wrap",
        }}
        itemRender={(item) => (
          <SearchWareCard
            info={item}
            {...searchWareCardProps}
            handleClick={() => {
              if (
                appUserStore.addressList &&
                !appUserStore.addressList.length
              ) {
                ref.current.id = item.id.toString();
                addAddressControl.setOpen(true);
                return;
              }
              appRouter.navigateTo("wareDetail", {
                query: {
                  id: item.id.toString(),
                },
              });
            }}
          />
        )}
        className={className}
        onLoad={dataRequest.run}
      />
      {getAddAddressPopup()}
    </>
  );
};
