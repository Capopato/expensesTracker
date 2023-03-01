"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllExpenses = exports.deleteExpense = exports.readAllExpenses = exports.readExpense = exports.updateExpense = exports.createExpense = void 0;
const expense_model_1 = __importDefault(require("../models/expense.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const title = req.body.title;
    const amount = req.body.amount;
    const currency = req.body.currency;
    const description = req.body.description;
    const expense = new expense_model_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        user,
        title,
        amount,
        currency,
        description,
    });
    try {
        expense.save();
        res.status(200).json({ expense });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.createExpense = createExpense;
const updateExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.expenseId;
    const update = req.body;
    try {
        const expense = yield expense_model_1.default.findByIdAndUpdate(id);
        if (!expense) {
            res.status(404).send("Expense not found.");
            return;
        }
        expense.set(update);
        expense.save();
        res.status(200).json({ expense });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.updateExpense = updateExpense;
const readExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.expenseId;
    try {
        const expense = yield expense_model_1.default.findById(id);
        if (!expense) {
            res.status(404).send("Expense not found.");
            return;
        }
        res.status(200).json({ expense });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.readExpense = readExpense;
const readAllExpenses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield expense_model_1.default.find();
        res.status(200).json({ all });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.readAllExpenses = readAllExpenses;
const deleteExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.expenseId;
    try {
        const deleteExpense = yield expense_model_1.default.findByIdAndDelete(id);
        if (!deleteExpense) {
            res.status(404).send("Expense not found.");
            return;
        }
        res.status(200).send("Expense item is deleted.");
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteExpense = deleteExpense;
const deleteAllExpenses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAll = yield expense_model_1.default.deleteMany();
        res.status(200).send("All expenses are deleted");
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteAllExpenses = deleteAllExpenses;
