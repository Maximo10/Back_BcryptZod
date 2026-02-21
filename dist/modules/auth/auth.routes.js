"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_middleware_1 = require("../../shared/middleware/auth.middleware");
const auth_controller_1 = require("./auth.controller");
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 40,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Demasiadas peticiones de autenticacion. Intentalo de nuevo en unos minutos.",
        code: "TOO_MANY_REQUESTS",
    },
});
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.use(authLimiter);
authRouter.post("/register", auth_controller_1.register);
authRouter.post("/login", auth_controller_1.login);
authRouter.post("/logout", auth_middleware_1.requireAuth, auth_controller_1.logout);
authRouter.get("/me", auth_middleware_1.requireAuth, auth_controller_1.me);
