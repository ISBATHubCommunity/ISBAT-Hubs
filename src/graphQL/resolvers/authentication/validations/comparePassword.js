export default ({ password, confirm_password }) => {
  const errors = {};
  const passwordRegEx = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

  if (password.trim() === "") {
    errors.type = "password";
    errors.error = "Password must not be empty";
  } else if (!password.match(passwordRegEx)) {
    errors.type = "password";
    errors.error = "Password length must be aleast 8 characters, including at least one upper case, one lowercase, one digit and one special character.";
  } else if (password !== confirm_password) {
    errors.type = "password";
    errors.error = "Password don't mutch";
  }
  return { errors, valid: Object.keys(errors).length < 1 };
};
