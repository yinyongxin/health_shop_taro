# 文档说明

## 环境

Nodejs 21+
pnpm 10+

[线上](https://chr.eh-med.com/hmall/#)
[本地启动](http://localhost:10086/index#/pages/index/index)

## CI/CD

<http://47.106.105.252:9991/jenkins/job/aiPlatform/job/health_shop/>

## TPPD

[eh医疗商城智能预约平台TAPD](https://www.tapd.cn/tapd_fe/63673026/story/list?categoryId=1163673026001000206&useScene=storyList&groupType=&conf_id=1163673026001004237)

## H5管理端

### URL 参数说明

| 参数               | 说明                                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `isPublicPlatform` | 是否从微信公众号平台进入。`true` 表示从公众号进入，会清空 orgId 使用默认机构；`false` 表示从管理后台进入，会使用传入的 orgId |
| `orgId`            | 机构ID，用于多租户数据隔离。不同 orgId 对应不同医疗机构/商户的数据。默认值 `800001004`                                       |
| `openVConsole`     | 打开 VConsole 调试面板（仅测试/正式环境有效）                                                                                |

### 本地环境

<http://localhost:10086/?isPublicPlatform=true&orgId=800001004#/pages/index/index>

### 测试环境

<https://testpay.eh-med.com/zhfy>
jysy 123456

<https://testpay.eh-med.com/hmall/?openVConsole=true>

### 正式环境

<https://chr.eh-med.com/zhfy/index>
jysy 123456

<https://chr.eh-med.com/hmall/?openVConsole=true>

## 微信公众平台

[微信公众平台](https://mp.weixin.qq.com/wxamp/home/guide?token=531739113&lang=zh_CN)
[微信支付](https://pay.weixin.qq.com/doc/v3/merchant/4012791857)

## 架构

[Tarojs](https://docs.taro.zone/docs/)

## UI 组件

[Taroify](https://taroify.github.io/taroify.com/introduce/)

## CSS

[weapp-tw](https://weapp-tw.icebreaker.top/docs/quick-start/v4/taro-vite)
[TailwindCSS](https://tailwindcss.com/)

## 状态管理

[Zustand](https://github.com/pmndrs/zustand)
[Zustand 中文](https://awesomedevin.github.io/zustand-vue/docs/introduce/start/zustand)

### 持久化

[Persist](https://zustand.docs.pmnd.rs/middlewares/persist)
[掘金教程](https://juejin.cn/post/7406247350668804105)

## 医疗健康 图片

[Medical Images](https://www.svgrepo.com/collection/medical-and-health/)
