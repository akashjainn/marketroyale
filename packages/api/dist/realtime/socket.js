"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRealtime = setupRealtime;
const socket_io_1 = require("socket.io");
function setupRealtime(httpServer) {
    const io = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
    io.of(/^\/contest\/\w+$/).on('connection', (socket) => {
        const ns = socket.nsp; // namespace instance
        socket.emit('welcome', { ok: true });
        // Demo interval broadcast
        const interval = setInterval(() => {
            ns.emit('score:update', { entryId: 'demo', score: Math.random() * 10, rank: 1 });
        }, 8000);
        socket.on('disconnect', () => clearInterval(interval));
    });
    return io;
}
//# sourceMappingURL=socket.js.map