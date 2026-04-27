import { BasePage, Title } from "@/components";
import { appRouter } from "@/router";
import { useAppEnvStore } from "@/stores";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { Text, View } from "@tarojs/components";
import { Banners } from "./Banners";
import { TopSearch } from "./TopSearch";
import { Categories } from "./Categories";

const HeaderSection = () => {
  const { orgId } = useAppEnvStore();

  return (
    <View
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0284C7 0%, #38BDF8 60%, #7DD3FC 100%)",
      }}
    >
      <View className="absolute inset-0 overflow-hidden">
        <View className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-white/10" />
        <View className="absolute -bottom-20 -left-20 w-[280px] h-[280px] rounded-full bg-white/5" />
        <View className="absolute top-20 right-20 w-[80px] h-[80px] rounded-full bg-white/10" />
      </View>

      <View className="relative pt-6 px-3 pb-5">
        <View className="flex items-center justify-between">
          <View className="flex items-center gap-3">
            <View className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Text className="text-xl">🏥</Text>
            </View>
            <View>
              <Text className="text-lg font-semibold text-white">健康商城</Text>
            </View>
          </View>
          <View className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Text className="text-white text-base">📍</Text>
          </View>
        </View>

        <View className="mt-4">
          <TopSearch className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg shadow-sky-500/20" />
        </View>

        <Categories orgId={orgId} />
      </View>
    </View>
  );
};

export const Home = () => {
  const { orgId } = useAppEnvStore();
  return (
    <BasePage>
      <HeaderSection />
      <View className="bg-gradient-to-b from-sky-100 to-white">
        <Banners orgId={orgId} />

        <View className="px-3 mt-2">
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

        <View className="mt-2 pb-[144px]">
          <SearchWareCardList
            orgId={orgId}
            openLoad={false}
            defaultPageSize={10}
          />
        </View>
      </View>
    </BasePage>
  );
};
