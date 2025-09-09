import { isIOS } from "@/utils";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode } from "react";

export type TabBarItem = {
  label: string;
  value: string;
  icon: (actived: boolean) => ReactNode;
};

export type TabBarProps = {
  currentActive: string;
  tabs: Readonly<TabBarItem[]>;
  handleClick: (tab: TabBarItem) => void;
};

export const TabBar = (props: TabBarProps) => {
  const { tabs, currentActive, handleClick } = props;
  return (
    <View
      className={classNames("fixed bottom-0 left-0 right-0 z-[10]", {
        "pb-[32px]": isIOS(),
      })}
    >
      <View className="absolute inset-0 bg-white/80 backdrop-blur-md shadow-[0_0_16px_0] shadow-gray-200"></View>
      <View className="relative h-[120px] flex">
        {tabs.map((tab) => {
          const isActived = tab.value === currentActive;
          return (
            <View
              onClick={() => handleClick(tab)}
              key={tab.value}
              className={classNames("flex-1 flex flex-col items-center", {
                "text-sky-600": isActived,
              })}
            >
              <View className="flex-1 flex justify-center items-center text-[48px]">
                {tab.icon(isActived)}
              </View>
              <View
                className={classNames("pb-[8px]", {
                  "font-semibold": isActived,
                })}
              >
                {tab.label}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
