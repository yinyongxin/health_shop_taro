import Box from "@/components/Box";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { useState } from "react";

export const Sidebar = () => {
  const list = [
    {
      label: "全部",
      value: "all",
    },
    {
      label: "工具",
      value: "1",
    },
    {
      label: "中医",
      value: "2",
    },
    {
      label: "视力",
      value: "5",
    },
    {
      label: "药包",
      value: "3",
    },
    {
      label: "儿童",
      value: "4",
    },
    {
      label: "检测",
      value: "6",
    },
  ];
  const [active, setActive] = useState(list[0].value);
  return (
    <View className="h-full flex flex-col bg-linear-to-r from-white to-[#f6f6f6]">
      {list.map((item) => {
        const isActived = item.value === active;
        return (
          <Box
            key={item.value}
            className="w-full"
            wapperProps={{
              className: "p-[16px]",
            }}
            onClick={() => {
              setActive(item.value);
            }}
          >
            <View
              className={classNames("h-[80px] flex-center rounded-lg", {
                "bg-primary text-white font-semibold": isActived,
              })}
            >
              <Text>{item.label}</Text>
            </View>
          </Box>
        );
      })}
    </View>
  );
};
