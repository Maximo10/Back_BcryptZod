"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().trim().toLowerCase().email("Email invalido"),
    password: zod_1.z.string().min(8).max(72),
    name: zod_1.z.string().trim().min(2).max(80).optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().trim().toLowerCase().email("Email invalido"),
    password: zod_1.z.string().min(8).max(72),
});
