/* eslint-disable arrow-body-style */
/**
 * @params success - Boolean value to determine whether it's a success or failure.
 * @params code - Numerical status code, like 200 for success.
 * @params statusCode - Human readable status, like "OK" for success.
 * @params message - descriptive message about the what happened.
 * @params errors - Errors generated from the request.
 */

export default (
  code, success, statusCode, message, errors = {},
) => ({
  status: { code, success, statusCode },
  message,
  errors,
});