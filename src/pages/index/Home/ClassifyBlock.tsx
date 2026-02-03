import { getWxShopCateList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { AppImage, LucideIcon } from "@/components";
import { useRequest } from "@/hooks";
import { appRouter } from "@/router";
import { Grid } from "@taroify/core";
import { View } from "@tarojs/components";

export const ClassifyBlock = () => {
  const { data, loading } = useRequest(async () => {
    const res = await getWxShopCateList({
      query: { orgId: APP_ENV_CONFIG.ORG_ID },
    });
    return res.data?.data.slice(0, 4);
  });

  if (loading && !data) {
    return (
      <View className="flex flex-col bg-white rounded-xl p-[24px] gap-2">
        <View className="flex gap-2">
          <View className="flex-1 bg-gray-200 h-[140px] rounded-xl"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-xl"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-xl"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-xl"></View>
        </View>
        <View className="flex gap-2">
          <View className="flex-1 bg-gray-200 h-[140px] rounded-xl"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-xl"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-xl"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-xl"></View>
        </View>
      </View>
    );
  }
  if (!data?.length) {
    return null;
  }
  return (
    <Grid columns={4} className="rounded-xl overflow-hidden">
      {data?.map((item) => (
        <Grid.Item
          onClick={() => {
            appRouter.navigateTo("subCategoryProductList", {
              query: {
                subCategoryId: item.id.toString(),
              },
            });
          }}
          key={item.id}
          icon={
            <View>
              {item.subCategoryList[0]?.logo ? (
                <AppImage
                  src={item.subCategoryList[0].logo || ""}
                  className="size-[60px]"
                  mode="aspectFill"
                />
              ) : (
                <LucideIcon className="text-gray-200" name="image" size={60} />
              )}
            </View>
          }
          text={
            <View className="truncate w-[130px] text-center">{item.name}</View>
          }
        />
      ))}
    </Grid>
  );
};
