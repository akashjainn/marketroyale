import { Server } from 'socket.io';

export function setupRealtime(httpServer: any) {
  const io = new Server(httpServer, { cors: { origin: '*' } });

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
