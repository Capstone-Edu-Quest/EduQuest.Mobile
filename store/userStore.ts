/** @format */

import { IToken, IUser } from "@/interfaces/userInterfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IUserStoreProps {
  token: IToken | null;
  setToken: (token: IToken | null) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<IUserStoreProps>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: IToken | null) => set({ token }),
      user: null,
      setUser: (user: IUser | null) => set({ user }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
