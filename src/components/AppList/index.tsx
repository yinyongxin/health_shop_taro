import { ScrollView, View, ViewProps } from "@tarojs/components";
import classNames from "classnames";

export type AppListProps<I = unknown> = {
  className?: string;
  list?: I[];
  itemRender?: (item: I, index: number) => React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  pagination?: {
    pageSize: number;
    pageNum: number;
    total: number;
  };
  bodyProps?: ViewProps;
  onLoad?: (pageNum: number) => void;
};

export function AppList<I>(props: AppListProps<I>) {
  const {
    className,
    list,
    itemRender,
    children,
    pagination,
    loading,
    bodyProps,
    onLoad,
  } = props;
  const hasNext = pagination
    ? pagination.total > pagination.pageSize * pagination.pageNum
    : false;
  const load = hasNext &&
    loading &&
    pagination?.pageNum &&
    pagination.pageNum > 1 && (
      <View className="w-full text-center pb-[32px] pt-[24px]">加载中...</View>
    );
  return (
    <ScrollView
      scrollY
      className={classNames(className)}
      onScrollToLower={() => {
        if (!hasNext) return;
        const newPageNum = (pagination?.pageNum || 0) + 1;
        onLoad?.(newPageNum);
      }}
    >
      <View {...bodyProps}>
        {list && itemRender
          ? list.map((item, index) => itemRender(item, index))
          : children}
        {load}
      </View>
    </ScrollView>
  );
}
