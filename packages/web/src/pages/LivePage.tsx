import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function LivePage() {
  const { id } = useParams<{ id: string }>()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock live data
  const contest = {
    title: 'Monday Night Mayhem',
    status: 'live',
    timeLeft: '2d 14h 23m',
    totalPrize: '$5,000',
    participants: 189
  }

  const leaderboard = [
    { rank: 1, username: 'StockSavant', score: 12.45, change: '+2.1%', portfolio: ['AAPL', 'TSLA', 'MSFT'] },
    { rank: 2, username: 'BullRider99', score: 11.23, change: '+1.8%', portfolio: ['GOOGL', 'AMZN', 'NVDA'] },
    { rank: 3, username: 'MarketMaster', score: 9.87, change: '+1.2%', portfolio: ['META', 'NFLX', 'AAPL'] },
    { rank: 4, username: 'TradingTitan', score: 8.65, change: '+0.9%', portfolio: ['TSLA', 'AMD', 'PYPL'] },
    { rank: 5, username: 'ChartChampion', score: 7.42, change: '+0.7%', portfolio: ['MSFT', 'GOOGL', 'AAPL'] },
  ]

  const myPosition = {
    rank: 23,
    score: 4.12,
    change: '+0.3%',
    username: 'YourUsername'
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="glass p-8 rounded-xl mb-8 scoreboard-glow">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold gradient-text mb-2">{contest.title}</h1>
            <div className="flex justify-center items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-red-400 font-semibold">LIVE</span>
              </div>
              <div className="text-slate-300">
                Ends in <span className="text-football-gold font-mono">{contest.timeLeft}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <LiveStat label="Total Prize" value={contest.totalPrize} color="text-football-gold" />
            <LiveStat label="Participants" value={contest.participants.toString()} color="text-blue-400" />
            <LiveStat label="Market Status" value="Open" color="text-green-400" />
            <LiveStat label="Updated" value={currentTime.toLocaleTimeString()} color="text-slate-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="glass p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">🏆 Live Leaderboard</h2>
                <button className="text-football-gold hover:text-yellow-400 transition-colors">
                  View All →
                </button>
              </div>

              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <LeaderboardRow key={player.rank} player={player} />
                ))}
              </div>

              {/* Your Position */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="bg-slate-800/50 p-4 rounded-lg border-2 border-football-gold/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-football-gold text-slate-900 rounded-full flex items-center justify-center font-bold text-sm">
                        {myPosition.rank}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{myPosition.username}</div>
                        <div className="text-slate-400 text-sm">Your Position</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{myPosition.score}%</div>
                      <div className="text-green-400 text-sm">{myPosition.change}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Market Pulse */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">📊 Market Pulse</h3>
              <div className="space-y-4">
                <MarketIndicator label="S&P 500" value="+0.45%" trend="up" />
                <MarketIndicator label="NASDAQ" value="+1.23%" trend="up" />
                <MarketIndicator label="DOW" value="-0.12%" trend="down" />
                <MarketIndicator label="VIX" value="18.45" trend="down" />
              </div>
            </div>

            {/* Top Movers */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">🚀 Top Movers</h3>
              <div className="space-y-3">
                <MoverCard ticker="TSLA" change="+5.67%" />
                <MoverCard ticker="NVDA" change="+4.23%" />
                <MoverCard ticker="AMD" change="+3.89%" />
                <MoverCard ticker="AAPL" change="-2.14%" />
              </div>
            </div>

            {/* Contest Chat */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">💬 Contest Chat</h3>
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                <ChatMessage user="StockSavant" message="TSLA looking strong today! 🚀" time="2m" />
                <ChatMessage user="BullRider99" message="My NVDA pick is paying off" time="5m" />
                <ChatMessage user="MarketMaster" message="Anyone else watching AAPL?" time="8m" />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-700 text-white rounded-lg px-3 py-2 text-sm border border-slate-600 focus:outline-none focus:ring-2 focus:ring-football-gold"
                />
                <button className="bg-football-gold text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LiveStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-slate-400">{label}</div>
    </div>
  )
}

function LeaderboardRow({ player }: { player: any }) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-slate-900'
    if (rank === 2) return 'bg-slate-300 text-slate-900'
    if (rank === 3) return 'bg-orange-400 text-slate-900'
    return 'bg-slate-700 text-slate-300'
  }

  return (
    <div className="bg-slate-800/50 p-4 rounded-lg hover:bg-slate-800/70 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankStyle(player.rank)}`}>
            {player.rank}
          </div>
          <div>
            <div className="font-semibold text-white">{player.username}</div>
            <div className="text-slate-400 text-sm">
              {player.portfolio.slice(0, 3).join(', ')}
              {player.portfolio.length > 3 && ' +more'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">{player.score}%</div>
          <div className="text-green-400 text-sm">{player.change}</div>
        </div>
      </div>
    </div>
  )
}

function MarketIndicator({ label, value, trend }: {
  label: string
  value: string
  trend: 'up' | 'down'
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400">{label}</span>
      <div className="flex items-center gap-1">
        <span className={`font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {value}
        </span>
        <span className={trend === 'up' ? 'text-green-400' : 'text-red-400'}>
          {trend === 'up' ? '↗' : '↘'}
        </span>
      </div>
    </div>
  )
}

function MoverCard({ ticker, change }: { ticker: string; change: string }) {
  const isPositive = change.startsWith('+')
  return (
    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
      <span className="font-semibold text-white">{ticker}</span>
      <span className={`font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
  )
}

function ChatMessage({ user, message, time }: {
  user: string
  message: string
  time: string
}) {
  return (
    <div className="text-sm">
      <div className="flex justify-between items-start mb-1">
        <span className="font-semibold text-football-gold">{user}</span>
        <span className="text-slate-500 text-xs">{time}</span>
      </div>
      <div className="text-slate-300">{message}</div>
    </div>
  )
}