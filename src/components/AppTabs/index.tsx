import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode, useEffect, useMemo, useState } from "react";

export type AppTab = {
  label: string;
  value: string;
  children?: ReactNode;
};

export type AppTabsProps = {
  tabs: AppTab[];
  className?: string;
  active?: string;
  defaultActive?: string;
  onChange?: (value: string) => void;
};
export const AppTabs = (props: AppTabsProps) => {
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
      <View
        className={classNames(
          "flex h-[100px] text-[28px] bg-linear-to-b from-[#f3f7ff] to-white",
          className,
        )}
      >
        {tabs.map((tab) => {
          return (
            <View
              className="relative flex-1 flex justify-center items-center"
              key={tab.value}
              onClick={() => {
                setActive(tab.value);
                onChange?.(tab.value);
              }}
            >
              <Text
                className={classNames([
                  "text-[28px] text-gray-800",
                  {
                    "text-blue-500! text-[30px] font-bold": active == tab.value,
                  },
                ])}
              >
                {tab.label}
              </Text>
              {active === tab.value && (
                <View
                  className={classNames(
                    "absolute left-[50%] bottom-[12px] -translate-x-1/2",
                    "h-[12px] rounded-full w-[80px]",
                    "bg-linear-to-r from-blue-400 to-blue-500",
                  )}
                ></View>
              )}
            </View>
          );
        })}
      </View>
      {content}
    </>
  );
};
