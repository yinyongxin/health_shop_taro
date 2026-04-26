import { View, Text, Input } from "@tarojs/components";
import { useState } from "react";

const CATEGORIES = [
  { id: 1, name: "营养补充" },
  { id: 2, name: "滋补养生" },
  { id: 3, name: "健康茶饮" },
  { id: 4, name: "家庭护理" },
];

const PRODUCTS = [
  { id: 1, name: "蜂蜜燕窝", desc: "滋阴润燥", price: 299 },
  { id: 2, name: "红枣枸杞", desc: "补气养血", price: 88 },
  { id: 3, name: "菊花茶", desc: "清肝明目", price: 35 },
  { id: 4, name: "阿胶糕", desc: "补血滋阴", price: 168 },
];

export default function WarmCarePage() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <View className="min-h-screen" style={{ background: "linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)" }}>
      <View className="px-5 pt-12 pb-6" style={{ background: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)" }}>
        <View className="flex items-center justify-between mb-4">
          <Text className="text-xl font-bold text-white">健康商城</Text>
          <Text className="text-sky-100 text-sm">Warm Care</Text>
        </View>
        <View className="flex items-center px-3 py-2.5 bg-white/20 rounded-lg">
          <Text className="text-sky-100 text-sm">🔍</Text>
          <Input
            className="flex-1 ml-2 text-sm text-white placeholder-sky-200"
            placeholder="搜索你需要的..."
            value={searchVal}
            onInput={(e) => setSearchVal(e.detail.value)}
          />
        </View>
      </View>

      <View className="px-4 -mt-3">
        <View className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
          <Text className="text-sm text-slate-500">妈妈的味道</Text>
          <Text className="text-xs text-sky-600 mt-0.5">传统滋补</Text>
        </View>
      </View>

      <View className="px-4 mt-4">
        <View className="flex justify-between">
          {CATEGORIES.map((cat) => (
            <View key={cat.id} className="flex flex-col items-center">
              <View className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)" }}>
                <Text className="text-xl">📦</Text>
              </View>
              <Text className="text-xs text-slate-500">{cat.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-4 mt-6 pb-8">
        <View className="flex items-center justify-between mb-3">
          <Text className="text-base font-semibold text-slate-800">为你精选</Text>
        </View>

        <View className="space-y-3">
          {PRODUCTS.map((product) => (
            <View key={product.id} className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
              <View className="w-16 h-16 rounded-xl flex items-center justify-center mr-3" style={{ background: "linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 100%)" }}>
                <Text className="text-xl opacity-60">📦</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm text-slate-800">{product.name}</Text>
                <Text className="text-xs text-slate-400 mt-0.5">{product.desc}</Text>
                <View className="flex items-center justify-between mt-1">
                  <Text className="text-sm font-semibold text-slate-600">¥{product.price}</Text>
                  <Text className="text-sky-500">+</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}