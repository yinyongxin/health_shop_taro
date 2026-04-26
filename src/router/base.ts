import { AddressInfo } from "@/client";
import { type SaleStatusEnum } from "@/enums";
import { CartListItem } from "@/types";

export const PAGE_NAMES = [
  "index",
  "wareList",
  "wareDetail",
  "orderList",
  "addressManage",
  "addAddress",
  "editAddress",
  "orderDetail",
  "orderPay",
  "settlement",
  "payResult",
  "subCategoryProductList",
  "myService",
  "serviceUse",
  "afterSalesService",
  "afterSaleDetail",
  "hospitalList",
  "serverQrcode",
] as const;

export type PageName = (typeof PAGE_NAMES)[number];

export const PAGES = PAGE_NAMES.map((page) => {
  return {
    page,
    url: `/pages/${page}/${page}`,
  };
});

export interface AllPagesQueryType
  extends Record<PageName, Record<string, unknown>> {
  index: {
    tabActive?: string;
  };
  wareDetail: {
    id: string;
  };
  wareList: {
    orgId?: string;
  };
  orderDetail: {
    orderNo: string;
  };
  afterSaleDetail: {
    id: string;
    showBtn?: boolean;
  };
  serviceUse: {
    orderNo: string;
  };
  orderPay: {
    orderNo: string;
  };
  settlement: {
    list: CartListItem[];
  };
  subCategoryProductList: {
    subCategoryId: string;
  };
  editAddress: {
    detail?: AddressInfo;
  };
  orderList: {
    status?: string;
  };
  afterSalesService: {
    status?: SaleStatusEnum;
  };
  serverQrcode: {
    orderNo: string;
    serverIds: string;
  };
}
