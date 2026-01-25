import { useRequest } from "@/hooks";
import { useAppAuthStore, useAppUserStore } from "@/stores";
import { DropdownMenu } from "@taroify/core";
import classNames from "classnames";
import { useState } from "react";

const options1 = [
  { title: "全部商品", value: 0 },
  // { title: "新款商品", value: 1 },
  // { title: "活动商品", value: 2 },
];

export type DownMenuProps = {
  className?: string;
};

export const DownMenu = (props: DownMenuProps) => {
  const { className } = props;
  const [value, setValue] = useState(0);
  const [order, setOrder] = useState(0);
  const options2 = useRequest(async () => {
    return [
      { title: "默认排序", value: 0 },
      { title: "新款商品", value: "new" },
      { title: "活动商品", value: "sell" },
    ];
  });
  return (
    <DropdownMenu className={classNames("bg-transparent", className)}>
      <DropdownMenu.Item
        options={options1}
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
      />
      {options2.data && (
        <DropdownMenu.Item
          options={options2.data || []}
          value={order}
          onChange={(val) => {
            setOrder(val);
          }}
        />
      )}
    </DropdownMenu>
  );
};
