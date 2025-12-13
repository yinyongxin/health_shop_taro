import { SubCategoryInfo } from "@/client";
import { LucideIcon } from "@/components";
import { appRouter } from "@/router";
import { View, Image, Text } from "@tarojs/components";

export interface ClassifyItemProps {
  info: SubCategoryInfo;
}
export const ClassifyItem = (props: ClassifyItemProps) => {
  const { info } = props;
  return (
    <View
      className="w-1/2 pl-2 pt-2 "
      onClick={() => {
        appRouter.navigateTo("subCategoryProductList", {
          query: { subCategoryId: info.id.toString() },
        });
      }}
    >
      <View className="bg-white click-effect rounded-md flex flex-col items-center gap-2 p-[24px]">
        <View className="h-[100px] flex-center">
          {info?.logo ? (
            <Image
              src={info.logo || ""}
              className="size-[80px]"
              mode="aspectFill"
            />
          ) : (
            <LucideIcon className="text-gray-200" name="image" size={60} />
          )}
        </View>
        <View className="line-clamp-1">{info.name}</View>
      </View>
    </View>
  );
};
