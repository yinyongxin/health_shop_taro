import { DropdownMenu } from "@taroify/core";
import classNames from "classnames";
import { useState } from "react";

const options1 = [
  { title: "全部商品", value: 0 },
  // { title: "新款商品", value: 1 },
  // { title: "活动商品", value: 2 },
];

const options2 = [
  { title: "默认排序", value: 0 },
  // { title: "好评排序", value: 1 },
  // { title: "销量排序", value: 2 },
];

export type DownMenuProps = {
  className?: string;
};

export const DownMenu = (props: DownMenuProps) => {
  const { className } = props;
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  return (
    <DropdownMenu className={classNames("bg-transparent", className)}>
      <DropdownMenu.Item
        options={options1}
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
      />
      <DropdownMenu.Item
        options={options2}
        value={value2}
        onChange={(val) => {
          setValue2(val);
        }}
      />
    </DropdownMenu>
  );
};
