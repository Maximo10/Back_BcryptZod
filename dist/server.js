"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const app_1 = require("./app");
const client_1 = require("./shared/prisma/client");
const server = app_1.app.listen(env_1.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${env_1.env.PORT}`);
});
async function shutdown() {
    console.log("Cerrando servidor...");
    server.close(async () => {
        await client_1.prisma.$disconnect();
        process.exit(0);
    });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
