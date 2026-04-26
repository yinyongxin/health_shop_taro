import { CateInfo } from "@/client";
import { Box } from "@/components";
import { Text, View } from "@tarojs/components";
import classNames from "classnames";

export type SidebarProps = {
  mainActive?: CateInfo;
  setMainActive: (value: CateInfo | undefined) => void;
  cateList: CateInfo[];
};

export const Sidebar = (props: SidebarProps) => {
  const { mainActive, setMainActive, cateList } = props;

  return (
    <View className="h-full flex flex-col bg-white/60">
      {[...cateList].map((item) => {
        const isActived = item.id === mainActive?.id;

        return (
          <Box
            key={item.id}
            className="w-full"
            wapperProps={{
              className: "px-3 pt-3",
            }}
            onClick={() => {
              setMainActive(item);
            }}
          >
            <View
              className={classNames(
                "h-[80px] flex-center rounded-xl px-3",
                "transition-all duration-200",
                isActived
                  ? "bg-gradient-to-r from-sky-500 to-sky-400 text-white font-semibold shadow-md"
                  : "text-slate-600 active:bg-slate-100"
              )}
            >
              <Text className={classNames("text-[26px]", isActived && "text-white")}>
                {item.name}
              </Text>
            </View>
          </Box>
        );
      })}
    </View>
  );
};