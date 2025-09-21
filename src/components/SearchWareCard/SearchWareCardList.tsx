import { getWxShopProductSearch, ProductInfo } from "@/client";
import { View } from "@tarojs/components";
import { useRequest } from "@/hooks";
import { APP_ENV_CONFIG } from "@/common";
import { SearchWareCard, SearchWareCardProps } from ".";
import { AppList } from "../AppList";

export type SearchWareCardListProps = {
  data?: ProductInfo[];
  className?: string;
  searchWareCardProps?: Partial<SearchWareCardProps>;
  searchKey?: string;
  refreshNumber?: number;
};

export const SearchWareCardList = (props: SearchWareCardListProps) => {
  const {
    searchKey = "",
    className,
    searchWareCardProps,
    refreshNumber,
  } = props;
  const dataRequest = useRequest(
    async (pageNum: number = 1) => {
      const res = await getWxShopProductSearch({
        query: {
          orgId: APP_ENV_CONFIG.ORG_ID,
          searchKey: searchKey,
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
      refreshDeps: [searchKey, refreshNumber],
    },
  );
  if (dataRequest.loading && !dataRequest.data) {
    return (
      <View className="flex gap-2 p-2 h-full w-full pb-[180px]">
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
    );
  }

  return (
    <AppList
      {...dataRequest.data}
      loading={dataRequest.loading}
      bodyProps={{
        className: "pr-[24px] pb-[64px] flex flex-wrap",
      }}
      itemRender={(item) => (
        <SearchWareCard info={item} {...searchWareCardProps} />
      )}
      className={className}
      onLoad={dataRequest.run}
    ></AppList>
  );
};
