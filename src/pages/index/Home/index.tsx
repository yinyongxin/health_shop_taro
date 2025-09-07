import { AppTopSearch, BasePage, LucideIcon, Title } from "@/components";
import { useLoad } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Grid } from "@taroify/core";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { Banners } from "./Banners";
import { TopSearch } from "./TopSearch";

export const Home = () => {
  useLoad(() => {});

  return (
    <BasePage
      bgProps={{
        children: <View className="page-bg"></View>,
      }}
    >
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
          <Grid columns={4} className="rounded-lg overflow-hidden">
            <Grid.Item
              icon={<LucideIcon name="image" size={32} />}
              text="分类1"
            />
            <Grid.Item
              icon={<LucideIcon name="image" size={32} />}
              text="分类2"
            />
            <Grid.Item
              icon={<LucideIcon name="image" size={32} />}
              text="分类3"
            />
            <Grid.Item
              icon={<LucideIcon name="image" size={32} />}
              text="分类4"
            />
            <Grid.Item
              icon={<LucideIcon name="image" size={32} />}
              text="功能1"
            />
            <Grid.Item
              icon={<LucideIcon name="image" size={32} />}
              text="功能2"
            />
            <Grid.Item
              icon={<LucideIcon name="image" size={32} />}
              text="功能3"
            />
            <Grid.Item
              icon={<LucideIcon name="image" size={32} />}
              text="功能4"
            />
          </Grid>
        </View>
        <View className="px-[24px] pt-[24px]">
          <Title
            className="py-[24px]"
            action={{
              text: "查看更多",
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
