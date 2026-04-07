import { Radio, RadioGroup, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { AppPopup, AppPopupProps } from ".";
import { AppButton } from "../AppButton";

export type RadioPopupItem = {
  title: string;
  value: string;
};

export type RadioPopupProps = AppPopupProps & {
  setOpen: (open: boolean) => void;
  defaultValue?: string;
  list: RadioPopupItem[];
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export const RadioPopup = (props: RadioPopupProps) => {
  const { onChange, defaultValue, list, setOpen, onSubmit, ...rest } = props;

  const { onClose, ...appPopupProps } = rest || {};

  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  return (
    <AppPopup
      onClose={(val) => {
        onClose?.(val);
        setOpen?.(false);
      }}
      {...appPopupProps}
      footer={
        <AppButton
          disabled={!value}
          status="error"
          onClick={() => {
            setOpen?.(false);
            onChange?.(value);
            onSubmit?.(value);
          }}
        >
          确定
        </AppButton>
      }
    >
      <RadioGroup
        onChange={(e) => {
          setValue(e.detail.value);
        }}
      >
        <View className="px-[32px]">
          {list.map((item) => {
            return (
              <View
                className="py-[24px] flex justify-between"
                key={item.value}
                onClick={() => {
                  setValue(item.value);
                }}
              >
                <View className="text-[28px] font-bold">{item.title}</View>
                <Radio
                  name={item.value}
                  value={item.value}
                  checked={item.value === value}
                />
              </View>
            );
          })}
        </View>
      </RadioGroup>
    </AppPopup>
  );
};
