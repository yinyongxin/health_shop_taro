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

  const appUserStore = useAppUserStore();
  const addAddressControl = usePopupControl();

  const getAddAddressPopup = () => {
    return (
      <AppPopup
        title="新增地址"
        style={{
          height: "70vh",
        }}
        {...addAddressControl}
      >
        <View className="p-2 bg-gray-100 overflow-auto pb-20">
          <EditAddressContent
            success={() => {
              appUserStore.updateAddressList();
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
          className: "pr-2 flex flex-wrap",
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
