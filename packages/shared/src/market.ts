export interface MarketDataAdapter {
  getSnapshot(tickers: string[]): Promise<Record<string, { price: number; prevClose: number; change: number; changePct: number }>>;
  getOHLC(ticker: string, start: Date, end: Date, granularity: '1m' | '5m' | '1d'): Promise<Array<{ t: number; o: number; h: number; l: number; c: number; v: number }>>;
  getOpenPrice(ticker: string, ts: Date): Promise<number>;
  streamQuotes?(tickers: string[], onQuote: (q: { ticker: string; price: number; ts: number }) => void): { close(): void };
}

// Placeholder Finnhub implementation (uses fetch; fill with real endpoints & API key usage)
export function createFinnhubAdapter(apiKey?: string): MarketDataAdapter {
  const base = 'https://finnhub.io/api/v1';
  const auth = apiKey ? `&token=${apiKey}` : '';
  return {
    async getSnapshot(tickers) {
      const out: Record<string, { price: number; prevClose: number; change: number; changePct: number }> = {};
      for (const t of tickers) {
        // Demo placeholder values
        out[t] = { price: 100, prevClose: 99, change: 1, changePct: 1.01 };
      }
      return out;
    },
    async getOHLC(ticker, start, end, granularity) {
      void base; void auth; void ticker; void start; void end; void granularity;
      return [];
    },
    async getOpenPrice(ticker, ts) {
      void ticker; void ts; return 100;
    },
    streamQuotes(tickers, onQuote) {
      const interval = setInterval(() => {
        for (const t of tickers) onQuote({ ticker: t, price: 100 + Math.random(), ts: Date.now() });
      }, 5000);
      return { close: () => clearInterval(interval) };
    }
  };
}