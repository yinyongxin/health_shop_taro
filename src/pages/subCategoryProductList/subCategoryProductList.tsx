import {
  AppButton,
  AppFixedBottom,
  AppPopup,
  AppTopSearch,
  BasePage,
} from "@/components";
import { View } from "@tarojs/components";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { getWxShopCateProduct, ProductDetail } from "@/client";
import { SearchWareCard } from "@/components/SearchWareCard";
import { EditAddressContent } from "@/components/EditAddressContent";
import { useAppUserStore } from "@/stores";
import { useRef, useState } from "react";
import { appRouter } from "@/router";
import { AppList } from "@/components/AppList";
import "./subCategoryProductList.css";
import { Skeleton } from "./Skeleton";

const SubCategoryProductList = () => {
  const pageParams = usePageParams<"subCategoryProductList">();

  const [search, setSearch] = useState("");
  const [refreshNumber, setRefreshNumber] = useState(0);

  const dataRequest = useRequest(
    async (pageNum: number = 1) => {
      const res = await getWxShopCateProduct({
        query: {
          subCategoryId: pageParams.subCategoryId,
          searchKey: search,
          pageNum: pageNum.toString(),
          pageSize: "20",
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
      refreshDeps: [],
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
        <View className="p-2 bg-gray-100 overflow-auto pb-20 bg-gray-100">
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
    // if (true) {
    return <Skeleton />;
  }

  return (
    <>
      <BasePage fullScreen className="flex-1 subCategoryProductListPage">
        <View className="p-2 pb-0">
          <AppTopSearch
            onSearch={(val) => {
              setSearch(val);
              setRefreshNumber(refreshNumber + 1);
            }}
          />
        </View>
        <View className="flex-1 flex flex-col overflow-hidden mt-4">
          {/* <DownMenu /> */}
          <AppList
            {...dataRequest.data}
            loading={dataRequest.loading}
            bodyProps={{
              className: "pr-2 flex flex-wrap",
            }}
            itemRender={(item) => (
              <SearchWareCard
                key={item.id}
                info={item}
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
            className="flex-1 overflow-y-auto"
            onLoad={dataRequest.run}
          />
        </View>
      </BasePage>
      {getAddAddressPopup()}
    </>
  );
};

export default SubCategoryProductList;
