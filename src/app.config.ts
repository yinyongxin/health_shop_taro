import { pages } from "./router/pages";

export default defineAppConfig({
  pages: pages.map((page) => page.path),
  subpackages: [],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "医疗商城",
    navigationBarTextStyle: "black",
  },
});
