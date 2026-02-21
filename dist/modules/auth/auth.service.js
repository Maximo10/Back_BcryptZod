"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getCurrentUser = getCurrentUser;
const client_1 = require("../../shared/prisma/client");
const api_error_1 = require("../../shared/errors/api-error");
const jwt_util_1 = require("../../shared/utils/jwt.util");
const password_util_1 = require("../../shared/utils/password.util");
function toPublicUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
    };
}
async function register(data) {
    const email = data.email.toLowerCase();
    const existingUser = await client_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw api_error_1.ApiError.conflict("El email ya esta registrado");
    }
    const passwordHash = await (0, password_util_1.hashPassword)(data.password);
    const user = await client_1.prisma.user.create({
        data: {
            email,
            name: data.name ?? null,
            passwordHash,
        },
    });
    const accessToken = (0, jwt_util_1.generateAccessToken)(user.id, user.email);
    return {
        user: toPublicUser(user),
        accessToken,
        token: accessToken,
    };
}
async function login(data) {
    const email = data.email.toLowerCase();
    const user = await client_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw api_error_1.ApiError.unauthorized("Credenciales invalidas");
    }
    const passwordMatches = await (0, password_util_1.comparePassword)(data.password, user.passwordHash);
    if (!passwordMatches) {
        throw api_error_1.ApiError.unauthorized("Credenciales invalidas");
    }
    const accessToken = (0, jwt_util_1.generateAccessToken)(user.id, user.email);
    return {
        user: toPublicUser(user),
        accessToken,
        token: accessToken,
    };
}
async function getCurrentUser(userId) {
    const user = await client_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw api_error_1.ApiError.notFound("Usuario no encontrado");
    }
    return toPublicUser(user);
}
