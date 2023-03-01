import express from "express";
import { convertExpense } from "../controllers/currency.controller";

const currencyRoutes = express.Router();

currencyRoutes.post("/convert", convertExpense);

export default currencyRoutes;
