"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const api_error_1 = require("../errors/api-error");
const JWT_ISSUER = "ejemplo-cifrado";
function signToken(payload, secret, expiresIn) {
    const options = {
        expiresIn,
        issuer: JWT_ISSUER,
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
function verifyToken(token, secret) {
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret, {
            issuer: JWT_ISSUER,
        });
        if (!payload ||
            typeof payload.sub !== "string" ||
            typeof payload.email !== "string") {
            throw api_error_1.ApiError.unauthorized("Token invalido");
        }
        return payload;
    }
    catch {
        throw api_error_1.ApiError.unauthorized("Token invalido o expirado");
    }
}
function generateAccessToken(userId, email) {
    return signToken({ sub: userId, email }, env_1.env.JWT_ACCESS_SECRET, env_1.env.JWT_ACCESS_EXPIRES_IN);
}
function verifyAccessToken(token) {
    return verifyToken(token, env_1.env.JWT_ACCESS_SECRET);
}
