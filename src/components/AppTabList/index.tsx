import { View, Text, ScrollView } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AppTag } from "../AppTag";
import { LucideIcon } from "../LucideIcon";

export type AppTabListItem = {
  label: string;
  value: string;
  children?: ReactNode;
  icon?: string;
};

export type AppTabListProps = {
  tabs: AppTabListItem[];
  className?: string;
  active?: string;
  defaultActive?: string;
  onChange?: (value: string) => void;
};
export const AppTabList = (props: AppTabListProps) => {
  const {
    tabs,
    className,
    active: propsActive,
    defaultActive,
    onChange,
  } = props;
  const [active, setActive] = useState(defaultActive || propsActive);
  useEffect(() => {
    if (propsActive) {
      setActive(propsActive);
    }
  }, [propsActive]);
  const content = useMemo(() => {
    return tabs.find((tab) => tab.value === active)?.children;
  }, [active]);

  return (
    <>
      <ScrollView
        scrollX
        className={classNames(
          "border-t-4 border-white rounded-t-[32px]",
          "bg-linear-to-b from-[#F3F7FE] to-white",
          "w-full overflow-auto text-nowrap",
          "px-[24px] py-[24px]",
          "text-[28px]",
          className,
        )}
      >
        {tabs.map((tab) => {
          const actived = active === tab.value;
          return (
            <View key={tab.value} className="inline-block mr-[16px]">
              <AppTag
                size="xl"
                actived={actived}
                prefix={tab?.icon ? <LucideIcon name={tab.icon} /> : null}
                onClick={() => {
                  setActive(tab.value);
                  onChange?.(tab.value);
                }}
              >
                {tab.label}
              </AppTag>
            </View>
          );
        })}
      </ScrollView>
      {content}
    </>
  );
};
