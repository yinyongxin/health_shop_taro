import { View } from "@tarojs/components";

export const Skeleton = () => {
  return (
    <View className="flex gap-2 p-2 h-full pb-[180px]">
      <View className="flex-1 bg-gray-200 rounded-lg"></View>
      <View className="flex-3 flex flex-col gap-2">
        <View className="flex gap-2 flex-1">
          <View className="flex-1 bg-white rounded-lg"></View>
          <View className="flex-1 bg-white rounded-lg"></View>
        </View>
        <View className="flex gap-2 flex-1">
          <View className="flex-1 bg-white rounded-lg"></View>
          <View className="flex-1 bg-white rounded-lg"></View>
        </View>
        <View className="flex gap-2 flex-1">
          <View className="flex-1 bg-white rounded-lg"></View>
          <View className="flex-1 bg-white rounded-lg"></View>
        </View>
        <View className="flex gap-2 flex-1">
          <View className="flex-1 bg-white rounded-lg"></View>
          <View className="flex-1 bg-white rounded-lg"></View>
        </View>
        <View className="flex gap-2 flex-1">
          <View className="flex-1 bg-white rounded-lg"></View>
          <View className="flex-1 bg-white rounded-lg"></View>
        </View>
      </View>
    </View>
  );
};
