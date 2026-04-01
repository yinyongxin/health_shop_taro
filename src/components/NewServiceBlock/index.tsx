import { ProductDetailServiceItem } from "@/client";
import { Box, Title } from "@/components";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { groupBy } from "lodash-es";

export type NewServiceBlockProps = {
  serviceList: ProductDetailServiceItem[];
  className?: string;
};

export const NewServiceBlock = (props: NewServiceBlockProps) => {
  const { serviceList = [], className } = props;
  const group = groupBy(serviceList, (item) => item.groupName);
  const groupKeys = Object.keys(group);
  console.log("group", group);
  return (
    <>
      <Box
        bgProps={{
          className: classNames("", className),
        }}
        className="flex flex-col"
      >
        {groupKeys.map((groupKey) => {
          const itemList = group?.[groupKey] || [];
          if (!itemList.length) {
            return null;
          }
          return (
            <View key={groupKey} className="flex flex-col mb-3">
              <Title key={groupKey} className="mb-2">
                {groupKey}
              </Title>
              <View className="bg-sky-100 rounded-md">
                {itemList?.map((item, index) => {
                  return (
                    <View
                      className="flex items-center gap-2 py-1.5 px-2 border-t border-sky-200 first:border-t-0"
                      key={item.itemId}
                    >
                      <View className="bg-sky-200 text-sky-500 size-4 flex-center rounded-full">
                        {index + 1}
                      </View>
                      <View className="flex-1 px-2 font-bold">
                        {item.itemName}
                      </View>
                      <View className="px-2 w-14 text-amber-500 font-semibold flex justify-end">
                        {item?.num} / {item.unit}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </Box>
    </>
  );
};
