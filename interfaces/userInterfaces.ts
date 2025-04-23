/** @format */

import { WebRole } from "@/Enum/userEnum";

export interface ILoginRes {
  token: IToken;
  userData: IUser;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  isPro: boolean;
  description: string | null;
  headline: string | null;
  avatarUrl: string;
  roleId: WebRole;
  status: string;
  statistic: IUserStatistics;
  lastActive?: string;
  mascotItem: string[];
  equippedItems: string[];
  isPremium: boolean;
}

export interface IUserStatistics {
  userId: string;
  totalActiveDay: number;
  maxStudyStreakDay: number;
  lastLearningDay: string | null;
  completedCourses: number;
  gold: number;
  exp: number;
  level: number;
  studyTime: number;
  totalCompletedCourses: number;
  currentStreak: number;
  longestStreak: number;
  maxExpLevel: number;

  totalCourseCreated: number;
  totalLearner: number;
  totalReview: number;
  lastActive: string | null;

  rank: number;
  booster: {
    boostExp: number;
    boostGold: number;
  };
}

