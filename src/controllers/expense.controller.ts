import { Request, Response, NextFunction } from "express";
import Expense from "../models/expense.model";
import mongoose from "mongoose";

export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title;
  const amount = req.body.amount;
  const description = req.body.description;

  const expense = new Expense({
    id: new mongoose.Types.ObjectId(),
    title,
    amount,
    description,
  });

  try {
    expense.save();
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.expenseId;
  const update = req.body;

  try {
    const expense = await Expense.findByIdAndUpdate(id);
    if (!expense) {
      res.status(404).send("Expense not found.");
      return;
    }
    expense.set(update);
    expense.save();
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readExpense = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.expenseId;
  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404).send("Expense not found.");
      return;
    }
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readAllExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await Expense.find();
    res.status(200).json({ all });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.expenseId;
  try {
    const deleteExpense = await Expense.findByIdAndDelete(id);
    if (!deleteExpense) {
      res.status(404).send("Expense not found.");
      return;
    }
    res.status(200).send("Expense item is deleted.");
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteAllExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteAll = await Expense.deleteMany();
    res.status(200).send("All expenses are deleted");
  } catch (error) {
    res.status(500).json({ error });
  }
};
