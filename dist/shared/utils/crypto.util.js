"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = generateApiKey;
exports.getApiKeyPrefix = getApiKeyPrefix;
const crypto_1 = require("crypto");
const API_KEY_VISIBLE_PREFIX = "ak_";
const API_KEY_PREFIX_LENGTH = 15;
function generateApiKey() {
    const randomPart = (0, crypto_1.randomBytes)(32).toString("base64url");
    return `${API_KEY_VISIBLE_PREFIX}${randomPart}`;
}
function getApiKeyPrefix(apiKey) {
    return apiKey.slice(0, API_KEY_PREFIX_LENGTH);
}
