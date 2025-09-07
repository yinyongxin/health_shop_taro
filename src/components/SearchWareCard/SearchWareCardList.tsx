import { getGetWaresPage, WareInfo } from "@/client";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { useRequest } from "@/hooks";
import { SearchWareCard, SearchWareCardProps } from ".";

export type SearchWareCardListProps = {
  data?: WareInfo[];
  className?: string;
  searchWareCardProps?: Partial<SearchWareCardProps>;
};

export const SearchWareCardList = (props: SearchWareCardListProps) => {
  const dataRequest = useRequest(async () => {
    const res = await getGetWaresPage();
    return res.data;
  });
  const { data = [], className, searchWareCardProps } = props;
  const list = data.length ? data : dataRequest.data?.list || [];
  return (
    <View
      className={classNames("pr-[24px] pb-[64px] flex flex-wrap", className)}
    >
      {[...list, ...list, ...list, ...list].map((item, index) => (
        <SearchWareCard
          key={item.id + index}
          info={item}
          {...searchWareCardProps}
        />
      ))}
    </View>
  );
};
