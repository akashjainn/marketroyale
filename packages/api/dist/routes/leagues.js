"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaguesRouter = void 0;
const express_1 = require("express");
exports.leaguesRouter = (0, express_1.Router)();
exports.leaguesRouter.get('/', async (_req, res) => {
    res.json({ leagues: [] });
});
exports.leaguesRouter.post('/', async (_req, res) => {
    res.json({ ok: true, id: 'new-league' });
});
//# sourceMappingURL=leagues.js.map