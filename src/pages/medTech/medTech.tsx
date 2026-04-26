import { View, Text, Input } from "@tarojs/components";
import { useState } from "react";

const CATEGORIES = [
  { id: 1, name: "检测设备" },
  { id: 2, name: "康复器械" },
  { id: 3, name: "手术耗材" },
  { id: 4, name: "智能健康" },
];

const PRODUCTS = [
  { id: 1, name: "电子血压计", desc: "智能语音 精准测量", price: 199, tag: "新品" },
  { id: 2, name: "血糖仪", desc: "无痛采血 快速出值", price: 258, tag: "热销" },
  { id: 3, name: "血氧仪", desc: "指夹式 医用标准", price: 168, tag: "" },
  { id: 4, name: "心电图机", desc: "12导联 专业级", price: 2999, tag: "高端" },
];

export default function MedTechPage() {
  const [searchVal, setSearchVal] = useState("");

  return (
    <View className="min-h-screen" style={{ background: "linear-gradient(180deg, #EFF6FF 0%, #DBEAFE 100%)" }}>
      <View className="px-5 pt-12 pb-6" style={{ background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)" }}>
        <View className="flex items-center justify-between mb-4">
          <View>
            <Text className="text-lg font-bold text-white">MEDTECH</Text>
            <Text className="text-xs text-blue-100 mt-0.5">医疗科技</Text>
          </View>
          <View className="flex items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-blue-200"></View>
            <Text className="text-xs text-blue-100">在线</Text>
          </View>
        </View>

        <View className="flex items-center px-3 py-2.5 bg-white/20 rounded-lg">
          <Text className="text-blue-100 text-sm">🔍</Text>
          <Input
            className="flex-1 ml-2 text-sm text-white placeholder-blue-200"
            placeholder="搜索设备..."
            value={searchVal}
            onInput={(e) => setSearchVal(e.detail.value)}
          />
        </View>
      </View>

      <View className="px-4 -mt-3">
        <View className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
          <View className="flex justify-between">
            <View>
              <Text className="text-lg font-mono text-blue-600">2,847</Text>
              <Text className="text-xs text-slate-400">在线设备</Text>
            </View>
            <View className="text-right">
              <Text className="text-lg font-mono text-blue-600">99.2%</Text>
              <Text className="text-xs text-slate-400">服务可用</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="px-4 mt-4">
        <View className="flex justify-between">
          {CATEGORIES.map((cat) => (
            <View key={cat.id} className="flex flex-col items-center">
              <View className="w-12 h-12 rounded-xl flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)" }}>
                <Text className="text-lg">📦</Text>
              </View>
              <Text className="text-xs text-slate-500">{cat.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-4 mt-6 pb-8">
        <View className="flex items-center mb-3">
          <View className="w-1 h-4 bg-blue-500 mr-2 rounded-full"></View>
          <Text className="text-base font-semibold text-slate-800">设备列表</Text>
        </View>

        <View className="space-y-3">
          {PRODUCTS.map((product) => (
            <View key={product.id} className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
              <View className="flex items-start justify-between">
                <View className="flex-1">
                  <View className="flex items-center gap-2">
                    <Text className="text-sm text-slate-800">{product.name}</Text>
                    {product.tag && (
                      <Text className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                        {product.tag}
                      </Text>
                    )}
                  </View>
                  <Text className="text-xs text-slate-400 mt-0.5">{product.desc}</Text>
                </View>
                <Text className="text-slate-300">›</Text>
              </View>
              <View className="flex items-center justify-between mt-3">
                <Text className="text-sm font-semibold text-slate-600">¥{product.price}</Text>
                <View className="text-xs px-3 py-1.5 bg-blue-500 text-white rounded-lg">
                  详情
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}