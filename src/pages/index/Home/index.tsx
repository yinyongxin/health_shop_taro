import { BasePage, LucideIcon, Title } from "@/components";
import { useLoad, showToast } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Grid } from "@taroify/core";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { appRouter } from "@/router";
import { CateInfo, getWxShopCateList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { useRequest } from "@/hooks";
import { useState } from "react";
import { Banners } from "./Banners";
import { TopSearch } from "./TopSearch";

export const Home = () => {
  const { data } = useRequest(async () => {
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
        <View
          className="px-[24px] pt-[32px]"
          onClick={() => {
            showToast({ title: "尽请期待", icon: "none" });
          }}
        >
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
                text={item.categoryName}
              />
            ))}
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
