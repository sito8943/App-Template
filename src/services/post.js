import { getAuth } from "../auth/auth";
import config from "../config";
import axios from "axios";

/**
 *
 * @param {object} user
 * @returns
 */
export const login = async (user) => {
  try {
    const response = await axios.post(
      `${config.serverUrl}/user/loginUser`,
      { n: user.n, p: user.p },
      {
        headers: getAuth,
      }
    );
    const result = response.status;
    const data = await response.data;
    if (result === 200) return data;
    return result;
  } catch (err) {
    return String(err);
  }
};
