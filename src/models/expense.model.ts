import mongoose, { Schema, Document } from "mongoose";

// MAKE LOGIC FOR CATEGORIES ?

export interface expenseModel extends Document {
  user: string;
  title: string;
  amount: number;
  description: string;
}

export const expenseSchema: Schema = new Schema(
  {
    user: { type: String },
    category: { type: String },
    amount: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<expenseModel>("Expense", expenseSchema);
