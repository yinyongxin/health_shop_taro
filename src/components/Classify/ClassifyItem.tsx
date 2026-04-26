import { SubCategoryInfo } from "@/client";
import { AppImage, LucideIcon } from "@/components";
import { appRouter } from "@/router";
import { Text, View } from "@tarojs/components";

export interface ClassifyItemProps {
  info: SubCategoryInfo;
}

export const ClassifyItem = (props: ClassifyItemProps) => {
  const { info } = props;

  return (
    <View
      className="px-3"
      onClick={() => {
        appRouter.navigateTo("subCategoryProductList", {
          query: { subCategoryId: info.id.toString() },
        });
      }}
    >
      <View
        className="flex items-center gap-3 p-3 rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)",
        }}
      >
        <View className="w-[100px] h-[100px] flex-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-50">
          {info?.logo ? (
            <AppImage
              src={info.logo || ""}
              className="w-[60px] h-[60px]"
              mode="aspectFill"
            />
          ) : (
            <LucideIcon className="text-slate-300" name="image" size={40} />
          )}
        </View>

        <View className="flex-1 flex flex-col gap-2">
          <Text className="text-[28px] font-semibold text-slate-800 shrink-0 line-clamp-1">
            {info.name}
          </Text>
          <Text className="text-[24px] text-slate-500 line-clamp-2 overflow-hidden">
            {info.description || "暂无描述"}
          </Text>
        </View>

        <View className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
          <LucideIcon
            className="text-slate-400"
            name="chevron-right"
            size={18}
          />
        </View>
      </View>
    </View>
  );
};
