/** @format */

import { useAppreanceStore } from "@/store/apprearanceStore";
import { lightTheme } from "@/constants/themes/lightTheme";
import { darkTheme } from "@/constants/themes/darkTheme";

export const useTheme = () => {
  const themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  const { currentTheme, setCurrentTheme } = useAppreanceStore();

  const changeTheme = (themeKey: keyof typeof themes) => {
    const theme = themes[themeKey];
    setCurrentTheme({
      name: themeKey,
      theme: theme,
    });
  };

  return {
    currentTheme,
    changeTheme,
  };
};
