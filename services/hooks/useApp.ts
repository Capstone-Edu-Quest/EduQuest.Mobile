/** @format */

import { useAppreanceStore } from "@/store/apprearanceStore";

export const useApp = () => {
  const { currentTheme, setCurrentTheme, locales, setLocales } =
    useAppreanceStore();

  const initApp = () => {
    // const theme = currentTheme.theme;
    // const locales = locales;
  };

  return { initApp };
};
