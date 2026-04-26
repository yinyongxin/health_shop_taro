import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { appRouter } from "@/router";

const MENUS = [
  { id: "1", name: "临床禅", en: "Clinical Zen", page: "clinicalZen", desc: "清新 · 专业 · 信任", bg: "bg-emerald-100", text: "text-emerald-600" },
  { id: "2", name: "温暖关怀", en: "Warm Care", page: "warmCare", desc: "柔和 · 温暖 · 关怀", bg: "bg-orange-100", text: "text-orange-500" },
  { id: "3", name: "科技医疗", en: "MedTech", page: "medTech", desc: "科技 · 精准 · 未来", bg: "bg-blue-100", text: "text-blue-600" },
  { id: "4", name: "极简奢华", en: "Luxury Clinic", page: "luxuryClinic", desc: "优雅 · 品质 · 精致", bg: "bg-stone-200", text: "text-stone-600" },
];

export default function StyleDemo() {
  useLoad(() => {
    console.log("StyleDemo loaded");
  });

  return (
    <View className="min-h-screen bg-slate-50">
      <View className="px-5 pt-12 pb-6 bg-slate-600">
        <Text className="block text-2xl font-bold text-white">选择风格</Text>
        <Text className="block text-sm text-slate-300 mt-1">pick your favorite style</Text>
      </View>

      <View className="px-4 -mt-4">
        <View className="p-4 bg-white rounded-2xl shadow-sm">
          <Text className="text-sm text-slate-500">选择你喜欢的设计风格</Text>
          <Text className="text-xs text-slate-400 mt-0.5">4 种风格可选</Text>
        </View>
      </View>

      <View className="px-4 mt-4 pb-8">
        <View className="space-y-3">
          {MENUS.map((item, index) => (
            <View
              key={item.id}
              className="flex items-center p-4 bg-white rounded-2xl shadow-sm"
              onClick={() => appRouter.navigateTo(item.page as any)}
            >
              <View className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mr-4`}>
                <Text className={`text-xl ${item.text}`}>{String(index + 1).padStart(2, "0")}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-slate-800">{item.name}</Text>
                <Text className="text-xs text-slate-500 mt-0.5">{item.en}</Text>
                <Text className="text-xs text-slate-400 mt-0.5">{item.desc}</Text>
              </View>
              <Text className="text-slate-300">›</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}