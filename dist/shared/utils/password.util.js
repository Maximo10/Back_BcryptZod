"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertPasswordPolicy = assertPasswordPolicy;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const api_error_1 = require("../errors/api-error");
const hash_util_1 = require("./hash.util");
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;
function assertPasswordPolicy(password) {
    if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
        throw api_error_1.ApiError.badRequest(`La contrasena debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres`);
    }
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    if (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSymbol) {
        throw api_error_1.ApiError.badRequest("La contrasena debe incluir al menos una minuscula, una mayuscula, un numero y un simbolo");
    }
}
async function hashPassword(password) {
    assertPasswordPolicy(password);
    return (0, hash_util_1.hashValue)(password);
}
async function comparePassword(password, passwordHash) {
    return (0, hash_util_1.compareHash)(password, passwordHash);
}
