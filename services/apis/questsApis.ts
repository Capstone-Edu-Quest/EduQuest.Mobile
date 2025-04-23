/** @format */

import axios from "axios";
import { apisUrl, endPoints } from "./apisConfig";

export const getUserQuest = (accessToken: string) => {
  const url = apisUrl + endPoints.getQuestOfUser;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const claimQuestReward = (accessToken: string, questId: string) => {
  const url = apisUrl + endPoints.rewardQuest + `?userQuestId=${questId}`;
  return axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
