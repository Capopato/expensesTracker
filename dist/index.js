"use strict";
/**
 * Expense tracker.
 * Expense need extra value: username. It is assigned to this user (and when check it needs to be cross checked with the mongoDB to see if the user exists)
 * make a function to view all the expenses assigned to a user.
 * make a user model/schema for mongoDB. Because each user can make multiple expenses and categorizing them in different categories
 *
 * IDEA:
 * make optional to convert the expense to another currency
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const currency_routes_1 = __importDefault(require("./routes/currency.routes"));
const app = (0, express_1.default)();
/** Set connection to mongoDB */
mongoose_1.default
    .set("strictQuery", true)
    .connect(config_1.default.mongoUrl)
    .then(() => {
    console.log("Connected to mongoDB");
    startServer();
})
    .catch((error) => {
    console.log(error);
});
/** This function will only be activated when connection to mongoDB has been realised */
const startServer = () => {
    app.use(express_1.default.json());
    app.use((0, express_1.urlencoded)({ extended: true }));
    // app.use(deserializeUser);
    app.use("/session", session_routes_1.default);
    app.use("/user", user_routes_1.default);
    app.use("/expense", expense_routes_1.default);
    app.use("/currency", currency_routes_1.default);
    app.listen(config_1.default.port, () => console.log(`Port is running at: ${config_1.default.port}`));
};
