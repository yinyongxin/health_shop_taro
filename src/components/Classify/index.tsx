import { BasePage } from "@/components";
import { View, ScrollView } from "@tarojs/components";
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
        <View className="flex-1">
          <Sidebar
            cateList={data?.data || []}
            mainActive={mainActive}
            setMainActive={setMainActive}
          />
        </View>
        <ScrollView scrollY className="flex-3">
          <View className="flex flex-col px-2 pb-[180px]">
            {[...subCategoryList].map((item) => (
              <ClassifyItem key={item.id} info={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};
