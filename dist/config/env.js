"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "test", "production"]).default("development"),
    PORT: zod_1.z.coerce.number().int().min(1).max(65535).default(3000),
    DATABASE_URL: zod_1.z
        .string()
        .min(1, "DATABASE_URL es obligatoria")
        .refine((value) => value.startsWith("postgres://") || value.startsWith("postgresql://"), "DATABASE_URL debe ser una URL de PostgreSQL"),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32, "JWT_ACCESS_SECRET debe tener al menos 32 caracteres"),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.string().default("15m"),
    BCRYPT_SALT_ROUNDS: zod_1.z.coerce.number().int().min(10).max(15).default(12),
    CORS_ORIGIN: zod_1.z.string().default("*"),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("Error de configuracion en variables de entorno:");
    console.error(parsedEnv.error.flatten().fieldErrors);
    throw new Error("Configuracion invalida. Revisa el archivo .env");
}
exports.env = parsedEnv.data;
