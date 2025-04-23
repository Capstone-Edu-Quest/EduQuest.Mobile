/** @format */

import { materialType } from "@/interfaces/courseInterfaces";

export const getMaterialName = (materialType: materialType) => {
  switch (materialType) {
    case "Video":
      return "play";
    case "Assignment":
      return "pencil";
    case "Quiz":
      return "rocket";
    case "Document":
    default:
      return "file";
  }
};
