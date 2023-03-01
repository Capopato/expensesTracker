import { Request, Response, NextFunction } from "express";
import Expense, { expenseModel } from "../models/expense.model";
import { convertCurrency } from "../middleware/currency/currency.fetch";

export const convertExpense = async (req: Request, res: Response, next: NextFunction) => {
  const expenseId = req.body.expenseId;

  const expense = await Expense.findById(expenseId);

  if (!expense) {
    res.status(404).send("Item not found.");
    return;
  }

  const amount = expense.amount;
  const fromCurrency = expense.currency;
  const toCurrency = req.body.toCurrency;

  const convert: object = await convertCurrency(fromCurrency, toCurrency, amount);

  console.log(convert);
  res.status(200).json({ convert });
};
