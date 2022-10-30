// @ts-check

import md5 from "md5";
import axios from "axios";

// headers
import { getAuth } from "../auth/auth";

// config
import config from "../config";

// functions
// @ts-ignore
import { getCookie } from "utils/auth";

export const validateBasicKey = async () => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}user/validate`,
    {},
    {
      headers: {
        ...getAuth,
        // @ts-ignore
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  const data = await response.data;
  if (data.data.message) return true;
  return false;
};

/**
 * Takes a user object and sends it to the backend to be authenticated
 * @param {string} user - the user name
 * @param {string} password - the user password
 * @returns The response from the server.
 */
export const login = async (user, password) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}user/login`,
    { user, password: md5(password) },
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};

/**
 * Takes a user object as an argument, and returns a promise that resolves to the data returned from
 * the API
 * @param {object} user - This is the user object that we are sending to the server.
 * @returns The data from the response.
 */
export const register = async (user, password) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}user/register`,
    { user, password: md5(password) },
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};
