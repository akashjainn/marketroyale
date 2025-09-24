"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketRouter = void 0;
const express_1 = require("express");
const shared_1 = require("shared");
const env_1 = require("../env");
const adapter = (0, shared_1.createFinnhubAdapter)(env_1.env.FINNHUB_API_KEY);
exports.marketRouter = (0, express_1.Router)();
exports.marketRouter.get('/snapshot', async (req, res) => {
    const tickers = (req.query.tickers || '').split(',').filter(Boolean).slice(0, 50);
    if (!tickers.length)
        return res.status(400).json({ error: 'tickers required' });
    const snap = await adapter.getSnapshot(tickers);
    res.json({ snapshot: snap });
});
exports.marketRouter.get('/ohlc', async (req, res) => {
    const { ticker, start, end, tf } = req.query;
    if (!ticker || !start || !end || !tf)
        return res.status(400).json({ error: 'ticker,start,end,tf required' });
    const data = await adapter.getOHLC(ticker, new Date(start), new Date(end), tf);
    res.json({ ohlc: data });
});
//# sourceMappingURL=market.js.map