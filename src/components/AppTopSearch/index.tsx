import { Input, View, ViewProps } from "@tarojs/components";
import { useEffect, useState } from "react";
import { LucideIcon } from "../LucideIcon";

type AppTopSeatchProps = {
  onSearch?: (value) => void;
  value?: string;
  onChange?: (value: string) => void;
} & ViewProps;

export const AppTopSearch = (props: AppTopSeatchProps) => {
  const { onSearch, value: propsValue = "", onChange, ...rest } = props;
  const [value, setValue] = useState(propsValue);
  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);
  return (
    <View
      className="px-[28px] py-[20px] flex items-center gap-[24px] bg-white/70 backdrop-blur-md rounded-full"
      {...rest}
    >
      <LucideIcon name="search" size={22} />
      <Input
        value={value}
        onInput={(e) => {
          setValue(e.detail.value);
          onChange?.(e.detail.value);
        }}
        placeholder="请输入搜索内容"
        className="flex-1 flex items-center text-[28px]"
      />
      <View
        className="text-[28px] font-semibold text-sky-500"
        onClick={() => {
          onSearch?.(value);
        }}
      >
        搜索
      </View>
    </View>
  );
};
