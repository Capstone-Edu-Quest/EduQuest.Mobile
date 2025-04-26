/** @format */

import axios from "axios";
import { apisUrl, endPoints } from "./apisConfig";
import {
  ISubmitAssignment,
  ISubmitQuizReq,
} from "@/interfaces/courseInterfaces";

export const getStudyingCourses = (accessToken: string) => {
  const url = apisUrl + endPoints.getStudyingCourse;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCourseById = (courseId: string, accessToken: string) => {
  const url = apisUrl + endPoints.getCourseById + "?courseId=" + courseId;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMaterialById = (courseId: string, accessToken: string) => {
  const url =
    apisUrl + endPoints.getMaterialDetails + "?materialId=" + courseId;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const markMaterialAsDone = (
  materialId: string,
  lessonId: string,
  accessToken: string
) => {
  const url = apisUrl + endPoints.userProgress;
  return axios.put(
    url,
    {
      materialId,
      lessonId,
      time: null,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getMyAssignment = (
  lessonId: string,
  assignmentId: string,
  accessToken: string
) => {
  const url =
    apisUrl +
    endPoints.getAssignment +
    `?assignmentId=${assignmentId}&lessonId=${lessonId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const onSubmitAssignment = (
  lessonId: string,
  accessToken: string,
  data: ISubmitAssignment
) => {
  const url = apisUrl + endPoints.submitAssignment + `?lessonId=${lessonId}`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const onSubmitQuiz = (
  lessonId: string,
  accessToken: string,
  data: ISubmitQuizReq
) => {
  const url = apisUrl + endPoints.submitQuiz + `?lessonId=${lessonId}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
