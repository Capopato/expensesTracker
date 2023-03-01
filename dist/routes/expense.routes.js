"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_controller_1 = require("../controllers/expense.controller");
const validateExpense_middleware_1 = require("../middleware/expense/validateExpense.middleware");
const expenseRoutes = express_1.default.Router();
expenseRoutes.post("/create", validateExpense_middleware_1.validateExpense, expense_controller_1.createExpense);
expenseRoutes.put("/update/:expenseId", validateExpense_middleware_1.validateExpense, expense_controller_1.updateExpense);
expenseRoutes.get("/read/:expenseId", expense_controller_1.readExpense);
expenseRoutes.get("/read-all", expense_controller_1.readAllExpenses);
expenseRoutes.delete("/delete/:expenseId", expense_controller_1.deleteExpense);
expenseRoutes.delete("/delete-all", expense_controller_1.deleteAllExpenses);
exports.default = expenseRoutes;
