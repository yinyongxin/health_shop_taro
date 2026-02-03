import { CartListItem } from "@/stores";
import { AddressInfo } from "@/client";
import { type SaleStatusEnum } from "@/enums";
import { pages } from "./pages";

export const AllPages = [
  ...pages.map((page) => {
    return {
      name: page.name,
      path: `/${page.path}` as const,
    };
  }),
];

export type AllPageKey = (typeof AllPages)[number]["name"];

export interface AllPagesQueryType
  extends Record<AllPageKey, Record<string, unknown>> {
  index: {
    tabActive?: string;
  };
  wareDetail: {
    id: string;
  };
  orderDetail: {
    orderNo: string;
  };
  afterSaleDetail: {
    id: string;
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
}
