import { View } from "@tarojs/components";

export const Skeleton = () => {
  return (
    <View className="h-full flex flex-col gap-2 p-3">
      <View className="w-full bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
      <View className="w-full bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
      <View className="w-full bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
    </View>
  );
};
