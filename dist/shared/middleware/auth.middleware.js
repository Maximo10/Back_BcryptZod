"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const api_error_1 = require("../errors/api-error");
const jwt_util_1 = require("../utils/jwt.util");
function extractBearerToken(request) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        return null;
    }
    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        return null;
    }
    return token;
}
function requireAuth(request, _response, next) {
    const token = extractBearerToken(request);
    if (!token) {
        next(api_error_1.ApiError.unauthorized("Falta token Bearer"));
        return;
    }
    const payload = (0, jwt_util_1.verifyAccessToken)(token);
    request.user = {
        id: payload.sub,
        email: payload.email,
    };
    next();
}
