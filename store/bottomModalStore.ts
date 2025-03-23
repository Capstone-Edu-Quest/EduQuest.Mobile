/** @format */

import { create } from "zustand";

export interface IBottomModalStoreProps {
  modalContent: React.ReactNode | null;
  setModalContent: (modalContent: React.ReactNode | null) => void;
}

export const useBottomModalStore = create<IBottomModalStoreProps>()((set) => ({
  modalContent: null,
  setModalContent: (modalContent: React.ReactNode | null) =>
    set({ modalContent }),
}));
