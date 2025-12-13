import { CateInfo } from "@/client";
import Box from "@/components/Box";
import { View, Text, ScrollView } from "@tarojs/components";
import classNames from "classnames";

export type SidebarProps = {
  mainActive?: CateInfo;
  setMainActive: (value: CateInfo | undefined) => void;
  cateList: CateInfo[];
};

export const Sidebar = (props: SidebarProps) => {
  const { mainActive, setMainActive, cateList } = props;
  return (
    <ScrollView scrollY className="h-full pb-[180px] flex flex-col">
      {[...cateList].map((item) => {
        const isActived = item.id === mainActive?.id;
        return (
          <Box
            key={item.id}
            className="w-full"
            wapperProps={{
              className: "p-2",
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
    </ScrollView>
  );
};
