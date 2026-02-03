import { View } from "@tarojs/components";

export const Skeleton = () => {
  return (
    <View className="flex flex-col gap-2 p-2 h-full pb-[180px]">
      <View className="w-full bg-gray-200 rounded-xl h-[120px]"></View>
      <View className="w-full bg-gray-200 rounded-xl h-[240px]"></View>
      <View className="w-full bg-gray-200 rounded-xl h-[480px]"></View>
      <View className="w-full bg-gray-200 rounded-xl h-[240px]"></View>
    </View>
  );
};
