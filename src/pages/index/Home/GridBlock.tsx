import { getWxShopCateList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { LucideIcon } from "@/components";
import { useRequest } from "@/hooks";
import { appRouter } from "@/router";
import { Grid } from "@taroify/core";
import { View, Image } from "@tarojs/components";

export const GridBlock = () => {
  const { data, loading } = useRequest(async () => {
    const res = await getWxShopCateList({
      query: { orgId: APP_ENV_CONFIG.ORG_ID },
    });
    return res.data?.data
      .map((item) => item.subCategoryList)
      .flat()
      .slice(0, 8);
  });

  if (loading && !data) {
    return (
      <View className="flex flex-col bg-white rounded-lg p-[24px] gap-2">
        <View className="flex gap-2">
          <View className="flex-1 bg-gray-200 h-[140px] rounded-lg"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-lg"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-lg"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-lg"></View>
        </View>
        <View className="flex gap-2">
          <View className="flex-1 bg-gray-200 h-[140px] rounded-lg"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-lg"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-lg"></View>
          <View className="flex-1 bg-gray-200 h-[140px] rounded-lg"></View>
        </View>
      </View>
    );
  }
  return (
    <Grid columns={4} className="rounded-lg overflow-hidden">
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
              {item?.logo ? (
                <Image
                  src={item.logo || ""}
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
