"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUsername = process.env.mongoUsername || "";
const mongoPassword = process.env.mongoPassword || "";
const mongoUrl = process.env.mongoUrl || "";
const port = process.env.port || 3001;
const accessTokenLT = process.env.accessTokenLT || "";
const refreshTokenLT = process.env.refreshTokenLT || "";
const publicKey = process.env.publicKey || "";
const privateKey = process.env.privateKey || "";
const header = {
    headers: {
        apikey: process.env.fetchAccessToken,
    },
};
const currencies = {
    AustralianDollar: "AUD",
    Real: "BRL",
    Lev: "BGN",
    CanadianDollar: "CAD",
    Pound: "GBP",
    Dollar: "USD",
    Euro: "EUR",
    Yuan: "CNH",
    JapaneseYen: "JPY",
};
exports.default = {
    mongoUsername,
    mongoPassword,
    mongoUrl,
    port,
    accessTokenLT,
    refreshTokenLT,
    publicKey,
    privateKey,
    header,
    currencies,
};
