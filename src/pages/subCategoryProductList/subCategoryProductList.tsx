import { BasePage } from "@/components";
import { View } from "@tarojs/components";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopCateProduct, ProductInfo } from "@/client";
import { SearchWareCard } from "@/components/SearchWareCard";
import { AppList } from "@/components/AppList";
import "./subCategoryProductList.css";

const SubCategoryProductList = () => {
  const pageParams = usePageParams<"subCategoryProductList">();

  const dataRequest = useRequest(
    async (pageNum: number = 1) => {
      const res = await getWxShopCateProduct({
        query: {
          subCategoryId: pageParams.subCategoryId,
          // searchKey: searchKey,
          pageNum: pageNum.toString(),
          pageSize: "20",
        },
      });
      let list: ProductInfo[] = [];
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
  return (
    <BasePage
      bgProps={{ className: "page-bg" }}
      fullScreen
      className="flex-1 subCategoryProductListPage"
    >
      {/* <View className="p-[24px]">
        <AppTopSearch />
      </View> */}
      <View className="flex-1 rounded-t-xl border-2 border-white flex flex-col overflow-hidden">
        {/* <DownMenu /> */}
        {dataRequest.loading && !dataRequest.data ? (
          <View className="flex gap-2 p-2 h-full pb-[180px]">
            <View className="flex-1 flex flex-col gap-2">
              <View className="bg-gray-200 rounded-lg h-[400px]"></View>
              <View className="bg-gray-200 rounded-lg h-[400px]"></View>
              <View className="bg-gray-200 rounded-lg h-[400px]"></View>
            </View>
            <View className="flex-1 flex flex-col gap-2">
              <View className="bg-gray-200 rounded-lg h-[400px]"></View>
              <View className="bg-gray-200 rounded-lg h-[400px]"></View>
              <View className="bg-gray-200 rounded-lg h-[400px]"></View>
            </View>
          </View>
        ) : (
          <AppList
            {...dataRequest.data}
            loading={dataRequest.loading}
            bodyProps={{
              className: "pr-[24px] flex flex-wrap",
            }}
            itemRender={(item) => <SearchWareCard key={item.id} info={item} />}
            className="flex-1 overflow-y-auto"
            onLoad={dataRequest.run}
          ></AppList>
        )}
      </View>
    </BasePage>
  );
};

export default SubCategoryProductList;
