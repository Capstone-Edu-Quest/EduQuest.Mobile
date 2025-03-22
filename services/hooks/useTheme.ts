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

  const toggleTheme = () => {
    const newTheme = currentTheme.name === 'dark' ? 'light' : 'dark';
    changeTheme(newTheme);
  };

  return {
    currentTheme,
    changeTheme,
    toggleTheme,
  };
};
