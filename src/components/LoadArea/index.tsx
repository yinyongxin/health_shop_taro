import { PullRefresh, List, Loading } from "@taroify/core";
import { ListProps } from "@taroify/core/list/list";
import { PullRefreshProps } from "@taroify/core/pull-refresh/pull-refresh";
import classNames from "classnames";
import { PropsWithChildren, useEffect, useState } from "react";

export interface LoadAreaProps extends PropsWithChildren {
  onLoad?: () => void;
  onRefresh?: () => void;
  pullRefreshProps?: PullRefreshProps;
  listProps?: ListProps;
  hasMore?: boolean;
  loading?: boolean;
  className?: string;
}

export const LoadArea = (props: LoadAreaProps) => {
  const {
    loading,
    hasMore,
    children,
    onLoad,
    onRefresh,
    pullRefreshProps,
    listProps,
    className,
  } = props;
  const { className: restPullRefreshPropsName, ...restPullRefreshProps } =
    pullRefreshProps || {};
  const { className: listPropsClassName, ...restListProps } = listProps || {};
  const [refreshing, setRefreshing] = useState(false);
  const [reachTop, setReachTop] = useState(true);
  function hanldeRefresh() {
    if (loading || !onRefresh) {
      return;
    }
    setRefreshing(true);
    onRefresh?.();
  }

  const handleLoad = () => {
    if (loading || !onLoad) {
      return;
    }
    onLoad?.();
  };

  useEffect(() => {
    if (refreshing && !loading) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  return (
    <PullRefresh
      loading={refreshing}
      onRefresh={hanldeRefresh}
      reachTop={!!onRefresh && reachTop}
      className={classNames(className, restPullRefreshPropsName)}
      {...restPullRefreshProps}
    >
      <List
        loading={loading}
        hasMore={hasMore}
        onLoad={() => handleLoad()}
        fixedHeight={!!(onRefresh || onLoad)}
        onScroll={(e) => {
          const newReachTop = e.detail.scrollTop <= 50;
          if (reachTop !== newReachTop) {
            setReachTop(newReachTop);
          }
        }}
        className={classNames("h-full", listPropsClassName)}
        {...restListProps}
      >
        {children}
        {onLoad && (
          <List.Placeholder>
            {!refreshing && loading && <Loading>加载中...</Loading>}
            {!refreshing && !loading && !hasMore && "没有更多了"}
          </List.Placeholder>
        )}
      </List>
    </PullRefresh>
  );
};
