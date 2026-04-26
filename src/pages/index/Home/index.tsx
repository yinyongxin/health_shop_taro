import { BasePage, Title } from "@/components";
import { Text, View } from "@tarojs/components";
import { useAppEnvStore } from "@/stores";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { appRouter } from "@/router";
import { Banners } from "./Banners";
import { TopSearch } from "./TopSearch";

export const Home = () => {
  const { orgId } = useAppEnvStore();
  return (
    <BasePage>
      <View
        className="pt-8 pb-4"
        style={{
          background: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
        }}
      >
        <View className="px-2 flex justify-between">
          <Text className="text-xl font-bold text-white">健康商城</Text>
          <Text className="text-xs text-sky-100 mt-1">Medical Healthcare</Text>
        </View>
        <View className="px-2 mt-4">
          <TopSearch
            className="bg-white/80 backdrop-blur-sm rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </View>
      </View>

      <Banners className="pt-[32px]" orgId={orgId} />

      <View className="px-2 mt-4">
        <View className="bg-white/80 backdrop-blur-sm rounded-2xl p-4">
          <Title
            action={{
              text: "查看更多",
              onClick: () => {
                appRouter.navigateTo("wareList", {
                  query: {
                    orgId,
                  },
                });
              },
            }}
          >
            推荐商品
          </Title>
        </View>
      </View>

      <View className="mt-2 pr-2 pb-[144px]">
        <SearchWareCardList orgId={orgId} />
      </View>
    </BasePage>
  );
};
