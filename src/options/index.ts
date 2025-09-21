export const IdentityCardOptions = [
  { label: "居民身份证", value: "ResidentIdentityCard" },
] as const;

export type IdentityCardValuesType =
  (typeof IdentityCardOptions)[number]["value"];

export const OrderTabOptions = [
  { label: "待发货", value: "WaitDelivery", icon: "container" },
  { label: "待收货", value: "WaitReceipt", icon: "forklift" },
  { label: "已收货", value: "Received", icon: "hand-coins" },
  { label: "待评价", value: "WaitComment", icon: "messages-square" },
  { label: "退款/售后", value: "AfterSale", icon: "wallet" },
] as const;

export type OrderTabOptionsValuesType =
  (typeof OrderTabOptions)[number]["value"];

export const getOrderTabOptionsLabel = (status: OrderTabOptionsValuesType) => {
  return OrderTabOptions.find((item) => item.value === status)?.label || status;
};

export const OrderStatusIcon = [
  "hand-coins",
  "banknote-arrow-down",
  "forklift",
  "package-check",
  "container",
  "hand-coins",
  "messages-square",
  "wallet",
];
