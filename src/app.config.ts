import { PAGES } from "./router/base";

export default defineAppConfig({
  pages: PAGES.map((page) => page.url),
  subpackages: [],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "医疗商城",
    navigationBarTextStyle: "black",
  },
});
