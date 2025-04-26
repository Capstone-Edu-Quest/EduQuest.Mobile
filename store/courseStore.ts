/** @format */

import { ICourse } from "@/interfaces/courseInterfaces";
import { create } from "zustand";

export interface ICourseStoreProps {
  viewingCourse: ICourse | null;
  setViewingCourse: (viewingCourse: ICourse | null) => void;
}

export const useCourseStore = create<ICourseStoreProps>()((set) => ({
  viewingCourse: null,
  setViewingCourse: (viewingCourse: ICourse | null) => set({ viewingCourse }),
}));
