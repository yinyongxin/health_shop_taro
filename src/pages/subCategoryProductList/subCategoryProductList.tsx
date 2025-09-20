import { AppTopSearch, BasePage } from "@/components";
import { ScrollView, View } from "@tarojs/components";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopCateProduct } from "@/client";
import classNames from "classnames";
import { SearchWareCard } from "@/components/SearchWareCard";
import { DownMenu } from "./DowmMenu";
import "./subCategoryProductList.css";

const SubCategoryProductList = () => {
  const pageParams = usePageParams<"subCategoryProductList">();
  const dataRequest = useRequest(async () => {
    const res = await getWxShopCateProduct({
      query: { subCategoryId: pageParams.subCategoryId },
    });
    return res?.data;
  });
  return (
    <BasePage
      bgProps={{ className: "page-bg" }}
      fullScreen
      className="flex-1 subCategoryProductListPage"
    >
      <View className="p-[24px]">
        <AppTopSearch />
      </View>
      <View className="flex-1 rounded-t-xl border-2 border-white flex flex-col overflow-hidden">
        <DownMenu />
        <ScrollView scrollY className="flex-1 bg-gray-100">
          {!dataRequest.loading && !dataRequest.data ? (
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
            <View className={classNames("pr-[24px] pb-[64px] flex flex-wrap")}>
              {dataRequest.data?.rows?.map((item) => (
                <SearchWareCard key={item.id} info={item} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </BasePage>
  );
};

export default SubCategoryProductList;
