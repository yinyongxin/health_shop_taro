import { View } from "@tarojs/components";

export const Skeleton = () => {
  return (
    <View className="flex flex-col gap-2 p-2 pb-[180px]">
      <View className="w-full bg-gray-200 rounded-lg h-[320px]"></View>
      <View className="w-full bg-gray-200 rounded-lg h-[320px]"></View>
      <View className="w-full bg-gray-200 rounded-lg h-[320px]"></View>
      <View className="w-full bg-gray-200 rounded-lg h-[320px]"></View>
    </View>
  );
};
