/** @format */

import {
  QuestMissionEnum,
  QuestTypeEnum,
  RewardTypeEnum,
} from "@/Enum/questEnum";
import { IUserStatistics } from "./userInterfaces";

export interface IQuest {
  id?: string;
  title: string;
  type: QuestTypeEnum;
  questType: QuestMissionEnum;
  questValue: (number | string)[];
  rewardType: RewardTypeEnum[];
  rewardValue: (number | string)[];
}

export interface IQuestOfUser extends IQuest {
  startDate: string;
  dueDate: string | null;
  isCompleted: boolean;
  isRewardClaimed: boolean;
  pointToComplete: number;
  currentPoint: number;
  completedDate: string;
}

export interface IRewardedQuestRes {
  coupon: string | null;
  expAdded: number;
  goldAdded: number;
  equippedItems: string[];
  mascotItem: string[];
  statistic: IUserStatistics;
}
