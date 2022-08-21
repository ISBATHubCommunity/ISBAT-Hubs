import { Schema } from "mongoose";

/**
 * @param { String } ref This is the model refference to which the relationship is with.
 * @returns { Object } Obejct with the type properity
 */
export default (ref) => {
  return {
    type: Schema.Types.ObjectId, ref,
  }
};
