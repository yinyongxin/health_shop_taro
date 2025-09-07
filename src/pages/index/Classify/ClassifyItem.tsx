import { ClassifyInfo } from "@/client";
import { LucideIcon } from "@/components";
import { View, Image, Text } from "@tarojs/components";

export interface ClassifyItemProps {
  info: ClassifyInfo;
}
export const ClassifyItem = (props: ClassifyItemProps) => {
  const { info } = props;
  return (
    <View className="w-1/2 pl-2 pt-2 ">
      <View className="bg-white click-effect rounded-md flex flex-col items-center gap-2 p-[24px]">
        <View className="h-[180px] flex-center">
          <LucideIcon name="image" size={80} />
          {/* <Image src={info.picture} className="size-[140px]" /> */}
        </View>
        <View>
          <Text>{info.name}</Text>
        </View>
      </View>
    </View>
  );
};
