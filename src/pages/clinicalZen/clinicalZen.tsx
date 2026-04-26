import { View, Text, Input } from "@tarojs/components";
import { useState } from "react";

const CATEGORIES = [
  { id: 1, name: "药品" },
  { id: 2, name: "保健品" },
  { id: 3, name: "医疗器械" },
  { id: 4, name: "护理用品" },
];

const PRODUCTS = [
  { id: 1, name: "维生素C咀嚼片", desc: "补充维C 增强抵抗力", price: 59 },
  { id: 2, name: "钙尔奇钙片", desc: "成人钙 骨骼健康", price: 89 },
  { id: 3, name: "感冒灵颗粒", desc: "解热镇痛", price: 15.5 },
  { id: 4, name: "医用口罩", desc: "防护口罩 独立包装", price: 25 },
];

export default function ClinicalZenPage() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <View className="min-h-screen bg-emerald-50">
      <View className="px-5 pt-12 pb-6 bg-emerald-600">
        <View className="flex items-center justify-between mb-4">
          <Text className="text-xl font-bold text-white">健康商城</Text>
          <Text className="text-emerald-100 text-sm">Clinical Zen</Text>
        </View>
        <View className="flex items-center px-3 py-2.5 bg-emerald-700/30 rounded-lg">
          <Text className="text-emerald-100 text-sm">🔍</Text>
          <Input
            className="flex-1 ml-2 text-sm text-white placeholder-emerald-200"
            placeholder="搜索商品..."
            value={searchVal}
            onInput={(e) => setSearchVal(e.detail.value)}
          />
        </View>
      </View>

      <View className="px-4 -mt-3">
        <View className="p-4 bg-white rounded-2xl shadow-sm">
          <View className="flex justify-between">
            <Text className="text-sm text-slate-500">春季健康季</Text>
            <Text className="text-xs text-emerald-600">满199减30</Text>
          </View>
        </View>
      </View>

      <View className="px-4 mt-4">
        <View className="flex justify-between">
          {CATEGORIES.map((cat) => (
            <View key={cat.id} className="flex flex-col items-center">
              <View className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-2">
                <Text className="text-xl">📦</Text>
              </View>
              <Text className="text-xs text-slate-500">{cat.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-4 mt-6 pb-8">
        <View className="flex items-center justify-between mb-3">
          <Text className="text-base font-semibold text-slate-800">热门推荐</Text>
          <Text className="text-xs text-slate-300">›</Text>
        </View>

        <View className="grid grid-cols-2 gap-3">
          {PRODUCTS.map((product) => (
            <View key={product.id} className="p-3 bg-white rounded-2xl shadow-sm">
              <View className="h-20 bg-emerald-50 rounded-xl flex items-center justify-center mb-2">
                <Text className="text-2xl opacity-60">💊</Text>
              </View>
              <Text className="text-sm text-slate-800 leading-tight">{product.name}</Text>
              <Text className="text-xs text-slate-400 mt-0.5 truncate">{product.desc}</Text>
              <View className="flex items-center justify-between mt-2">
                <Text className="text-sm font-semibold text-slate-600">
                  ¥{product.price}
                </Text>
                <Text className="text-emerald-500">+</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}