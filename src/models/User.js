import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String, trim: true, required: true, unique: true,
  },
  email: {
    type: String,
    email: true,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>[\]\\.;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a vaild email address",
    ],
  },
  status: {
    type: String, trim: true, required: true, default: "offline",
  },
  bio: { type: String, trim: true },
  password: {
    type: String, trim: true, required: true, select: false,
  },
  avatar: {
    type: String,
    trim: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgUNaoFwOOa3sOnMoc8CVUJ65bhS822etxVQ&usqp=CAU",
  },
  otp: { type: Schema.Types.ObjectId, ref: "Otp" },
  reset_password_token: { type: String },
  tokenVersion: { type: Number, required: true, default: 0 },
  reset_password_token_expires: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre("save", async function preSaveHook(next) {
  /*
    If the password is modified, we need to hash it the password.
    This applied in case of updating the password.
  */
  if (this.isModified("password")) {
    // hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next(); // pass execution forward.
  }
  next();
});

export default model("User", userSchema);
