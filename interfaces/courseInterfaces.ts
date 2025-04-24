/** @format */

import { InstructorCourseStatus, MaterialTypeEnum, MissionStatus } from "@/Enum/courseEnum";

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

export interface ILearningMaterial {
  id?: string;
  type: MaterialTypeEnum;
  status?: MissionStatus;
  title: string;
  description: string;
  video?: video;
  content?: string;
  quiz?: quiz;
  assignment?: assignment;
}

interface video {
  urlMaterial: string;
  duration?: number;
  thumbnail?: string;
}

interface quiz {
  id?: string;
  timeLimit: number;
  passingPercentage: number;
  questions: questions[];
}

interface questions {
  id?: string;
  questionTitle: string;
  multipleAnswers: boolean;
  answers: answers[];
}

interface answers {
  answerContent: string;
  isCorrect: boolean;
  id?: string;
}

export interface assignment {
  id?: string;
  timeLimit?: number;
  question?: string;
  answerLanguage?: string;
  expectedAnswer?: string;
}

export interface ISubmitQuizReq {
  quizId: string;
  totalTime: number;
  answers: { questionId: string; answerId: string }[];
}

export interface ISubmittedQuestResponse {
  attemptNo: number;
  correctAnswers: number;
  incorrectAnswers: number;
  isPassed: boolean;
  percentage: number;
  submitAt: string; // ISO 8601 date string
  totalTime: number; // in seconds or minutes, depending on your context
}

export interface ISubmitAssignment {
  assignmentId: string;
  totalTime: number;
  answerContent: string;
}

export interface ISubmitQuizReq {
  quizId: string;
  totalTime: number;
  answers: { questionId: string; answerId: string }[];
}