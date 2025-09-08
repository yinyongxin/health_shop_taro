import { WareInfo } from "@/client";
import { WareTypeEnum } from "@/common";

export const wareListMock: WareInfo[] = [
  {
    name: "HPV检测试纸",
    price: 139,
    mainPicture:
      "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00644-1586.jpg",
    pictureList: [
      "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00644-1586.jpg",
    ],
    sales: 1000,
    deac: "轻松检查、快速出结果",
    inventory: 10,
    id: "1",
    liked: false,
    wareType: WareTypeEnum.GOODS,
  },
  {
    name: "中医理疗",
    price: 139,
    mainPicture:
      "https://img2.baidu.com/it/u=2729274676,2695769317&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
    pictureList: [
      "https://img2.baidu.com/it/u=2729274676,2695769317&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
      "https://img1.baidu.com/it/u=1838932669,4245002262&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
    ],
    sales: 356,
    deac: "颈椎、腰椎、肩颈腰背按摩推拿",
    inventory: 10,
    id: "2",
    liked: true,
    wareType: WareTypeEnum.SERVICE,
  },
  {
    name: "视力训练",
    price: 139,
    mainPicture:
      "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00449-1888.jpg",
    pictureList: [
      "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00449-1888.jpg",
      "https://img2.baidu.com/it/u=3620133835,3882556216&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
    ],
    sales: 478,
    deac: "含挂号费、医生细致面诊、视力知识科普",
    inventory: 10,
    id: "3",
    liked: false,
    wareType: WareTypeEnum.SERVICE,
  },
  {
    name: "艾草药包",
    price: 19.9,
    mainPicture:
      "https://img0.baidu.com/it/u=618397958,2236102820&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
    pictureList: [
      "https://img0.baidu.com/it/u=618397958,2236102820&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
      "https://img0.baidu.com/it/u=459634292,4287832994&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=658",
    ],
    sales: 478,
    deac: "袋子转、月子家用泡脚药包",
    inventory: 10,
    id: "4",
    liked: true,
    wareType: WareTypeEnum.GOODS,
  },
  {
    name: "儿童护理",
    price: 139,
    mainPicture:
      "https://img2.baidu.com/it/u=3250785501,1396846840&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
    pictureList: [
      "https://img2.baidu.com/it/u=3250785501,1396846840&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
      "https://img1.baidu.com/it/u=867843856,2300626002&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=668",
    ],
    sales: 478,
    deac: "含挂号费、医生细致面诊、育儿知识科普",
    inventory: 10,
    id: "5",
    liked: false,
    wareType: WareTypeEnum.SERVICE,
  },
];
