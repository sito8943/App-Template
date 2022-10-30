// @ts-check

import config from "../config";

// cookies
import { getCookie } from "../utils/functions";

export const getAuth = {
  Authorization: `Bearer ${getCookie(config.jwtKey)}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};
