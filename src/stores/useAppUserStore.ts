import { createAppStore } from "./base";

interface AppUserState {
  tabActive: string;
  updateTabActive: (value: string) => void;
  cartList: string[]
  addCart: (id: string) => void,
  deleteCard: (id: string) => void
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
      set({ cartList: [...new Set([...currentList, id])] });
    },
    deleteCard: (id) => {
      const currentList = get().cartList
      const index = currentList.findIndex((item) => item === id);
      if (index !== -1) {
        currentList.splice(index, 1);
      }
      set({ cartList: currentList })
    },
  }),
  "appUser",
);
