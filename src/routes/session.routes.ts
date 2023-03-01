import express from "express";
import { login, logout } from "../controllers/session.controller";
import { requireUser } from "../middleware/session/requireUser.middleware";
import { Request, Response, NextFunction } from "express";
import { deserializeUser } from "../middleware/session/deserializeUser.middleware";

const sessionRoutes = express.Router();

sessionRoutes.post("/login", login);
sessionRoutes.get("/logout", deserializeUser, logout);

export default sessionRoutes;
