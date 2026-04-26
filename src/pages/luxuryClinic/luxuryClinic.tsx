import { View, Text, Input } from "@tarojs/components";
import { useState } from "react";

const CATEGORIES = [
  { id: 1, name: "高奢滋补" },
  { id: 2, name: "美容抗衰" },
  { id: 3, name: "名医问诊" },
  { id: 4, name: "私人定制" },
];

const PRODUCTS = [
  { id: 1, name: "野生人参", desc: "长白山 30年参龄", price: 12800 },
  { id: 2, name: "燕盏礼盒", desc: "马来西亚进口", price: 3680 },
  { id: 3, name: "冬虫夏草", desc: "那曲产地", price: 28800 },
  { id: 4, name: "灵芝孢子粉", desc: "破壁技术", price: 1680 },
];

export default function LuxuryClinicPage() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <View className="min-h-screen bg-stone-50">
      <View className="px-5 pt-12 pb-6 bg-stone-600">
        <View className="flex justify-between items-end mb-5">
          <Text className="text-xl font-bold text-white" style={{ letterSpacing: "0.2em" }}>CLINIC</Text>
          <Text className="text-xs text-stone-200">Luxury Healthcare</Text>
        </View>
        <View className="flex items-center px-3 py-2.5 bg-stone-700/30 rounded-lg">
          <Text className="text-stone-200 text-sm">🔍</Text>
          <Input
            className="flex-1 ml-2 text-sm text-white placeholder-stone-300"
            placeholder="搜索珍品..."
            value={searchVal}
            onInput={(e) => setSearchVal(e.detail.value)}
          />
        </View>
      </View>

      <View className="px-4 -mt-3">
        <View className="p-4 bg-white rounded-2xl shadow-sm">
          <Text className="text-base font-medium text-slate-800">尊享健康</Text>
          <Text className="text-xs text-stone-500 mt-0.5">为您甄选全球顶级滋补</Text>
        </View>
      </View>

      <View className="px-4 mt-4">
        <View className="flex justify-between">
          {CATEGORIES.map((cat) => (
            <View key={cat.id} className="flex flex-col items-center">
              <View className="w-14 h-14 rounded-2xl bg-stone-200 flex items-center justify-center mb-2">
                <Text className="text-xl">📦</Text>
              </View>
              <Text className="text-xs text-slate-500">{cat.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-4 mt-6 pb-8">
        <View className="flex items-center justify-between mb-3">
          <Text className="text-base font-semibold text-slate-800">稀世珍品</Text>
          <Text className="text-xs text-slate-300">›</Text>
        </View>

        <View className="grid grid-cols-2 gap-3">
          {PRODUCTS.map((product) => (
            <View key={product.id} className="p-3 bg-white rounded-2xl shadow-sm">
              <View className="h-20 bg-stone-100 rounded-xl flex items-center justify-center mb-2">
                <Text className="text-2xl opacity-60">📦</Text>
              </View>
              <Text className="text-sm text-slate-800 leading-tight">{product.name}</Text>
              <Text className="text-xs text-stone-400 mt-0.5 truncate">{product.desc}</Text>
              <View className="flex items-center justify-between mt-2">
                <Text className="text-sm font-semibold text-stone-600">
                  ¥{product.price.toLocaleString()}
                </Text>
                <Text className="text-stone-400">→</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}