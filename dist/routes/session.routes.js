"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_controller_1 = require("../controllers/session.controller");
const deserializeUser_middleware_1 = require("../middleware/session/deserializeUser.middleware");
const sessionRoutes = express_1.default.Router();
sessionRoutes.post("/login", session_controller_1.login);
sessionRoutes.get("/logout", deserializeUser_middleware_1.deserializeUser, session_controller_1.logout);
exports.default = sessionRoutes;
