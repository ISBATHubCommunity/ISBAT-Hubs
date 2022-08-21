import { Schema, model } from "mongoose";

const communitySchema = new Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, max: 500 },
  members: { type: Schema.Types.ObjectId, ref: "User" },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  icon: { type: String },
  banner: { type: String },
  visibility: { type: String, required: true, default: "public" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default model("Community", communitySchema);