"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
exports.default = handler;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const contests_1 = require("./routes/contests");
const market_1 = require("./routes/market");
const env_1 = require("./env");
// Factory to create an Express app without binding to a port.
// This is reused by both the local Node server (with websockets) and the Vercel serverless handler.
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Health check that shows service status
    app.get('/api/health', (_req, res) => {
        const status = {
            ok: true,
            env: env_1.env.NODE_ENV,
            database: !!process.env.DATABASE_URL,
            marketAPI: !!env_1.env.FINNHUB_API_KEY,
            timestamp: new Date().toISOString()
        };
        res.json(status);
    });
    app.use('/api/contests', contests_1.contestsRouter);
    app.use('/api/market', market_1.marketRouter);
    // Only attempt to serve pre-built static frontend in production builds (Vercel) –
    // during local dev we rely on Vite dev server + proxy.
    if (process.env.NODE_ENV === 'production') {
        const staticDir = path_1.default.resolve(process.cwd(), 'dist');
        const indexFile = path_1.default.join(staticDir, 'index.html');
        if (fs_1.default.existsSync(staticDir) && fs_1.default.existsSync(indexFile)) {
            app.use(express_1.default.static(staticDir));
            app.get('*', (req, res, next) => {
                if (req.path?.startsWith('/api'))
                    return next();
                res.sendFile(indexFile);
            });
        }
        else {
            console.warn('Static frontend assets not found at', staticDir);
        }
    }
    // Global error handler
    app.use((err, _req, res, _next) => {
        console.error('API Error:', err);
        res.status(500).json({
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    });
    return app;
}
// Vercel serverless handler - default export must be a function
const app = createApp();
function handler(req, res) {
    return app(req, res);
}
// Allow direct execution (optional) for simple debugging without websockets.
if (require.main === module) {
    const appInstance = createApp();
    const port = process.env.PORT || 4000;
    appInstance.listen(port, () => console.log(`API (no realtime) listening on :${port}`));
}
//# sourceMappingURL=app.js.map