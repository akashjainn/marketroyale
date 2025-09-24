"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeScore = computeScore;
function computeScore(picks, openMap, lastMap) {
    let totalPct = 0;
    for (const s of picks) {
        const open = openMap[s];
        const last = lastMap[s];
        if (!open || !last)
            continue;
        totalPct += ((last - open) / open) * 100;
    }
    return Number(totalPct.toFixed(2));
}
//# sourceMappingURL=scoring.js.map