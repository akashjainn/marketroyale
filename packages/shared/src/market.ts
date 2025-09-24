export interface MarketDataAdapter {
  getSnapshot(tickers: string[]): Promise<Record<string, { price: number; prevClose: number; change: number; changePct: number }>>;
  getOHLC(ticker: string, start: Date, end: Date, granularity: '1m' | '5m' | '1d'): Promise<Array<{ t: number; o: number; h: number; l: number; c: number; v: number }>>;
  getOpenPrice(ticker: string, ts: Date): Promise<number>;
  streamQuotes?(tickers: string[], onQuote: (q: { ticker: string; price: number; ts: number }) => void): { close(): void };
}

interface SnapshotCacheEntry {
  data: Record<string, { price: number; prevClose: number; change: number; changePct: number }>;
  expires: number;
}

// Finnhub REST adapter implementation
// Docs: https://finnhub.io/docs/api
export function createFinnhubAdapter(apiKey?: string): MarketDataAdapter {
  const base = 'https://finnhub.io/api/v1';
  const tokenParam = apiKey ? `token=${apiKey}` : '';
  const snapshotTTL = 5000; // 5s cache window to avoid rate limits
  const snapshotCache = new Map<string, SnapshotCacheEntry>();

  function upper(sym: string) { return sym.trim().toUpperCase(); }
  function cacheKey(tickers: string[]) { return tickers.sort().join(','); }

  async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.json() as Promise<T>;
  }

  async function getQuote(ticker: string) {
    const q = await fetchJSON<any>(`${base}/quote?symbol=${encodeURIComponent(ticker)}&${tokenParam}`);
    // Finnhub quote fields: c=current, pc=previous close, d=change, dp=percent change
    if (q && typeof q.c === 'number') {
      return {
        price: q.c,
  prevClose: (q.pc ?? (typeof q.c === 'number' && typeof q.d === 'number' ? q.c - q.d : 0)),
        change: q.d ?? (q.c - (q.pc ?? q.c)),
        changePct: q.dp ?? (q.pc ? ((q.c - q.pc) / q.pc) * 100 : 0)
      };
    }
    return { price: 0, prevClose: 0, change: 0, changePct: 0 };
  }

  async function getSnapshot(tickers: string[]) {
    const cleaned = tickers.map(upper).filter(Boolean);
    const key = cacheKey(cleaned);
    const now = Date.now();
    const cached = snapshotCache.get(key);
    if (cached && cached.expires > now) return cached.data;
    const out: Record<string, { price: number; prevClose: number; change: number; changePct: number }> = {};
    // Sequential to keep it simple; could parallelize with Promise.all but risk hitting rate limits.
    for (const t of cleaned) {
      try { out[t] = await getQuote(t); } catch { /* ignore individual failures */ }
    }
    snapshotCache.set(key, { data: out, expires: now + snapshotTTL });
    return out;
  }

  function resolution(granularity: '1m'|'5m'|'1d') {
    if (granularity === '1m') return '1';
    if (granularity === '5m') return '5';
    return 'D';
  }

  async function getOHLC(ticker: string, start: Date, end: Date, granularity: '1m'|'5m'|'1d') {
    const from = Math.floor(start.getTime() / 1000);
    const to = Math.floor(end.getTime() / 1000);
    const url = `${base}/stock/candle?symbol=${encodeURIComponent(upper(ticker))}&resolution=${resolution(granularity)}&from=${from}&to=${to}&${tokenParam}`;
    const data = await fetchJSON<any>(url);
    if (data.s !== 'ok') return [];
    const out: Array<{ t:number;o:number;h:number;l:number;c:number;v:number }> = [];
    for (let i = 0; i < data.t.length; i++) {
      out.push({ t: data.t[i]*1000, o: data.o[i], h: data.h[i], l: data.l[i], c: data.c[i], v: data.v[i] });
    }
    return out;
  }

  async function getOpenPrice(ticker: string, ts: Date) {
    // Strategy: if ts is today (UTC), use quote.o (open). Otherwise fetch daily candle for that day.
    const dayStart = new Date(Date.UTC(ts.getUTCFullYear(), ts.getUTCMonth(), ts.getUTCDate(), 0,0,0));
    const dayEnd = new Date(dayStart.getTime() + 24*3600*1000 - 1);
    const candles = await getOHLC(ticker, dayStart, dayEnd, '1d');
    if (candles.length) return candles[0].o;
    // fallback to current quote open if same day
    if (new Date().toDateString() === ts.toDateString()) {
      const q = await getQuote(upper(ticker));
      return q.prevClose ? q.prevClose + q.change : q.price; // best effort
    }
    return 0;
  }

  function streamQuotes(tickers: string[], onQuote: (q: { ticker: string; price: number; ts: number }) => void) {
    if (!apiKey || typeof WebSocket === 'undefined') {
      // Fallback interval polling using snapshot
      let active = true;
      (async function poll() {
        while (active) {
          try {
            const snap = await getSnapshot(tickers);
            const ts = Date.now();
            Object.entries(snap).forEach(([sym, v]) => onQuote({ ticker: sym, price: v.price, ts }));
          } catch {/* ignore */}
          await new Promise(r => setTimeout(r, 5000));
        }
      })();
      return { close: () => { active = false; } };
    }
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
    ws.addEventListener('open', () => {
      tickers.forEach(t => ws.send(JSON.stringify({ type: 'subscribe', symbol: upper(t) })));
    });
    ws.addEventListener('message', ev => {
      try {
        const msg = JSON.parse(ev.data as string);
        if (msg.data) {
          for (const d of msg.data) {
            if (typeof d.p === 'number' && d.s) onQuote({ ticker: d.s, price: d.p, ts: d.t });
          }
        }
      } catch {/* ignore parse */}
    });
    return { close: () => ws.close() };
  }

  return { getSnapshot, getOHLC, getOpenPrice, streamQuotes };
}