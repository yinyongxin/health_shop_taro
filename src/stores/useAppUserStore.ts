import { createAppStore } from "./base";

interface AppUserState {
  tabActive: string;
  updateTabActive: (value: string) => void;
  cartList: {
    id: string,
    num: number
  }[]
  addCart: (id: string) => void,
  deleteCard: (id: string) => void
  updateCartNum: (id: string, num: number) => void,
}

export const useAppUserStore = createAppStore<AppUserState>(
  (set, get) => ({
    tabActive: "home",
    updateTabActive: (tabActive) => {
      set({ tabActive });
    },
    cartList: [],
    addCart: (id) => {
      const currentList = get().cartList
      set({ cartList: [...new Set([...currentList, { id, num: 1 }])] });
    },
    deleteCard: (id) => {
      const currentList = get().cartList
      const index = currentList.findIndex((item) => item.id === id);
      if (index !== -1) {
        currentList.splice(index, 1);
      }
      set({ cartList: currentList })
    },
    updateCartNum: (id, num) => {
      const currentList = get().cartList
      const index = currentList.findIndex((item) => item.id === id);
      if (index !== -1) {
        currentList[index].num = num;
      }
      set({ cartList: currentList })
    },
  }),
  "appUser",
);
