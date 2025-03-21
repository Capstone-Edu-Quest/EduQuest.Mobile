/** @format */

import { useAppreanceStore } from "@/store/apprearanceStore";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";
import cn from "@/locales/cn.json";
import jp from "@/locales/jp.json";

export const useLocales = () => {
  const { locales, setLocales } = useAppreanceStore();

  const availableLocales = {
    en: en,
    vi: vi,
    cn: cn,
    jp: jp,
  };
  const changeLocales = (localesKey: typeof locales) => {
    setLocales(localesKey);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result = availableLocales[locales];
    for (const k of keys) {
      result = result[k as keyof typeof result];
    }
    console.log(result);
    return "hello world";
  };

  return {
    locales,
    changeLocales,
    t,
  };
};
