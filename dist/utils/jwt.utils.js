"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const signJWT = (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.privateKey, {
        algorithm: "RS256",
        expiresIn,
    });
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.publicKey);
        return {
            valid: true,
            expired: false,
            decoded: decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: true,
            decoded: null,
        };
    }
};
exports.verifyJWT = verifyJWT;
