import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="field-pattern absolute inset-0 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center slide-in-field">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Market</span>{' '}
              <span className="text-white">Royale</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Where Wall Street meets the gridiron. Build your ultimate trading portfolio and compete in weekly fantasy contests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contests"
                className="bg-gradient-to-r from-football-gold to-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 touchdown-animation"
              >
                🏆 Join a Contest
              </Link>
              <button className="glass text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                📊 How it Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard
              icon="🏈"
              value="$125K+"
              label="Total Prizes Won"
              color="text-green-400"
            />
            <StatCard
              icon="👥"
              value="2,847"
              label="Active Players"
              color="text-blue-400"
            />
            <StatCard
              icon="📈"
              value="342"
              label="Contests This Week"
              color="text-football-gold"
            />
            <StatCard
              icon="⚡"
              value="24/7"
              label="Live Trading"
              color="text-purple-400"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Simple, fun, and competitive trading contests
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              step="1"
              title="Join a Contest"
              description="Choose from daily, weekly, or special event contests with various entry fees and prize pools."
              icon="🎯"
            />
            <StepCard
              step="2"
              title="Build Portfolio"
              description="Draft your picks from thousands of stocks with strategic weight allocation to maximize returns."
              icon="📊"
            />
            <StepCard
              step="3"
              title="Watch & Win"
              description="Track real-time performance on the leaderboard and watch your portfolio compete for prizes."
              icon="🏆"
            />
          </div>
        </div>
      </section>

      {/* Featured Contests */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Featured Contests</h2>
              <p className="text-xl text-slate-400">Jump into the action</p>
            </div>
            <Link
              to="/contests"
              className="text-football-gold hover:text-yellow-400 font-semibold transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContestCard
              title="Monday Night Madness"
              prize="$5,000"
              entries="127/200"
              fee="$25"
              status="open"
              timeLeft="2h 15m"
            />
            <ContestCard
              title="Weekly Warrior"
              prize="$2,500"
              entries="89/150"
              fee="$15"
              status="open"
              timeLeft="1d 4h"
            />
            <ContestCard
              title="Sunday Showdown"
              prize="$10,000"
              entries="245/300"
              fee="$50"
              status="filling-fast"
              timeLeft="3d 8h"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function StatCard({ icon, value, label, color }: {
  icon: string
  value: string
  label: string
  color: string
}) {
  return (
    <div className="glass p-6 rounded-xl text-center hover:scale-105 transition-transform">
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-slate-400">{label}</div>
    </div>
  )
}

function StepCard({ step, title, description, icon }: {
  step: string
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-football-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 text-football-gold rounded-full flex items-center justify-center font-bold text-sm">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

function ContestCard({ title, prize, entries, fee, status, timeLeft }: {
  title: string
  prize: string
  entries: string
  fee: string
  status: 'open' | 'filling-fast' | 'locked'
  timeLeft: string
}) {
  const statusColors = {
    open: 'bg-green-500/20 text-green-400 border-green-500/30',
    'filling-fast': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    locked: 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  return (
    <div className="glass p-6 rounded-xl hover:scale-105 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}>
          {status.replace('-', ' ')}
        </span>
      </div>
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
          <span className="text-slate-400">Time Left</span>
          <span className="text-white">{timeLeft}</span>
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-football-gold to-yellow-500 text-slate-900 py-3 rounded-lg font-bold hover:shadow-lg transition-all hover:scale-105">
        Enter Contest
      </button>
    </div>
  )
}