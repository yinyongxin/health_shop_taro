import { LucideIcon } from "@/components";

export * from "./regExps";
export * from "./appConfig";

export const DEFAULT_AVATAR =
  "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132";

export const SexChinese = {
  male: "男",
  female: "女",
};

/**
 * 商品类型枚举
 */
export enum WareTypeEnum {
  GOODS = "GOODS",
  SERVICE = "SERVICE",
}

export const AppTabs = [
  {
    label: "首页",
    value: "home",
    icon: () => {
      // return <LucideIcon name="house"></LucideIcon>;
      return <LucideIcon name="house"></LucideIcon>;
    },
    show: true,
  },
  {
    label: "分类",
    value: "classify",
    icon: () => {
      return <LucideIcon name="layout-grid"></LucideIcon>;
    },
    show: true,
  },
  {
    label: "我的",
    value: "my",
    icon: () => {
      return <LucideIcon name="user"></LucideIcon>;
    },
    show: true,
  },
] as const;
