import { AppTag, Box } from "@/components";
import { View, ScrollView } from "@tarojs/components";
import classNames from "classnames";

export interface ServiceTagsProps {
  serviceTags?: string[];
  className?: string;
}
/**
 * 服务标签
 */
export const ServiceTags = (props: ServiceTagsProps) => {
  const { serviceTags = [], className } = props;
  return (
    <>
      <Box
        bgProps={{
          className: classNames("bg-white", className),
        }}
      >
        <View className="px-[24px] py-[12px]">
          <ScrollView
            scrollX
            className="flex-1 text-black flex gap-2 flex-nowrap"
          >
            {serviceTags.map((tag) => (
              <AppTag
                key={tag}
                size="default"
                status="secondary"
                className="shrink-0"
              >
                {tag}
              </AppTag>
            ))}
          </ScrollView>
        </View>
      </Box>
    </>
  );
};
