import { Empty } from "@taroify/core";
import { ScrollView, View, ViewProps } from "@tarojs/components";
import classNames from "classnames";
import React from "react";

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
  const load = (
    <View className="w-full h-[80px] flex flex-center">
      {hasNext &&
        loading &&
        pagination?.pageNum &&
        pagination.pageNum > 1 &&
        " 加载中..."}
    </View>
  );
  if (pagination && pagination.total === 0) {
    return (
      <Empty>
        <Empty.Image />
        <Empty.Description>空空如也</Empty.Description>
      </Empty>
    );
  }
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
          ? list.map((item, index) => (
              <React.Fragment key={index}>
                {itemRender(item, index)}
              </React.Fragment>
            ))
          : children}
        {load}
      </View>
    </ScrollView>
  );
}
