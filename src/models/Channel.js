import { Schema, model } from "mongoose";
import relationship from "./relationship";

const channelSchema = new Schema({
  name: {
    type: String, required: true, trim: true, max: 25,
  },
  description: { type: String, trim: true, max: 500 },
  visibility: { type: String, default: "public", required: true },
  commmunity: { ...relationship("Community") },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  created: {
    at: { type: Date, default: Date.now },
    by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  upated: {
    at: { type: Date, default: Date.now },
    by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
});

export default model("Channel", channelSchema);
