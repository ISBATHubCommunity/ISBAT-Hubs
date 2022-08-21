import { User } from "../../../../models";
import { comparePasswords, emailValidation } from "../validations";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from "../../../../constants/status-code";
import { response } from "../../../../utilities";

export default async (_parent, { user: { username, email, password, confirm_password } }, _context, _info) => {

  const { valid, errors } = emailValidation(email);
  if (!valid) {
    return response(
      BAD_REQUEST, false, "BAD_REQUEST", "registration errors", { ...errors },
    );
  }

  try {
    // check if the user already exists
    const doesUserExists = await User.findOne({ email });
    if (!doesUserExists) {
      const passwordCheck = comparePasswords({ password, confirm_password });
      // checking if user password is valid.
      if (passwordCheck.valid) {
        const user = await new User({ username, email, password });
        await user.save();
        return response(
          CREATED, true, "CREATED", "Account created successfully!",
        );
      }
      return response(
        BAD_REQUEST, false, "BAD_REQUEST", "registration password errors", { ...passwordCheck.errors },
      );
    }
    // email already taken error
    return response(
      BAD_REQUEST, false, "BAD_REQUEST", "Email already taken.", { type: "email", error: "Email already taken" },
    );
  } catch (error) {
    return response(
      INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR", "registration errors", { ...errors },
    );
  }
};