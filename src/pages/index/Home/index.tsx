import { BasePage, LucideIcon, Title } from "@/components";
import { View, Image } from "@tarojs/components";
import { Grid } from "@taroify/core";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { appRouter } from "@/router";
import { getWxShopCateList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { useRequest } from "@/hooks";
import { Banners } from "./Banners";
import { TopSearch } from "./TopSearch";
import { GridBlock } from "./GridBlock";

export const Home = () => {
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
        <View className="pt-[32px]">
          <Banners />
        </View>
        <View className="px-[24px] pt-[32px]">
          <GridBlock />
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
            全部商品
          </Title>
        </View>
        <SearchWareCardList />
      </View>
    </BasePage>
  );
};
