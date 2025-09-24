export interface MarketDataAdapter {
    getSnapshot(tickers: string[]): Promise<Record<string, {
        price: number;
        prevClose: number;
        change: number;
        changePct: number;
    }>>;
    getOHLC(ticker: string, start: Date, end: Date, granularity: '1m' | '5m' | '1d'): Promise<Array<{
        t: number;
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
    }>>;
    getOpenPrice(ticker: string, ts: Date): Promise<number>;
    streamQuotes?(tickers: string[], onQuote: (q: {
        ticker: string;
        price: number;
        ts: number;
    }) => void): {
        close(): void;
    };
}
export declare function createFinnhubAdapter(apiKey?: string): MarketDataAdapter;
//# sourceMappingURL=market.d.ts.map