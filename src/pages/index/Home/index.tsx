import { BasePage, LucideIcon, Title } from "@/components";
import { useLoad, showToast } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Grid } from "@taroify/core";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { appRouter } from "@/router";
import { getWxShopCateList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { useRequest } from "@/hooks";
import { Banners } from "./Banners";
import { TopSearch } from "./TopSearch";

export const Home = () => {
  const { data, loading } = useRequest(async () => {
    const res = await getWxShopCateList({
      query: { orgId: APP_ENV_CONFIG.ORG_ID },
    });
    return res.data?.data
      .map((item) => item.subCategoryList)
      .flat()
      .slice(0, 8);
  });
  useLoad(() => {});

  return (
    <BasePage>
      <View className="pt-[32px] pb-[144px]">
        <View className="px-[24px]">
          <TopSearch
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </View>
        <View className="px-[24px] pt-[32px]">
          <Banners />
        </View>
        <View className="px-[24px] pt-[32px]">
          {loading && !data ? (
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
          ) : (
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
                  icon={<LucideIcon name="image" size={32} />}
                  text={<View className="truncate w-[130px] text-center">{item.name}</View>}
                />
              ))}
            </Grid>
          )}
        </View>
        <View className="px-[24px] pt-[24px]">
          <Title
            className="py-[24px]"
            action={{
              text: "查看更多",
              onClick: () => {
                appRouter.navigateTo("wareList");
              },
            }}
          >
            推荐商品
          </Title>
        </View>
        <SearchWareCardList />
      </View>
    </BasePage>
  );
};
