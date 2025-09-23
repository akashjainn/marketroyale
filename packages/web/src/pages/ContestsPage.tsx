import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ContestsPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'live' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'prize' | 'entries' | 'time'>('prize')

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Contests</h1>
          <p className="text-xl text-slate-400">Choose your battlefield</p>
        </div>

        {/* Filters */}
        <div className="glass p-6 rounded-xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={filter === 'all'}
                onClick={() => setFilter('all')}
              >
                All Contests
              </FilterButton>
              <FilterButton
                active={filter === 'open'}
                onClick={() => setFilter('open')}
              >
                🟢 Open
              </FilterButton>
              <FilterButton
                active={filter === 'live'}
                onClick={() => setFilter('live')}
              >
                🔴 Live
              </FilterButton>
              <FilterButton
                active={filter === 'completed'}
                onClick={() => setFilter('completed')}
              >
                ✅ Completed
              </FilterButton>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-football-gold"
              >
                <option value="prize">Prize Pool</option>
                <option value="entries">Entries</option>
                <option value="time">Time Left</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contest Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <ContestCard
            id="1"
            title="Monday Night Mayhem"
            description="Weekly contest featuring high-volatility tech stocks"
            prize="$5,000"
            entries="127/200"
            fee="$25"
            status="open"
            timeLeft="2h 15m"
            difficulty="Beginner"
            tags={['Weekly', 'Tech Focus']}
          />
          <ContestCard
            id="2"
            title="Crypto Crusher"
            description="Daily crypto portfolio challenge"
            prize="$1,500"
            entries="45/100"
            fee="$10"
            status="open"
            timeLeft="6h 45m"
            difficulty="Intermediate"
            tags={['Daily', 'Crypto']}
          />
          <ContestCard
            id="3"
            title="Sunday Showdown"
            description="Premium weekly contest with S&P 500 focus"
            prize="$10,000"
            entries="245/300"
            fee="$50"
            status="filling-fast"
            timeLeft="3d 8h"
            difficulty="Advanced"
            tags={['Weekly', 'Premium', 'S&P 500']}
          />
          <ContestCard
            id="4"
            title="Penny Stock Playoffs"
            description="High-risk, high-reward small cap challenge"
            prize="$2,500"
            entries="89/150"
            fee="$15"
            status="open"
            timeLeft="1d 12h"
            difficulty="Expert"
            tags={['Small Cap', 'High Risk']}
          />
          <ContestCard
            id="5"
            title="Blue Chip Battle"
            description="Conservative strategy with dividend stocks"
            prize="$3,000"
            entries="156/200"
            fee="$20"
            status="live"
            timeLeft="Running"
            difficulty="Beginner"
            tags={['Conservative', 'Dividends']}
          />
          <ContestCard
            id="6"
            title="Friday Night Futures"
            description="Options and futures trading contest"
            prize="$7,500"
            entries="78/120"
            fee="$35"
            status="open"
            timeLeft="2d 18h"
            difficulty="Expert"
            tags={['Options', 'Futures']}
          />
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="glass text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
            Load More Contests
          </button>
        </div>
      </div>
    </div>
  )
}

function FilterButton({ active, onClick, children }: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        active
          ? 'bg-football-gold text-slate-900 shadow-lg'
          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
      }`}
    >
      {children}
    </button>
  )
}

function ContestCard({ id, title, description, prize, entries, fee, status, timeLeft, difficulty, tags }: {
  id: string
  title: string
  description: string
  prize: string
  entries: string
  fee: string
  status: 'open' | 'filling-fast' | 'live' | 'completed'
  timeLeft: string
  difficulty: string
  tags: string[]
}) {
  const statusConfig = {
    open: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: '🟢 Open' },
    'filling-fast': { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', label: '🔥 Filling Fast' },
    live: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: '🔴 Live' },
    completed: { color: 'bg-slate-500/20 text-slate-400 border-slate-500/30', label: '✅ Completed' }
  }

  const difficultyColors = {
    'Beginner': 'text-green-400',
    'Intermediate': 'text-yellow-400',
    'Advanced': 'text-orange-400',
    'Expert': 'text-red-400'
  }

  return (
    <div className="glass p-6 rounded-xl hover:scale-105 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${statusConfig[status].color}`}>
          {statusConfig[status].label}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-slate-400">Prize Pool</span>
          <span className="text-football-gold font-bold">{prize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Entries</span>
          <span className="text-white">{entries}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Entry Fee</span>
          <span className="text-white">{fee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Difficulty</span>
          <span className={`font-semibold ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}>
            {difficulty}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Time Left</span>
          <span className="text-white font-mono text-sm">{timeLeft}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Entries</span>
          <span>{entries}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-football-gold to-yellow-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(parseInt(entries.split('/')[0]) / parseInt(entries.split('/')[1])) * 100}%` }}
          />
        </div>
      </div>

      {/* Action Button */}
      <Link
        to={`/contest/${id}`}
        className={`block w-full text-center py-3 rounded-lg font-bold transition-all hover:scale-105 ${
          status === 'live' || status === 'completed'
            ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-football-gold to-yellow-500 text-slate-900 hover:shadow-lg'
        }`}
      >
        {status === 'live' ? 'View Live' : status === 'completed' ? 'View Results' : 'Enter Contest'}
      </Link>
    </div>
  )
}