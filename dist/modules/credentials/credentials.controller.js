"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredential = createCredential;
exports.listCredentials = listCredentials;
exports.verifyCredential = verifyCredential;
const api_error_1 = require("../../shared/errors/api-error");
const credentials_service_1 = require("./credentials.service");
const credentials_schema_1 = require("./credentials.schema");
async function createCredential(request, response, next) {
    try {
        if (!request.user) {
            throw api_error_1.ApiError.unauthorized();
        }
        const data = credentials_schema_1.createCredentialSchema.parse(request.body);
        const result = await (0, credentials_service_1.createCredential)(request.user.id, data);
        response.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function listCredentials(request, response, next) {
    try {
        if (!request.user) {
            throw api_error_1.ApiError.unauthorized();
        }
        const result = await (0, credentials_service_1.listCredentials)(request.user.id);
        response.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
async function verifyCredential(request, response, next) {
    try {
        const data = credentials_schema_1.verifyCredentialSchema.parse(request.body);
        const result = await (0, credentials_service_1.verifyCredential)(data);
        response.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
