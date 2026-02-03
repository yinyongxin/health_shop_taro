import { View } from "@tarojs/components";

export const Skeleton = () => {
  return (
    <View className="flex gap-2 p-2 h-full">
      <View className="flex-1 flex flex-col gap-2">
        <View className="bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
        <View className="bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
        <View className="bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
        <View className="bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
      </View>
      <View className="flex-1 flex flex-col gap-2">
        <View className="bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
        <View className="bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
        <View className="bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
        <View className="bg-gray-200 rounded-xl flex-1 animate-pulse"></View>
      </View>
    </View>
  );
};
