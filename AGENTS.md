# AGENTS.md - 医汇联信健康商城项目开发指南

## 项目概述

本项目是基于 Taro 4.x + React 18 + TypeScript 的微信小程序/H5 电商项目，使用 Tailwind CSS v4 进行样式管理，Zustand 进行状态管理，@hey-api/openapi-ts 自动生成 API 客户端。

## 构建与运行命令

### 开发环境

```bash
# H5 开发（推荐）
npm run dev:h5

# 微信小程序开发
npm run dev:weapp

# 其他平台开发
npm run dev:swan     # 百度小程序
npm run dev:alipay   # 支付宝小程序
npm run dev:tt       # 字节跳动小程序
npm run dev:rn       # React Native
```

### 生产构建

```bash
# 构建 H5
npm run build:h5

# 构建微信小程序
npm run build:weapp
```

### 代码质量工具

```bash
# ESLint 检查
npx eslint src --ext .ts,.tsx

# Prettier 格式化
npx prettier --write "src/**/*.{ts,tsx}"

# TypeScript 类型检查
npx tsc --noEmit
```

### 代码生成

```bash
# 根据 OpenAPI 生成 API 客户端
npm run openapi-ts
```

## 代码风格规范

### 1. TypeScript 规范

- **严格模式**: 启用 `strictNullChecks`，注意空值处理
- **类型推断**: 优先使用类型推断，避免冗余类型标注
- **接口 vs 类型**: 使用 `interface` 定义对象结构，使用 `type` 定义联合类型、别名
- **枚举**: 使用 `const enum` 或数字枚举定义常量

```typescript
// ✅ 推荐：使用类型推断
const name = "张三";
const count = 10;

// ✅ 推荐：接口定义对象
interface UserInfo {
  id: string;
  name: string;
  age?: number;
}

// ✅ 推荐：type 定义联合类型
type Status = "pending" | "success" | "error";

// ✅ 推荐：使用 as 断言
const value = data as string;
```

### 2. 导入规范

- **路径别名**: 使用 `@/` 指向 `src/` 目录
- **排序**: 先导入外部库，再导入内部模块
- **导入方式**: 使用 ES Module 语法

```typescript
// 正确顺序
import { useState, useEffect } from "react"; // React 内置
import { View, Text } from "@tarojs/components"; // Taro 组件
import classNames from "classnames"; // 第三方库
import { useAppUserStore } from "@/stores"; // 项目 store
import { AppButton } from "@/components"; // 项目组件
import { getUserInfo } from "@/client"; // API 客户端
import { formatPrice } from "@/utils"; // 工具函数
import MyIcon from "./MyIcon"; // 同级组件
```

### 3. 组件规范

#### 函数组件

- 使用箭头函数或 `function` 关键字定义
- 组件文件使用 `index.tsx` 作为入口
- 使用 `PropsWithChildren` 定义 props 类型
- 合理使用 `memo`、`useCallback` 优化性能

```typescript
import { View } from "@tarojs/components";
import { PropsWithChildren } from "react";

export type AppButtonProps = PropsWithChildren<{
  status?: "primary" | "secondary";
  onClick?: () => void;
}>;

export const AppButton = (props: AppButtonProps) => {
  const { status = "primary", children, onClick } = props;
  return <View onClick={onClick}>{children}</View>;
};
```

#### 组件目录结构

```
components/
├── AppButton/
│   ├── index.tsx      # 组件实现
│   └── index.scss     # 样式（如需要）
├── AddressList/
│   ├── index.tsx      # 主组件
│   ├── AddressCard.tsx  # 子组件
│   └── ...
```

### 4. 状态管理 (Zustand)

- 使用 `createAppStore` 工厂函数创建 store
- 命名规范：`useXxxStore`
- 异步方法使用 `async/await`

```typescript
import { createAppStore } from "./base";

interface AppUserState {
  name: string;
  updateName: (name: string) => void;
  fetchUserInfo: () => Promise<void>;
}

export const useAppUserStore = createAppStore<AppUserState>(
  (set, get) => ({
    name: "",
    updateName: (name) => set({ name }),
    fetchUserInfo: async () => {
      const res = await getUserInfo();
      if (res.data?.code === 0) {
        set({ name: res.data.data.name });
      }
    },
  }),
  "appUser", // store 名称，用于持久化
);
```

### 5. API 调用规范

- 使用 `@hey-api/openapi-ts` 生成的客户端
- 错误处理：检查 `res.data?.code !== 0`
- loading 状态使用 `appLoading.show()/hide()`

```typescript
import { getUserInfo } from "@/client";

const fetchData = async () => {
  appLoading.show("加载中...");
  try {
    const res = await getUserInfo({ query: { id: "1" } });
    if (res.data?.code === 0) {
      return res.data.data;
    }
    appToast.error(res.data?.msg || "请求失败");
  } finally {
    appLoading.hide();
  }
};
```

### 6. 样式规范 (Tailwind CSS v4)

- 使用 Tailwind CSS 原子化类名
- 自定义颜色使用 `bg-[color]` 语法
- 响应式使用平台特定前缀（如 `hd:` 用于抖音小程序）

```tsx
<View className="flex items-center justify-between px-[32px] py-[24px]">
  <Text className="text-[28px] text-gray-600">内容</Text>
</View>
```

### 7. 命名规范

| 类型      | 规范             | 示例                                |
| --------- | ---------------- | ----------------------------------- |
| 文件名    | kebab-case       | `order-detail.tsx`, `ware-list.tsx` |
| 组件名    | PascalCase       | `OrderDetail`, `WareList`           |
| 函数名    | camelCase        | `getUserInfo`, `formatPrice`        |
| 常量      | UPPER_SNAKE_CASE | `MAX_COUNT`, `API_PREFIX`           |
| 接口/类型 | PascalCase       | `UserInfo`, `OrderStatus`           |
| 目录名    | kebab-case       | `order-detail/`, `ware-list/`       |

### 8. 错误处理

- 使用 try-catch 包装异步代码
- 统一使用 `appToast` 显示提示信息
- 关键位置添加必要的空值判断

```typescript
// ✅ 推荐：全面的错误处理
try {
  const res = await getUserInfo({ query: { id } });
  if (res.data?.code === 0) {
    appToast.success("获取成功");
    return res.data.data;
  }
  appToast.error(res.data?.msg || "获取失败");
} catch (error) {
  console.error("获取用户信息失败:", error);
  appToast.error("网络错误");
}

// ✅ 推荐：空值保护
const name = user?.name ?? "未知";
const list = data?.list || [];
```

### 9. 页面开发规范

每个页面包含以下文件：

```
pages/
├── orderDetail/
│   ├── index.tsx        # 页面主组件
│   ├── orderDetail.config.ts  # 页面配置
│   ├── Skeleton.tsx     # 骨架屏（如需要）
│   ├── common.ts        # 页面专用工具函数
│   └── components/      # 页面级组件
```

页面配置文件示例：

```typescript
export default definePageConfig({
  navigationBarTitleText: "订单详情",
  enablePullDownRefresh: false,
});
```

### 10. Git 提交规范

```bash
# 功能开发
git add . && git commit -m "feat: 新增商品列表筛选功能"

# Bug 修复
git add . && git commit -m "fix: 修复订单状态显示错误"

# 样式调整
git add . && git commit -m "style: 优化按钮点击效果"

# 代码重构
git add . && git commit -m "refactor: 重构商品详情页组件"

# 类型修复
git add . && git commit -m "types: 完善用户信息类型定义"
```

## 目录结构

```
src/
├── client/           # 自动生成的 API 客户端
├── common/           # 公共配置、常量、组件
├── components/       # 公共组件
├── enums/            # 枚举定义
├── hooks/            # 自定义 Hooks
├── pages/            # 页面组件
├── router/           # 路由配置
├── stores/           # Zustand 状态管理
└── utils/            # 工具函数
```

## 注意事项

1. **Taro 特定**: 小程序中使用 `View`/`Text` 替代 `div`/`span`，事件使用 `onClick` 而非 `onclick`
2. **环境变量**: 通过 `process.env.TARO_ENV` 判断当前平台
3. **条件渲染**: 小程序中优先使用 `display` 而非 `v-if`，或使用 Taro 的条件渲染
4. **图片路径**: 使用 `getImagePath` 工具函数处理图片 URL
