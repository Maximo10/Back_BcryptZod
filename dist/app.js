"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const auth_routes_1 = require("./modules/auth/auth.routes");
const credentials_routes_1 = require("./modules/credentials/credentials.routes");
const error_middleware_1 = require("./shared/middleware/error.middleware");
const app = (0, express_1.default)();
exports.app = app;
const corsMiddleware = (0, cors_1.default)({
    origin: env_1.env.CORS_ORIGIN === "*" ? true : env_1.env.CORS_ORIGIN.split(","),
});
app.use(corsMiddleware);
app.use(express_1.default.json({ limit: "100kb" }));
app.get("/health", (_request, response) => {
    response.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});
app.use("/auth", auth_routes_1.authRouter);
app.use("/credentials", credentials_routes_1.credentialsRouter);
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
