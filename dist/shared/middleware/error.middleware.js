"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const env_1 = require("../../config/env");
const api_error_1 = require("../errors/api-error");
function notFoundHandler(_request, _response, next) {
    next(api_error_1.ApiError.notFound("Ruta no encontrada"));
}
function errorHandler(error, _request, response, _next) {
    if (error instanceof api_error_1.ApiError) {
        response.status(error.statusCode).json({
            message: error.message,
            code: error.code,
            details: error.details,
        });
        return;
    }
    if (error instanceof zod_1.ZodError) {
        response.status(400).json({
            message: "Datos de entrada invalidos",
            code: "VALIDATION_ERROR",
            details: error.flatten(),
        });
        return;
    }
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            response.status(409).json({
                message: "Ya existe un registro con ese valor unico",
                code: "CONFLICT",
                details: error.meta,
            });
            return;
        }
    }
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        response.status(400).json({
            message: "Error de validacion en base de datos",
            code: "DATABASE_VALIDATION_ERROR",
        });
        return;
    }
    if (env_1.env.NODE_ENV !== "production") {
        console.error(error);
    }
    response.status(500).json({
        message: "Error interno del servidor",
        code: "INTERNAL_SERVER_ERROR",
    });
}
