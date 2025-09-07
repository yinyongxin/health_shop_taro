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
  extends Record<AllPageKey, Record<string, string>> {
  index: {
    tabActive?: string;
  };
}
