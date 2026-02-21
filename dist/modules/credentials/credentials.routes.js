"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialsRouter = void 0;
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_middleware_1 = require("../../shared/middleware/auth.middleware");
const credentials_controller_1 = require("./credentials.controller");
const verifyLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Demasiadas verificaciones. Intentalo de nuevo en unos minutos.",
        code: "TOO_MANY_REQUESTS",
    },
});
const credentialsRouter = (0, express_1.Router)();
exports.credentialsRouter = credentialsRouter;
credentialsRouter.post("/", auth_middleware_1.requireAuth, credentials_controller_1.createCredential);
credentialsRouter.get("/", auth_middleware_1.requireAuth, credentials_controller_1.listCredentials);
credentialsRouter.post("/verify", verifyLimiter, credentials_controller_1.verifyCredential);
