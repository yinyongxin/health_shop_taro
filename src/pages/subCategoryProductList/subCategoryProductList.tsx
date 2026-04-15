import { AppTopSearch, BasePage } from "@/components";
import { View } from "@tarojs/components";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopCateProduct, ProductDetail } from "@/client";
import { SearchWareCard } from "@/components/SearchWareCard";
import { useState } from "react";
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

  if (dataRequest.loading && !dataRequest.data) {
    // if (true) {
    return <Skeleton />;
  }

  return (
    <BasePage fullScreen className="flex-1 subCategoryProductListPage">
      <View className="p-2 pb-0">
        <AppTopSearch
          onSearch={(val) => {
            setSearch(val);
            setRefreshNumber(refreshNumber + 1);
          }}
        />
      </View>
      <View className="flex-1 flex flex-col overflow-hidden">
        {/* <DownMenu /> */}
        <AppList
          {...dataRequest.data}
          loading={dataRequest.loading}
          bodyProps={{
            className: "pr-[24px] flex flex-wrap",
          }}
          itemRender={(item) => (
            <SearchWareCard
              key={item.id}
              info={item}
              handleClick={() => {
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
  );
};

export default SubCategoryProductList;
