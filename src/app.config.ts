import { pages } from "./router/pages";

export default defineAppConfig({
  pages: pages.map((page) => page.path),
  subpackages: [],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "患者管理",
    navigationBarTextStyle: "black",
  },
});
