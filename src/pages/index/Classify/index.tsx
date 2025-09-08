import { BasePage } from "@/components";
import { View, Image, Text, ScrollView } from "@tarojs/components";
import { useRequest } from "@/hooks";
import { ClassifyInfo, getGetClassifyList } from "@/client";
import { Sidebar } from "./Sidebar";
import { ClassifyItem } from "./ClassifyItem";

export const Classify = () => {
  const dataRequest = useRequest(async () => {
    const res = await getGetClassifyList();
    return res.data;
  });
  const list: ClassifyInfo[] = [
    {
      id: "1",
      name: "中医针灸",
      picture:
        "https://img2.baidu.com/it/u=2323420690,2310029930&fm=253&fmt=auto&app=120&f=JPEG?w=1030&h=800",
    },
    {
      id: "6",
      name: "HPV检测试纸",
      picture:
        "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00644-1586.jpg",
    },
    {
      id: "7",
      name: "艾草药包",
      picture:
        "https://img0.baidu.com/it/u=459634292,4287832994&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=658",
    },
    {
      id: "3",
      name: "视力训练",
      picture:
        "https://img2.baidu.com/it/u=350801383,1610036490&fm=253&fmt=auto?w=800&h=1619",
    },
    {
      id: "4",
      name: "儿童护理",
      picture:
        "https://img0.baidu.com/it/u=4114510386,2947591966&fm=253&fmt=auto&app=120&f=JPEG?w=752&h=500",
    },
    {
      id: "5",
      name: "儿童肢体训练",
      picture:
        "https://img2.baidu.com/it/u=564003111,1804162272&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
    },
  ];
  return (
    <BasePage fullScreen>
      <View className="flex h-full w-full overflow-hidden">
        <View className="flex-1">
          <Sidebar />
        </View>
        <ScrollView scrollY className="flex-3">
          <View className="flex flex-wrap pr-2 pb-[144px]">
            {list.map((item, index) => (
              <ClassifyItem key={item.id + index} info={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};
