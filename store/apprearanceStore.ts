/** @format */

import { darkTheme } from "@/constants/themes/darkTheme";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAppreanceStoreProps {
  currentTheme: CurrentTheme;
  setCurrentTheme: (theme: CurrentTheme) => void;
  locales: "en" | "vi" | "cn" | "jp";
  setLocales: (locales: "en" | "vi" | "cn" | "jp") => void;
}

export interface CurrentTheme {
  name: string;
  theme: typeof darkTheme;
}

export const useAppreanceStore = create<IAppreanceStoreProps>()(
  persist(
    (set) => ({
      currentTheme: {
        name: "dark",
        theme: darkTheme,
      },
      setCurrentTheme: (_theme: CurrentTheme) => set({ currentTheme: _theme }),
      locales: "en",
      setLocales: (_locales: "en" | "vi" | "cn" | "jp") =>
        set({ locales: _locales }),
    }),
    {
      name: "appreance-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
