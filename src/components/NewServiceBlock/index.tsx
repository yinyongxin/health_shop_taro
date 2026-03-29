import { ProductDetailServiceItem } from "@/client";
import Box from "@/components/Box";
import { View } from "@tarojs/components";
import classNames from "classnames";

export type NewServiceBlockProps = {
  serviceList: ProductDetailServiceItem[];
  className?: string;
};
export const NewServiceBlock = (props: NewServiceBlockProps) => {
  const { serviceList = [], className } = props;
  return (
    <>
      <Box
        bgProps={{
          className: classNames("bg-sky-100 rounded-md", className),
        }}
        className="flex flex-col"
      >
        {serviceList.map((item, index) => {
          return (
            <View
              className="flex items-center gap-2 py-1.5 px-2 border-t border-sky-200 first:border-t-0"
              key={item.itemId}
            >
              <View className="bg-sky-200 text-sky-500 size-4 flex-center rounded-full">
                {index + 1}
              </View>
              <View className="flex-1 px-2 font-bold">{item.itemName}</View>
              <View className="px-2 w-14 text-amber-500 font-semibold flex justify-end">
                {item?.num} / 次
              </View>
            </View>
          );
        })}
      </Box>
    </>
  );
};
