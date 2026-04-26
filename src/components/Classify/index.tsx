import { BasePage } from "@/components";
import { Text, View, ScrollView } from "@tarojs/components";
import { CateInfo, getWxShopCateList } from "@/client";
import { useState } from "react";
import { useRequest } from "@/hooks";
import { Sidebar } from "./Sidebar";
import { ClassifyItem } from "./ClassifyItem";
import { Skeleton } from "./Skeleton";

export type ClassifyPropsType = {
  orgId?: string;
};

export const Classify = (props: ClassifyPropsType) => {
  const { orgId } = props;
  const [mainActive, setMainActive] = useState<CateInfo>();
  const { subCategoryList = [] } = mainActive || {};
  const { data, loading } = useRequest(
    async () => {
      if (!orgId) {
        return;
      }
      const res = await getWxShopCateList({
        query: {
          orgId,
        },
      });
      setMainActive(res.data?.data?.[0]);
      return res.data;
    },
    {
      refreshDeps: [orgId],
    },
  );
  if (loading && !data) {
    return <Skeleton />;
  }

  return (
    <BasePage fullScreen>
      <View className="flex h-full w-full overflow-hidden">
        <View className="w-25 bg-slate-50/80">
          <Sidebar
            cateList={data?.data || []}
            mainActive={mainActive}
            setMainActive={setMainActive}
          />
        </View>
        <ScrollView scrollY className="flex-1 bg-slate-100/50">
          <View className="py-3">
            <Text className="px-3 text-[22px] text-slate-400">
              共{subCategoryList.length} 个分类
            </Text>
          </View>
          <View className="flex flex-col gap-3 pb-[180px]">
            {[...subCategoryList].map((item) => (
              <ClassifyItem key={item.id} info={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};
