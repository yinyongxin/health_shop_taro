import { getWxShopCateList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import Box from "@/components/Box";
import { useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { useState } from "react";

export const Sidebar = () => {
  const { data } = useRequest(async () => {
    const res = await getWxShopCateList({
      query: { orgId: APP_ENV_CONFIG.ORG_ID },
    });
    return res.data;
  });
  const [active, setActive] = useState(data?.data[0].id);
  return (
    <View className="h-full flex flex-col bg-linear-to-r from-white to-[#f6f6f6]">
      {data?.data?.map((item) => {
        const isActived = item.id === active;
        return (
          <Box
            key={item.id}
            className="w-full"
            wapperProps={{
              className: "p-[16px]",
            }}
            onClick={() => {
              setActive(item.id);
            }}
          >
            <View
              className={classNames("h-[80px] flex-center rounded-lg", {
                "bg-primary text-white font-semibold": isActived,
              })}
            >
              <Text>{item.name}</Text>
            </View>
          </Box>
        );
      })}
    </View>
  );
};
