import express from "express";
import { createExpense, deleteAllExpenses, deleteExpense, readAllExpenses, readExpense, updateExpense } from "../controllers/expense.controller";
import { validateExpense } from "../middleware/validateExpense.middleware";

const expenseRoutes = express.Router();

expenseRoutes.post("/create", validateExpense, createExpense);
expenseRoutes.put("/update/:expenseId", validateExpense, updateExpense);
expenseRoutes.get("/read/:expenseId", readExpense);
expenseRoutes.get("/read-all", readAllExpenses);
expenseRoutes.delete("/delete/:expenseId", deleteExpense);
expenseRoutes.delete("/delete-all", deleteAllExpenses);

export default expenseRoutes;
