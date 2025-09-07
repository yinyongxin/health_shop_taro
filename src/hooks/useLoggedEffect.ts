import { useAppAuthStore } from "@/stores";
import { DependencyList, EffectCallback, useEffect } from "react";

export const useLoggedEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
) => {
  const isLoggedIn = useAppAuthStore((state) => state.isLogged);
  useEffect(() => {
    if (isLoggedIn) {
      return effect();
    }
  }, [isLoggedIn, ...(deps || [])]);
};
