/** @format */

import axios from "axios";
import { apisUrl, endPoints } from "./apisConfig";

export const onSignIn = (email: string, password: string) => {
  const url = apisUrl + endPoints.signInPassword;

  return axios.post(url, { email, password });
};
