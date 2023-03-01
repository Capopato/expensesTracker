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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = void 0;
const jwt_utils_1 = require("../../utils/jwt.utils");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken = "";
    let refreshToken = "";
    const token = req.headers.cookie;
    if (!token) {
        return next();
    }
    if (token.includes("accessToken")) {
        const { decoded, expired } = (0, jwt_utils_1.verifyJWT)(accessToken);
    }
    if (token.includes("refreshToken")) {
        refreshToken = token.substring(13).toString();
        // console.log(refreshToken);
        const { valid, decoded, expired } = (0, jwt_utils_1.verifyJWT)(refreshToken);
        console.log(valid);
        console.log(decoded);
        console.log(expired);
    }
    next();
});
exports.deserializeUser = deserializeUser;
