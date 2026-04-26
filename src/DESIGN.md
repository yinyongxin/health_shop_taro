# 医汇联信健康商城 - 设计规范

## 项目概述

本项目是基于 Taro 4.x + React 18 的微信小程序/H5 电商项目，采用 **科技医疗风格**，以天蓝色调为主，清新专业。

---

## 设计原则

### 1. 一致性
- 相同功能使用相同组件
- 保持视觉语言统一

### 2. 可预测性
- 用户能预期组件行为
- 交互反馈及时明确

### 3. 高效性
- 减少用户操作步骤
- 信息层级清晰

### 4. 容错性
- 预防错误、提供恢复机制
- 空状态和错误状态友好

---

## 色彩系统

### 品牌色 (Sky)

| 名称 | 十六进制 | 用途 |
|------|---------|------|
| sky-50 | #F0F9FF | 页面主背景 |
| sky-100 | #E0F2FE | 卡片背景 |
| sky-200 | #BAE6FD | 图标背景 |
| sky-300 | #7DD3FC | 浅色点缀 |
| sky-400 | #38BDF8 | 渐变终止 |
| sky-500 | #0EA5E9 | 强调色 |
| sky-600 | #0284C7 | 导航栏/按钮 |
| sky-700 | #0369A1 | 深色文字 |
| sky-800 | #075985 | 标题文字 |
| sky-900 | #0C4A6E | 主文字 |

### 功能色

| 名称 | 十六进制 | 用途 |
|------|---------|------|
| success | lime-500 #84CC16 | 成功状态 |
| warning | amber-500 #F59E0B | 警告状态 |
| error | rose-500 #F43F5E | 错误状态 |
| info | sky-500 #0EA5E9 | 信息提示 |

### 中性色

| 名称 | 十六进制 | 用途 |
|------|---------|------|
| slate-50 | #F8FAFC | 页面背景 |
| slate-100 | #F1F5F9 | 卡片背景 |
| slate-200 | #E2E8F0 | 边框分割 |
| slate-300 | #CBD5E1 | 禁用状态 |
| slate-400 | #94A3B8 | 副标题 |
| slate-500 | #64748B | 描述文字 |
| slate-600 | #475569 | 次要文字 |
| slate-700 | #334155 | 正文 |
| slate-800 | #1E293B | 标题 |
| slate-900 | #0F172A | 主标题 |

---

## 字体系统

### 字号层级

| 名称 | Tailwind | 像素 | 用途 |
|------|---------|------|------|
| text-xs | text-2xl | 12px | 辅助文字 |
| text-sm | text-3xl | 14px | 次要信息 |
| text-base | text-4xl | 16px | 正文 |
| text-lg | text-5xl | 18px | 副标题 |
| text-xl | text-6xl | 20px | 标题 |
| text-2xl | text-7xl | 24px | 页面标题 |
| text-3xl | text-8xl | 30px | 大标题 |
| text-4xl | text-9xl | 36px | Hero 标题 |

### 行高

| 名称 | 值 |
|------|-----|
| leading-tight | 1.25 |
| leading-normal | 1.5 |
| leading-relaxed | 1.75 |

### 字体粗细

| 名称 | 值 | 用途 |
|------|-----|------|
| font-light | 300 | 次要信息 |
| font-normal | 400 | 正文 |
| font-medium | 500 | 强调 |
| font-semibold | 600 | 标题 |
| font-bold | 700 | 重要标题 |

---

## 间距系统 (8px 网格)

| 名称 | Tailwind | 像素 |
|------|---------|------|
| space-1 | gap-1 | 4px |
| space-2 | gap-2 | 8px |
| space-3 | gap-3 | 12px |
| space-4 | gap-4 | 16px |
| space-5 | gap-5 | 20px |
| space-6 | gap-6 | 24px |
| space-8 | gap-8 | 32px |
| space-10 | gap-10 | 40px |
| space-12 | gap-12 | 48px |
| space-16 | gap-16 | 64px |

### 内边距

| 名称 | Tailwind | 像素 |
|------|---------|------|
| p-2 | p-2 | 8px |
| p-3 | p-3 | 12px |
| p-4 | p-4 | 16px |
| p-5 | p-5 | 20px |
| p-6 | p-6 | 24px |
| p-8 | p-8 | 32px |

---

## 圆角系统

| 名称 | 像素 | 用途 |
|------|------|------|
| rounded | 4px | 按钮 |
| rounded-lg | 8px | 输入框 |
| rounded-xl | 12px | 标签 |
| rounded-2xl | 16px | 卡片 |
| rounded-3xl | 24px | 大卡片 |
| rounded-full | 9999px | 圆形 |

---

## 阴影系统

已定义自定义工具类：

```css
.app-shadow-sm { box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04); }
.app-shadow { box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.06); }
.app-shadow-lg { box-shadow: 2px 2px 24px 0px rgba(0, 0, 0, 0.08); }
```

| 名称 | 用途 |
|------|------|
| app-shadow-sm | 轻微阴影 |
| app-shadow | 默认卡片阴影 |
| app-shadow-lg | 浮动元素阴影 |

---

## 背景系统

### 毛玻璃效果

```css
.bg-blur-sm { @apply bg-white/60 backdrop-blur-md; }
.bg-blur { @apply bg-white/70 backdrop-blur-md; }
.bg-blur-lg { @apply bg-white/80 backdrop-blur-md; }
```

### 渐变背景

```css
/* 页面主背景 */
background: linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)

/* 导航栏 */
background: linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)

/* 图标/分类背景 */
background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)

/* 品牌按钮 */
background: linear-gradient(45deg, #38BDF8 0%, #0284C7 100%)
```

---

## 组件规范

### 按钮

```tsx
// 主按钮
<View className="px-4 py-2 bg-sky-500 text-white rounded-lg">
  主按钮
</View>

// 次按钮
<View className="px-4 py-2 bg-white text-sky-500 border border-sky-500 rounded-lg">
  次按钮
</View>

// 文字按钮
<View className="text-sky-500">文字按钮</View>
```

### 卡片

```tsx
<View className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
  卡片内容
</View>
```

### 输入框

```tsx
<View className="px-4 py-3 bg-white rounded-xl border border-slate-200">
  输入内容
</View>
```

### 列表项

```tsx
<View className="flex items-center justify-between p-4 bg-white/80 rounded-xl">
  <Text className="text-slate-800">标题</Text>
  <Text className="text-slate-400">内容</Text>
</View>
```

### 图标

```tsx
<View className="w-12 h-12 rounded-xl flex items-center justify-center"
  style={{ background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)" }}>
  <Icon name="arrow-right" className="text-sky-500" />
</View>
```

---

## 页面结构

### 通用布局

```tsx
<View className="min-h-screen" style={{ background: "linear-gradient(180deg, #F0F9FF 0%, #E0F2FE 100%)" }}>
  {/* 导航栏 */}
  <View className="px-5 pt-12 pb-6" style={{ background: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)" }}>
    <Text className="text-xl font-bold text-white">标题</Text>
  </View>

  {/* 内容卡片（重叠效果） */}
  <View className="px-4 -mt-3">
    <View className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
      内容
    </View>
  </View>

  {/* 列表内容 */}
  <View className="px-4 mt-4 pb-8">
    <View className="space-y-3">
      <View className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
        列表项
      </View>
    </View>
  </View>
</View>
```

---

## 交互规范

### 点击效果

```css
.click-effect { @apply active:bg-gray-100; }
```

### 过渡动画

- 默认时长: 200ms
- 缓动: ease-in-out

### 手势

- 触点大小: 至少 44x44px
- 按钮点击区域: 全宽度

---

## 无障碍规范

- 文字对比度: 至少 4.5:1
- 按钮可点击区域: 至少 44x44px
- 图片需要 alt 文字
- 表单需要标签

---

## 响应式断点

| 名称 | 断点 | 用途 |
|------|------|------|
| 小程序 | < 375px | 微信小程序 |
| mobile | 375px+ | H5 移动端 |
| tablet | 768px+ | H5 平板 |
| desktop | 1024px+ | H5 桌面 |

---

## 相关资源

- 颜色查看: [Tailwind Sky](https://tailwindcss.com/docs/customizing-colors#sky)
- 组件库: Taroify
- 状态管理: Zustand
- API 客户端: @hey-api/openapi-ts