import { View } from "@tarojs/components";

export const Skeleton = () => {
  return (
    <View className="flex flex-col gap-6 px-4 py-6">
      <View className="flex flex-col gap-3">
        <View className="w-1/3 h-[28px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-full h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-4/5 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-3/4 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-2/3 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
      </View>
      <View className="flex flex-col gap-3">
        <View className="w-1/4 h-[28px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-full h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-5/6 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-3/4 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-2/3 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-4/5 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
      </View>
      <View className="flex flex-col gap-3">
        <View className="w-1/3 h-[28px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-full h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-4/5 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
        <View className="w-1/2 h-[20px] bg-gray-200 animate-pulse rounded-md"></View>
      </View>
    </View>
  );
};
