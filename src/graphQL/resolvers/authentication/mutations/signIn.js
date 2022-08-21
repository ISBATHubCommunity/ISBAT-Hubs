import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../../models";
import { emailValidation } from "../validations";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../../../../constants/status-code";
import { response } from "../../../../utilities";

export default async (_parent, { user: { email, password } }, context, _info) => {
  // validate user email input
  const { valid, errors } = emailValidation(email);
  if (!valid) {
    return response(
      BAD_REQUEST, false, "BAD_REQUEST", "sign In errors", { ...errors },
    );
  }

  try {
    // check if the user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return response(
        BAD_REQUEST, false, "BAD_REQUEST", "Wrong credentials",
        { type: "SignInError", error: "Wrong credentials please try again." },
      )
    }
    // compare the password with password stored int db
    const verified = await bcrypt.compare(password, user.password);

    if (!verified) {
      return response(
        BAD_REQUEST, false, "BAD_REQUEST", "Wrong credentials",
        { type: "SignInError", error: "Wrong credentials please try again." },
      )
    }

    // generating the token
    const payload = { email: user.email, id: user._id };
    const options = { expiresIn: process.env.ACCESS_TOKEN_SECRET_KEY_EXPIRES_IN };
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, options);
    // generating a refresh token
    const refresh_payload = { id: user._id, tokenVersion: user.tokenVersion };
    const refresh_options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN };
    const refresh_token = await jwt.sign(
      refresh_payload, process.env.REFRESH_TOKEN_SECRET_KEY, refresh_options,
    );


    const { res } = context;
    // set the refresh_token in the cookie.
    res.cookie("2kole_fjid", jwt.sign(
      refresh_payload, process.env.REFRESH_TOKEN_SECRET_KEY, refresh_options,
    ), {
      httpOnly: true,
    });

    // return the token to the user performing this action.
    return { token, refresh_token };
  } catch (error) {
    return response(
      INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR", "registration errors", { ...error },
    );
  }
};