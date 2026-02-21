"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCredentialSchema = exports.createCredentialSchema = void 0;
const zod_1 = require("zod");
exports.createCredentialSchema = zod_1.z.object({
    label: zod_1.z.string().trim().min(3).max(80).optional(),
});
exports.verifyCredentialSchema = zod_1.z.object({
    apiKey: zod_1.z.string().trim().min(16),
});
