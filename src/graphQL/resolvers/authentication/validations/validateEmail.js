export default (email) => {
  const errors = {};
  if (email.trim() === "") {
    errors.type = "email";
    errors.error = "Email must not be empty.";
  } else {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>[\]\\.;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailRegEx)) {
      errors.type = "email";
      errors.error = "Email must be a valid email address";
    }
  }
  return { errors, valid: Object.keys(errors).length < 1 };
};
