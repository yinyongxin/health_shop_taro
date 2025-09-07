import { AppTopSearch, BasePage } from "@/components";
import { ScrollView, View } from "@tarojs/components";
import { SearchWareCardList } from "@/components/SearchWareCard/SearchWareCardList";

const MyLikeList = () => {
  return (
    <BasePage
      bgProps={{ className: "page-bg" }}
      fullScreen
      className="flex-1 myLikeList"
    >
      <View className="p-[24px]">
        <AppTopSearch />
      </View>
      <View className="flex-1 rounded-t-xl border-4 border-white flex flex-col overflow-hidden">
        <ScrollView scrollY className="flex-1 bg-white">
          <SearchWareCardList searchWareCardProps={{ border: true }} />
        </ScrollView>
      </View>
    </BasePage>
  );
};

export default MyLikeList;
