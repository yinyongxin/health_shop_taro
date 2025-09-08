import { LucideIcon } from "@/components";
import { appRouter } from "@/router";
import { View, ViewProps } from "@tarojs/components";

type TopSearchProps = {} & ViewProps;

export const TopSearch = (props: TopSearchProps) => {
  const { ...rest } = props;

  return (
    <View
      className="px-[28px] py-[20px] flex items-center gap-[24px] bg-white/70 backdrop-blur-md rounded-full"
      {...rest}
      onClick={() => {
        appRouter.navigateTo("wareList");
      }}
    >
      <LucideIcon name="search" size={22} />
      <View className="text-[28px] flex-1 text-gray-500">请输入搜索内容</View>
      <View className="text-[28px] font-semibold text-sky-500">搜索</View>
    </View>
  );
};
