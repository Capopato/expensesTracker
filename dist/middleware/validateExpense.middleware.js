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
exports.validateExpense = void 0;
const zod_1 = require("zod");
const user_model_1 = __importDefault(require("../models/user.model"));
const validateExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        validateExpenseSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const err = error.issues;
            res.status(500).json({ err });
            return;
        }
        res.status(500).json({ error });
    }
});
exports.validateExpense = validateExpense;
const validateExpenseSchema = zod_1.z.object({
    user: zod_1.z.string().refine((val) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.find({ username: val }); })),
    title: zod_1.z.string().min(1).max(25),
    amount: zod_1.z.number().min(0),
    description: zod_1.z.string().min(0).max(150),
});
