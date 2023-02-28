import mongoose, { Document, Schema } from "mongoose";
import { userModel } from "./user.model";
import { boolean } from "joi";

export interface sessionModel extends Document {
  user: userModel["id"];
  valid: Boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<sessionModel>("Session", sessionSchema);
