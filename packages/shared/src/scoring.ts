export function computeScore(picks: string[], openMap: Record<string, number>, lastMap: Record<string, number>) {
  let totalPct = 0;
  for (const s of picks) {
    const open = openMap[s];
    const last = lastMap[s];
    if (!open || !last) continue;
    totalPct += ((last - open) / open) * 100;
  }
  return Number(totalPct.toFixed(2));
}
