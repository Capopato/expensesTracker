import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface userModel extends Document {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordCheck: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this as userModel;
  const salt = 10;

  try {
    /** if a password is given and this password is modified */
    if (user.password && user.isModified("password")) {
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      user.password = hashedPassword;
      /** set password check to hashedpassword as well */
      user.passwordCheck = hashedPassword;
      next();
    } else {
      next();
    }
  } catch (error) {
    /** Use the throw error function */
    // throwError(error);
  }
});

userSchema.pre<userModel>("save", async function (next) {
  let user = this as userModel;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashPassword;
  user.passwordCheck = hashPassword;
  return next();
});

userSchema.methods.comparePassword = async function (password: string) {
  const user = this as userModel;
  try {
    return bcrypt.compare(password, user.password);
  } catch (error) {
    return error;
  }
};

export default mongoose.model<userModel>("User", userSchema);
