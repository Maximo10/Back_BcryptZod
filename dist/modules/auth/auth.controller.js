"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.me = me;
const api_error_1 = require("../../shared/errors/api-error");
const auth_service_1 = require("./auth.service");
const auth_schema_1 = require("./auth.schema");
async function register(request, response, next) {
    try {
        const data = auth_schema_1.registerSchema.parse(request.body);
        const result = await (0, auth_service_1.register)(data);
        response.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function login(request, response, next) {
    try {
        const data = auth_schema_1.loginSchema.parse(request.body);
        const result = await (0, auth_service_1.login)(data);
        response.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function logout(request, response, next) {
    try {
        if (!request.user) {
            throw api_error_1.ApiError.unauthorized();
        }
        response.status(200).json({
            message: "Logout correcto. El cliente debe eliminar el token local.",
        });
    }
    catch (error) {
        next(error);
    }
}
async function me(request, response, next) {
    try {
        if (!request.user) {
            throw api_error_1.ApiError.unauthorized();
        }
        const user = await (0, auth_service_1.getCurrentUser)(request.user.id);
        response.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}
