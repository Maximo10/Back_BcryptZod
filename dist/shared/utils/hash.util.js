"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashValue = hashValue;
exports.compareHash = compareHash;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../config/env");
async function hashValue(value) {
    return bcrypt_1.default.hash(value, env_1.env.BCRYPT_SALT_ROUNDS);
}
async function compareHash(value, hash) {
    return bcrypt_1.default.compare(value, hash);
}
