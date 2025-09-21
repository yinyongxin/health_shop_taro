import { AppTopSearch, BasePage } from "@/components";
import { ScrollView, View } from "@tarojs/components";
import { useState } from "react";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";
import { DownMenu } from "./DowmMenu";
import "./wareList.css";

const WareList = () => {
  const [value, setValue] = useState("");
  const [refreshNumber, setRefreshNumber] = useState(0);
  return (
    <BasePage
      bgProps={{ className: "page-bg" }}
      fullScreen
      className="flex-1 wareListPage"
    >
      <View className="p-[24px]">
        <AppTopSearch
          onSearch={(val) => {
            setValue(val);
            setRefreshNumber(refreshNumber + 1);
          }}
        />
      </View>
      <View className="flex-1 rounded-t-xl border-2 border-white flex flex-col overflow-hidden">
        <DownMenu />
        <ScrollView scrollY className="flex-1 bg-white">
          <SearchWareCardList
            searchWareCardProps={{ border: true }}
            searchKey={value}
            refreshNumber={refreshNumber}
          />
        </ScrollView>
      </View>
    </BasePage>
  );
};

export default WareList;
