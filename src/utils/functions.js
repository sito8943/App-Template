/**
 * Find the first upper case letter in a string.
 * @param {string} str - The string to search through.
 * @returns {number} The index of the first uppercase letter in the string.
 */
export const findFirstUpperLetter = (str) => {
  for (let i = 0; i < str.length; i += 1)
    if (str[i] === str[i].toUpperCase()) return i;
  return -1;
};

/**
 * Returns the index of the first number in a string
 * @param {string} str - The string to search through.
 * @returns {number} The index of the first number in the string.
 */
export const findFirstNumber = (str) => {
  for (let i = 0; i < str.length; i += 1)
    if (str[i] >= "0" && str[i] <= "9") return i;
  return -1;
};

/**
 * Return the index of the first lowercase letter in the string, or -1 if there are no lowercase
 * letters.
 * @param {string} str - the string to search through
 * @returns {number} The index of the first lowercase letter in the string.
 */
export const findFirstLowerLetter = (str) => {
  for (let i = 0; i < str.length; i += 1)
    if (str[i] === str[i].toLowerCase()) return i;
  return -1;
};

/**
 * Validates a password based on the following rules:
 *
 * @param {string} password - the password to validate
 * @param {string} user - the user's email address
 * @returns {number} error type, -1 if everything is ok
 *
 * - 0 The password must be between 8 and 12 characters long.
 * - 1 The password must contain at least one upper case letter, one lower case letter, and one number.
 * - 2 The password must not contain the user's name
 */
export const passwordValidation = (password, user) => {
  // validating password length
  if (password.length < 8 || password.length > 12) return 0;
  // validating password special characters
  if (
    findFirstUpperLetter(password) === -1 ||
    findFirstLowerLetter(password) === -1 ||
    findFirstNumber(password) === -1
  )
    return 1;
  if (password.indexOf(user) !== -1) return 2;
  return -1;
};

export const NodeToBetterParent = (node) => {
  let newNode = node;
  if (newNode.nodeName === "path") newNode = newNode.parentNode;
  if (newNode.nodeName === "svg") newNode = newNode.parentNode;
  return newNode;
};

/**
 *
 * @param {string} password
 * @param {string} rpassword
 * @param {string} user
 * @returns
 */
export const passwordsAreValid = (password, rpassword, user) => {
  // validating passwords
  let passwordValidationResult = passwordValidation(password, user);
  if (passwordValidationResult > -1) return passwordValidationResult;
  passwordValidationResult = passwordValidation(rpassword, user);
  if (passwordValidationResult > -1) return passwordValidationResult;
  return -1;
};

export const getUserName = () => {
  // @ts-ignore
  if (localStorage.getItem(config.userCookie) !== null)
    // @ts-ignore
    return localStorage.getItem(config.userCookie);
  // @ts-ignore
  return sessionStorage.getItem(config.userCookie);
};

/**
 *
 * @param {string} user
 * @returns
 */
export const isAdmin = (user = "") =>
  user.length ? user === "admin" : getUserName() === "admin";

/**
 * If the validating cookie is set, return true, otherwise return false.
 */
// @ts-ignore
export const areValidatingEmail = () =>
  Boolean(sessionStorage.getItem(config.validationCookie));

/**
 * Scroll to a target position, default the top of the page.
 * @param {number} [target=0] - The target position to scroll to.
 */
export const scrollTo = (target = 0) =>
  window.scroll({
    top: target,
    left: 0,
    behavior: "smooth",
  });

/**
 * Takes a name, expiration, and value, and creates a cookie with those values
 * @param {string} name - The name of the cookie
 * @param {string} expiration - "2019-12-31 23:59:59"
 * @param {any} value - The value of the cookie.
 * @param {string} splitter - character to split
 */
export const createCookie = (name, expiration, value, splitter = "-") => {
  const spaceSplit = expiration.split(" ");
  const dashSplit = spaceSplit[0].split(splitter);
  const colonSplit = spaceSplit[1].split(":");
  const d = new Date(
    Number(dashSplit[0]),
    Number(dashSplit[1]),
    Number(dashSplit[2]),
    Number(colonSplit[0]),
    Number(colonSplit[1]),
    Number(colonSplit[2])
  );
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires}";path=/`;
};

/**
 * Creates a cookie with a name of "recovering", an email value and of the current date plus 30 minutes.
 * @param {string} email - string
 */
export const createValidatingCookie = (email) => {
  const date = new Date();
  const minutes = date.getMinutes();
  date.setMinutes(minutes + 60);
  const stringDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  // @ts-ignore
  createCookie(config.validationCookie, stringDate, email, "/");
};

/**
 * If remember is true, it stores user data to localStorage, otherwise it stores it in sessionStorage
 * @param {boolean} remember - a boolean value that determines whether the user should be remembered or not.
 * @param {string} user - The user object that you want to store in the browser.
 */
export const logUser = (remember, user) => {
  const date = new Date();
  const minutes = date.getMinutes();
  date.setMinutes(minutes + 60);
  const stringDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  createCookie(config.userCookie, stringDate, user);
};

/**
 * Creates a cookie with a name of "recovering", an email value and of the current date plus 30 minutes.
 * @param {string} email - string
 */
export const createRecoveringCookie = (email) => {
  const date = new Date();
  const minutes = date.getMinutes();
  // @ts-ignore
  createCookie(config.recoveringCookie, date.setMinutes(minutes + 30), email);
};

/**
 * Takes a cookie name as an argument and returns the value of that cookie
 * @param {string} cname - The name of the cookie you want to get.
 * @returns {any} The value of the cookie with the name cname.
 */
export const getCookie = (cname) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

/**
 * If the user is logged in, return true, otherwise return false.
 */
export const userLogged = () =>
  // @ts-ignore
  getCookie(config.userCookie) !== "";

/**
 *
 * @param {object} answer
 * @returns
 */
export const apiTokenCertified = (answer) => {
  if (answer.error) return answer.error.indexOf("401") === -1;
  return answer.indexOf("401") === -1;
};

export const isValidatingEmail = () =>
  // @ts-ignore
  getCookie(config.validationCookie) !== "";

/**
 * Removes a cookie
 * @param {string} name
 */
export const deleteCookie = (name) => {
  document.cookie = `${name} =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const removeValidatingCookie = () => {
  // @ts-ignore
  deleteCookie(config.validationCookie);
};

export const removeRecoveringCookie = () => {
  // @ts-ignore
  deleteCookie(config.recoveringCookie);
};
