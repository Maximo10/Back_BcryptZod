"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredential = createCredential;
exports.listCredentials = listCredentials;
exports.verifyCredential = verifyCredential;
const client_1 = require("../../shared/prisma/client");
const api_error_1 = require("../../shared/errors/api-error");
const crypto_util_1 = require("../../shared/utils/crypto.util");
const hash_util_1 = require("../../shared/utils/hash.util");
function buildDefaultCredentialLabel() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    return `key-${timestamp}`;
}
async function createCredential(userId, data) {
    const user = await client_1.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
    });
    if (!user) {
        throw api_error_1.ApiError.notFound("Usuario no encontrado");
    }
    const apiKeyPlainOnce = (0, crypto_util_1.generateApiKey)();
    const keyPrefix = (0, crypto_util_1.getApiKeyPrefix)(apiKeyPlainOnce);
    const keyHash = await (0, hash_util_1.hashValue)(apiKeyPlainOnce);
    const label = data.label ?? buildDefaultCredentialLabel();
    const credential = await client_1.prisma.apiCredential.create({
        data: {
            userId,
            label,
            keyPrefix,
            keyHash,
        },
    });
    return {
        id: credential.id,
        label: credential.label,
        prefix: credential.keyPrefix,
        apiKeyPlainOnce,
        createdAt: credential.createdAt,
    };
}
async function listCredentials(userId) {
    const credentials = await client_1.prisma.apiCredential.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            label: true,
            keyPrefix: true,
            lastUsedAt: true,
            createdAt: true,
        },
    });
    return credentials.map((credential) => ({
        id: credential.id,
        label: credential.label,
        prefix: credential.keyPrefix,
        lastUsedAt: credential.lastUsedAt,
        createdAt: credential.createdAt,
    }));
}
async function verifyCredential(data) {
    const keyPrefix = (0, crypto_util_1.getApiKeyPrefix)(data.apiKey);
    const candidates = await client_1.prisma.apiCredential.findMany({
        where: { keyPrefix },
        select: { id: true, keyHash: true },
    });
    for (const candidate of candidates) {
        const isMatch = await (0, hash_util_1.compareHash)(data.apiKey, candidate.keyHash);
        if (isMatch) {
            await client_1.prisma.apiCredential.update({
                where: { id: candidate.id },
                data: { lastUsedAt: new Date() },
            });
            return {
                valid: true,
                credentialId: candidate.id,
            };
        }
    }
    return { valid: false };
}
