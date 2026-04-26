import { LucideIcon } from "@/components";
import { appRouter } from "@/router";
import { useAppEnvStore } from "@/stores";
import { View, ViewProps } from "@tarojs/components";

type TopSearchProps = {} & ViewProps;

export const TopSearch = (props: TopSearchProps) => {
  const { orgId } = useAppEnvStore();
  const { className, ...rest } = props;

  return (
    <View
      className={`px-4 py-3 flex items-center gap-3 ${className || ""}`}
      {...rest}
      onClick={() => {
        appRouter.navigateTo("wareList", {
          query: {
            orgId,
          },
        });
      }}
    >
      <LucideIcon name="search" size={20} />
      <View className="flex-1 text-sm text-slate-400">请输入搜索内容</View>
      <View className="text-sm font-medium text-sky-500">搜索</View>
    </View>
  );
};