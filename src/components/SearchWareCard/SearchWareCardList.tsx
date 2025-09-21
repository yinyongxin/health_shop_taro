import { getWxShopProductSearch, ProductInfo } from "@/client";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { useRequest } from "@/hooks";
import { wareListMock } from "@/mock";
import { APP_ENV_CONFIG } from "@/common";
import { SearchWareCard, SearchWareCardProps } from ".";

export type SearchWareCardListProps = {
  data?: ProductInfo[];
  className?: string;
  searchWareCardProps?: Partial<SearchWareCardProps>;
};

export const SearchWareCardList = (props: SearchWareCardListProps) => {
  const dataRequest = useRequest(async () => {
    const res = await getWxShopProductSearch({
      query: {
        orgId: APP_ENV_CONFIG.ORG_ID,
        searchKey: "",
      },
    });
    return res.data;
  });
  const { className, searchWareCardProps } = props;

  return (
    <View
      className={classNames("pr-[24px] pb-[64px] flex flex-wrap", className)}
    >
      {dataRequest.data?.rows?.map((item, index) => (
        <SearchWareCard
          key={item.id + index}
          info={item}
          {...searchWareCardProps}
        />
      ))}
    </View>
  );
};
