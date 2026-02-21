"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    code;
    details;
    constructor(statusCode, code, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.name = "ApiError";
    }
    static badRequest(message, details) {
        return new ApiError(400, "BAD_REQUEST", message, details);
    }
    static unauthorized(message = "No autorizado") {
        return new ApiError(401, "UNAUTHORIZED", message);
    }
    static notFound(message = "Recurso no encontrado") {
        return new ApiError(404, "NOT_FOUND", message);
    }
    static conflict(message) {
        return new ApiError(409, "CONFLICT", message);
    }
}
exports.ApiError = ApiError;
