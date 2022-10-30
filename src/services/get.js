// @ts-check

import axios from "axios";

// headers
import { getAuth } from "../auth/auth";

// config
import config from "../config";

export const connectionState = async () => {
  try {
    const response = await axios.get(`${config.serverUrl}/status`, {
      headers: getAuth,
    });
    const result = response.status;
    if (result != 200) return response.statusText;
    return result;
  } catch (err) {
    return String(err);
  }
};
