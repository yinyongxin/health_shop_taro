import { CartListItem } from "@/stores";
import { AddressInfo } from "@/client";
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
    id: string;
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
}
