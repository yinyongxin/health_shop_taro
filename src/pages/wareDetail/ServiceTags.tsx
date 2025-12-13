import { ProductInfo } from "@/client";
import { LucideIcon, AppTag } from "@/components";
import Box from "@/components/Box";
import { safeJson } from "@/utils";
import { View, ScrollView } from "@tarojs/components";
import { info } from "console";

export interface ServiceTagsProps {
  productInfo: ProductInfo;
}
export const ServiceTags = (props: ServiceTagsProps) => {
  const { productInfo } = props;
  return (
    <>
      <Box
        bgProps={{
          className: "bg-white rounded-lg",
        }}
      >
        <View className="px-[24px] py-[12px]">
          <View className="flex justify-between items-center gap-2 py-[12px]">
            <View className="text-gray-400">服务</View>
            <ScrollView
              scrollX
              className="flex-1 text-black flex gap-2 flex-nowrap"
            >
              {safeJson.parse(productInfo.serviceTags, []).map((tag) => (
                <AppTag
                  key={tag}
                  size="default"
                  status="secondary"
                  className="shrink-0"
                  prefix={<LucideIcon name="truck" />}
                >
                  {tag}
                </AppTag>
              ))}
            </ScrollView>
            <View className="text-gray-400">
              {/* <LucideIcon name="chevron-right" size={20} /> */}
            </View>
          </View>
        </View>
      </Box>
    </>
  );
};
