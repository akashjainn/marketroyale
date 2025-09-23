import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export function DraftRoomPage() {
  const { id } = useParams<{ id: string }>()
  const [selectedStocks, setSelectedStocks] = useState<Array<{ ticker: string; weight: number }>>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [totalWeight, setTotalWeight] = useState(0)

  const addStock = (ticker: string) => {
    if (selectedStocks.length >= 10) return
    if (selectedStocks.find(s => s.ticker === ticker)) return
    
    const newStock = { ticker, weight: 0 }
    setSelectedStocks([...selectedStocks, newStock])
  }

  const updateWeight = (ticker: string, weight: number) => {
    const updated = selectedStocks.map(stock => 
      stock.ticker === ticker ? { ...stock, weight } : stock
    )
    setSelectedStocks(updated)
    setTotalWeight(updated.reduce((sum, stock) => sum + stock.weight, 0))
  }

  const removeStock = (ticker: string) => {
    const updated = selectedStocks.filter(stock => stock.ticker !== ticker)
    setSelectedStocks(updated)
    setTotalWeight(updated.reduce((sum, stock) => sum + stock.weight, 0))
  }

  const canSubmit = selectedStocks.length >= 5 && Math.abs(totalWeight - 100) < 0.01

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="glass p-6 rounded-xl mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link to={`/contest/${id}`} className="text-slate-400 hover:text-white transition-colors">
              ← Back to Contest
            </Link>
            <div className="text-right">
              <div className="text-football-gold font-bold">Time Left: 1h 45m</div>
              <div className="text-slate-400 text-sm">Draft closes at 6:00 PM EST</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Draft Room</h1>
          <p className="text-xl text-slate-300">Build your winning portfolio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock Search & Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Stock Search</h2>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search stocks (e.g., AAPL, TSLA, MSFT)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 pl-10 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-football-gold"
                />
                <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
              </div>
              
              {/* Popular Stocks */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Popular Picks</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'NFLX'].map(ticker => (
                    <StockCard
                      key={ticker}
                      ticker={ticker}
                      price={Math.floor(Math.random() * 500) + 50}
                      change={Math.random() * 10 - 5}
                      onAdd={() => addStock(ticker)}
                      disabled={selectedStocks.find(s => s.ticker === ticker) !== undefined || selectedStocks.length >= 10}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio Rules */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">📋 Portfolio Rules</h3>
              <div className="space-y-3">
                <RuleCheck
                  label="Select 5-10 stocks"
                  satisfied={selectedStocks.length >= 5 && selectedStocks.length <= 10}
                  current={`${selectedStocks.length}/10 selected`}
                />
                <RuleCheck
                  label="Total weight must equal 100%"
                  satisfied={Math.abs(totalWeight - 100) < 0.01}
                  current={`${totalWeight.toFixed(1)}%`}
                />
                <RuleCheck
                  label="Minimum 5% per stock"
                  satisfied={selectedStocks.every(s => s.weight >= 5 || s.weight === 0)}
                  current="Weight allocation"
                />
              </div>
            </div>
          </div>

          {/* Portfolio Builder */}
          <div className="space-y-6">
            {/* Current Portfolio */}
            <div className="glass p-6 rounded-xl sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Your Portfolio</h2>
                <div className={`text-2xl font-bold ${totalWeight === 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {totalWeight.toFixed(1)}%
                </div>
              </div>

              {selectedStocks.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <div className="text-4xl mb-2">📊</div>
                  <p>Start building your portfolio</p>
                  <p className="text-sm">Select stocks from the search area</p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {selectedStocks.map(stock => (
                    <PortfolioItem
                      key={stock.ticker}
                      ticker={stock.ticker}
                      weight={stock.weight}
                      onWeightChange={(weight) => updateWeight(stock.ticker, weight)}
                      onRemove={() => removeStock(stock.ticker)}
                    />
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                disabled={!canSubmit}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  canSubmit
                    ? 'bg-gradient-to-r from-football-gold to-yellow-500 text-slate-900 hover:shadow-xl hover:scale-105'
                    : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }`}
              >
                {canSubmit ? '🏆 Submit Portfolio' : '⚠️ Complete Portfolio'}
              </button>

              {!canSubmit && (
                <div className="mt-3 text-center text-slate-400 text-sm">
                  {selectedStocks.length < 5 && `Need ${5 - selectedStocks.length} more stocks`}
                  {selectedStocks.length >= 5 && Math.abs(totalWeight - 100) >= 0.01 && 
                    `Adjust weights to total 100% (currently ${totalWeight.toFixed(1)}%)`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StockCard({ ticker, price, change, onAdd, disabled }: {
  ticker: string
  price: number
  change: number
  onAdd: () => void
  disabled: boolean
}) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold text-white">{ticker}</div>
          <div className="text-slate-300">${price.toFixed(2)}</div>
        </div>
        <div className={`text-sm font-semibold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </div>
      </div>
      <button
        onClick={onAdd}
        disabled={disabled}
        className={`w-full py-2 rounded text-sm font-semibold transition-all ${
          disabled
            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
            : 'bg-football-gold text-slate-900 hover:bg-yellow-400'
        }`}
      >
        {disabled ? 'Added' : 'Add to Portfolio'}
      </button>
    </div>
  )
}

function PortfolioItem({ ticker, weight, onWeightChange, onRemove }: {
  ticker: string
  weight: number
  onWeightChange: (weight: number) => void
  onRemove: () => void
}) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
      <div className="flex justify-between items-center mb-3">
        <div className="font-bold text-white">{ticker}</div>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Weight</span>
          <span className="text-white">{weight.toFixed(1)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="0.1"
          value={weight}
          onChange={(e) => onWeightChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>0%</span>
          <span>50%</span>
        </div>
      </div>
    </div>
  )
}

function RuleCheck({ label, satisfied, current }: {
  label: string
  satisfied: boolean
  current: string
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className={satisfied ? 'text-green-400' : 'text-yellow-400'}>
          {satisfied ? '✅' : '⚠️'}
        </span>
        <span className="text-slate-300">{label}</span>
      </div>
      <span className={`text-sm ${satisfied ? 'text-green-400' : 'text-slate-400'}`}>
        {current}
      </span>
    </div>
  )
}