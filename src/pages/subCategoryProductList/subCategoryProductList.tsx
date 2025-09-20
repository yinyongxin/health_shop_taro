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
        <ScrollView scrollY className="flex-1 bg-white">
          <View className={classNames("pr-[24px] pb-[64px] flex flex-wrap")}>
            {dataRequest.data?.rows?.map((item) => (
              <SearchWareCard key={item.id} info={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};

export default SubCategoryProductList;
