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
exports.convertExpense = void 0;
const expense_model_1 = __importDefault(require("../models/expense.model"));
const currency_fetch_1 = require("../middleware/currency/currency.fetch");
const convertExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const expenseId = req.body.expenseId;
    const expense = yield expense_model_1.default.findById(expenseId);
    if (!expense) {
        res.status(404).send("Item not found.");
        return;
    }
    const amount = expense.amount;
    const fromCurrency = expense.currency;
    const toCurrency = req.body.toCurrency;
    const convert = yield (0, currency_fetch_1.convertCurrency)(fromCurrency, toCurrency, amount);
    console.log(convert);
    res.status(200).json({ convert });
});
exports.convertExpense = convertExpense;
