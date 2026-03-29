import { BasePage, Title } from "@/components";
import { View } from "@tarojs/components";
import { useAppEnvStore } from "@/stores";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { appRouter } from "@/router";
import { Banners } from "./Banners";
import { TopSearch } from "./TopSearch";
// import { GridBlock } from "./GridBlock";

export const Home = () => {
  const { orgId } = useAppEnvStore();
  return (
    <BasePage>
      <View className="pt-[32px] pb-[144px]">
        <View className="px-2">
          <TopSearch
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </View>
        <View className="pt-[32px]">
          <Banners />
        </View>
        {/* <GridBlock /> */}
        <View className="px-2 pt-[24px]">
          <Title
            className="pt-[24px]"
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
        <SearchWareCardList orgId={orgId} />
      </View>
    </BasePage>
  );
};
