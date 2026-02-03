import { View } from "@tarojs/components";

export const Skeleton = () => {
  return (
    <View className="flex flex-col gap-2 p-3">
      <View className="w-full bg-gray-200 rounded-xl h-[340px]"></View>
      <View className="w-full bg-gray-200 rounded-xl h-[340px]"></View>
      <View className="w-full bg-gray-200 rounded-xl h-[340px]"></View>
    </View>
  );
};
