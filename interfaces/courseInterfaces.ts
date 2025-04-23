/** @format */

import { InstructorCourseStatus, MissionStatus } from "@/Enum/courseEnum";

export interface ICourseOverview {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  status: InstructorCourseStatus;
  photoUrl: string;
  author: string;
  createdBy: string;
  price: number;
  discountPrice: number | null;
  rating: number;
  totalLesson: number;
  totalTime: number;
  totalReview: number;
  progressPercentage: number | null;
}

export interface ICourse {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  requirementList: string[];
  feature: string;
  lastUpdated: string | null;
  price: number;
  discountPrice: number | null;
  author: {
    id: string;
    username: string;
    headline: string;
    description: string;
    totalCourseCreated: number;
    totalLearner: number;
    rating: number | null;
    totalReview: number;
  };
  listLesson: ILessonOverview[];
  listTag: ITag[];
  totalLearner: number;
  rating: number;
  totalReview: number;
  progress: number | null;
  totalTime: number;
  isPublic: boolean;
}

export interface ILessonOverview {
  id: string;
  index: number;
  name: string;
  totalTime: number;
  materials: IMaterialOverview[];
}

export type materialType = "Video" | "Document" | "Quiz" | "Assignment";

export interface IMaterialOverview {
  id: string;
  type: materialType;
  title: string;
  description: string;
  duration: number;
  version: number;
  originalMaterialId: string | null;
  status?: MissionStatus;
}

export interface ITag {
  id: string;
  name: string;
  courses?: number;
}
