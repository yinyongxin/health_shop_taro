import { CateInfo, getWxShopCateList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import Box from "@/components/Box";
import { useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";

export type SidebarProps = {
  mainActive?: CateInfo;
  setMainActive: (value: CateInfo | undefined) => void;
  cateList: CateInfo[];
};

export const Sidebar = (props: SidebarProps) => {
  const { mainActive, setMainActive, cateList } = props;
  return (
    <View className="h-full flex flex-col bg-linear-to-r from-white to-[#f6f6f6]">
      {cateList.map((item) => {
        const isActived = item.id === mainActive?.id;
        return (
          <Box
            key={item.id}
            className="w-full"
            wapperProps={{
              className: "p-[16px]",
            }}
            onClick={() => {
              setMainActive(item);
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
