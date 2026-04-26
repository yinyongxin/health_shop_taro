import { Input, Text, View, ViewProps } from "@tarojs/components";
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
      className="flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl"
      style={{
        boxShadow: "0 2px 12px 0 rgba(14, 165, 233, 0.1)",
      }}
      {...rest}
    >
      <LucideIcon className="text-slate-400" name="search" size={20} />
      <Input
        value={value}
        onInput={(e) => {
          setValue(e.detail.value);
          onChange?.(e.detail.value);
        }}
        placeholder="搜索商品、服务..."
        placeholderClassName="text-slate-300"
        className="flex-1 h-[40px] text-[26px] text-slate-700 leading-[40px]"
      />
      <View
        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-sky-400"
        onClick={() => {
          onSearch?.(value);
        }}
      >
        <Text className="text-white text-[22px] font-medium">搜索</Text>
      </View>
    </View>
  );
};