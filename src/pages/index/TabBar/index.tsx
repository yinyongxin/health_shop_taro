import { AppTabs } from "@/common";
import { isIOS } from "@/utils";
import { Text, View } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode } from "react";

export type TabBarItem = {
  label: string;
  value: (typeof AppTabs)[number]["value"];
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
      className={classNames("fixed bottom-0 left-0 right-0 z-[100]", {
        "pb-[34px]": isIOS(),
      })}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 -2px 16px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <View className="relative h-[100px] flex">
        {tabs.map((tab) => {
          const isActived = tab.value === currentActive;

          return (
            <View
              onClick={() => handleClick(tab)}
              key={tab.value}
              className={classNames(
                "flex-1 flex flex-col items-center justify-end pb-[8px]",
                "click-effect transition-all duration-200",
                {
                  "text-sky-600": isActived,
                  "text-slate-400": !isActived,
                }
              )}
            >
              <View
                className={classNames(
                  "w-[56px] h-[40px] flex items-center justify-center rounded-full mb-1",
                  "transition-all duration-200",
                  isActived && "bg-gradient-to-b from-sky-100 to-sky-50"
                )}
              >
                {tab.icon(isActived)}
              </View>

              <Text
                className={classNames("text-[20px] leading-none", {
                  "font-semibold text-sky-600": isActived,
                  "text-slate-400": !isActived,
                })}
              >
                {tab.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};