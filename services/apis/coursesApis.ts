/** @format */

import axios from "axios";
import { apisUrl, endPoints } from "./apisConfig";

export const getStudyingCourses = (accessToken: string) => {
  const url = apisUrl + endPoints.getStudyingCourse;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCourseById = (courseId: string) => {
  const url = apisUrl + endPoints.getCourseById + "?courseId=" + courseId;
  return axios.get(url);
};
