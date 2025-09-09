import { BasePage, LucideIcon, Title } from "@/components";
import { useLoad, showToast } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Grid } from "@taroify/core";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { appRouter } from "@/router";
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
        <View
          className="px-[24px] pt-[32px]"
          onClick={() => {
            showToast({ title: "尽请期待", icon: "none" });
          }}
        >
          <Grid columns={4} className="rounded-lg overflow-hidden">
            <Grid.Item
              icon={<LucideIcon name="hospital" size={32} />}
              text="就医"
            />
            <Grid.Item
              icon={<LucideIcon name="heart-pulse" size={32} />}
              text="心电图"
            />
            <Grid.Item
              icon={<LucideIcon name="biceps-flexed" size={32} />}
              text="体检"
            />
            <Grid.Item
              icon={<LucideIcon name="pill" size={32} />}
              text="药物"
            />
            <Grid.Item
              icon={<LucideIcon name="ambulance" size={32} />}
              text="救护"
            />
            <Grid.Item
              icon={<LucideIcon name="mars" size={32} />}
              text="男性健康"
            />
            <Grid.Item
              icon={<LucideIcon name="venus" size={32} />}
              text="女性健康"
            />
            <Grid.Item
              icon={<LucideIcon name="stethoscope" size={32} />}
              text="门诊"
            />
          </Grid>
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
