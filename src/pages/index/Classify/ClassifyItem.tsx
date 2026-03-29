import { SubCategoryInfo } from "@/client";
import { AppImage, LucideIcon } from "@/components";
import { appRouter } from "@/router";
import { View } from "@tarojs/components";

export interface ClassifyItemProps {
  info: SubCategoryInfo;
}
export const ClassifyItem = (props: ClassifyItemProps) => {
  const { info } = props;
  return (
    <View
      className="pt-2"
      onClick={() => {
        appRouter.navigateTo("subCategoryProductList", {
          query: { subCategoryId: info.id.toString() },
        });
      }}
    >
      <View className="bg-white click-effect rounded-lg flex items-center gap-2 p-2">
        <View className="size-[100px] flex-center overflow-hidden rounded-lg bg-gray-100">
          {info?.logo ? (
            <AppImage
              src={info.logo || ""}
              className="size-[100px]"
              mode="aspectFill"
            />
          ) : (
            <LucideIcon className="text-gray-200" name="image" size={50} />
          )}
        </View>
        <View className="h-[100px] flex-1 flex flex-col gap-[8px] justify-start">
          <View className="line-clamp-1">{info.name}</View>
          <View className="text-gray-400 line-clamp-2 overflow-hidden">
            {info.description || "暂无描述"}
          </View>
        </View>
      </View>
    </View>
  );
};
