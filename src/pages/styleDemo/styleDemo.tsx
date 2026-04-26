import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { appRouter } from "@/router";

const MENUS = [
  { id: "1", name: "临床禅", en: "Clinical Zen", page: "clinicalZen", desc: "清新 · 专业 · 信任", bg: "bg-emerald-100", gradient: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)", text: "text-emerald-600" },
  { id: "2", name: "温暖关怀", en: "Warm Care", page: "warmCare", desc: "柔和 · 温暖 · 关怀", bg: "bg-orange-100", gradient: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)", text: "text-orange-500" },
  { id: "3", name: "科技医疗", en: "MedTech", page: "medTech", desc: "科技 · 精准 · 未来", bg: "bg-blue-100", gradient: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)", text: "text-blue-600" },
  { id: "4", name: "极简奢华", en: "Luxury Clinic", page: "luxuryClinic", desc: "优雅 · 品质 · 精致", bg: "bg-stone-200", gradient: "linear-gradient(135deg, #E7E5E4 0%, #D6D3D1 100%)", text: "text-stone-600" },
];

export default function StyleDemo() {
  useLoad(() => {
    console.log("StyleDemo loaded");
  });

  return (
    <View className="min-h-screen" style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)" }}>
      <View className="px-5 pt-12 pb-6" style={{ background: "linear-gradient(135deg, #64748B 0%, #94A3B8 100%)" }}>
        <Text className="block text-2xl font-bold text-white">选择风格</Text>
        <Text className="block text-sm text-slate-200 mt-1">pick your favorite style</Text>
      </View>

      <View className="px-4 -mt-4">
        <View className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
          <Text className="text-sm text-slate-500">选择你喜欢的设计风格</Text>
          <Text className="text-xs text-slate-400 mt-0.5">4 种风格可选</Text>
        </View>
      </View>

      <View className="px-4 mt-4 pb-8">
        <View className="space-y-3">
          {MENUS.map((item, index) => (
            <View
              key={item.id}
              className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm"
              onClick={() => appRouter.navigateTo(item.page as any)}
            >
              <View className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: item.gradient }}>
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