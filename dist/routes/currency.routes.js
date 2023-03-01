"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const currency_controller_1 = require("../controllers/currency.controller");
const currencyRoutes = express_1.default.Router();
currencyRoutes.post("/convert", currency_controller_1.convertExpense);
exports.default = currencyRoutes;
