import { getGetWaresPage, WareInfo } from "@/client";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { useRequest } from "@/hooks";
import { wareListMock } from "@/mock";
import { SearchWareCard, SearchWareCardProps } from ".";

export type SearchWareCardListProps = {
  data?: WareInfo[];
  className?: string;
  searchWareCardProps?: Partial<SearchWareCardProps>;
};

export const SearchWareCardList = (props: SearchWareCardListProps) => {
  const dataRequest = useRequest(async () => {
    const res = await getGetWaresPage();
    return wareListMock;
  });
  const { data, className, searchWareCardProps } = props;

  return (
    <View
      className={classNames("pr-[24px] pb-[64px] flex flex-wrap", className)}
    >
      {(data || dataRequest.data)?.map((item, index) => (
        <SearchWareCard
          key={item.id + index}
          info={item}
          {...searchWareCardProps}
        />
      ))}
    </View>
  );
};
