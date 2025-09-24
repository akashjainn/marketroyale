"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_1 = require("./realtime/socket");
const app_1 = require("./app");
const env_1 = require("./env");
// Local development entrypoint with websockets. In Vercel serverless we use app.ts via api/[...all].ts.
const app = (0, app_1.createApp)();
const server = http_1.default.createServer(app);
(0, socket_1.setupRealtime)(server);
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`API (realtime enabled) listening on :${port} env=${env_1.env.NODE_ENV}`));
//# sourceMappingURL=index.js.map