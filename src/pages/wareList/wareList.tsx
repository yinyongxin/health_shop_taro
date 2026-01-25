import { AppTopSearch, BasePage } from "@/components";
import { View } from "@tarojs/components";
import { useState } from "react";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { DropdownMenu } from "@taroify/core";
import classNames from "classnames";
import "./wareList.css";

const WareList = () => {
  const [search, setSearch] = useState("");
  const [refreshNumber, setRefreshNumber] = useState(0);
  const [value, setValue] = useState(0);
  const [order, setOrder] = useState<"default" | "new" | "sell">();
  return (
    <BasePage
      bgProps={{ className: "page-bg" }}
      fullScreen
      className="flex-1 wareListPage"
    >
      <View className="p-[24px]">
        <AppTopSearch
          onSearch={(val) => {
            setSearch(val);
            setRefreshNumber(refreshNumber + 1);
          }}
        />
      </View>
      <View className="flex-1 rounded-t-xl border-2 border-white flex flex-col overflow-hidden bg-gray-100">
        <DropdownMenu className={classNames("bg-transparent")}>
          <DropdownMenu.Item
            options={[
              { title: "全部商品", value: 0 },
              // { title: "新款商品", value: 1 },
              // { title: "活动商品", value: 2 },
            ]}
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
          />
          <DropdownMenu.Item
            options={[
              { title: "默认排序", value: "default" },
              { title: "新款商品", value: "new" },
              { title: "活动商品", value: "sell" },
            ]}
            value={order}
            onChange={(val) => {
              setOrder(val);
            }}
          />
        </DropdownMenu>
        <SearchWareCardList
          searchWareCardProps={{ border: true }}
          searchKey={search}
          refreshNumber={refreshNumber}
          order={order === "default" ? undefined : order}
        />
      </View>
    </BasePage>
  );
};

export default WareList;
