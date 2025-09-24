import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export function ContestPage() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard' | 'rules'>('overview')

  // Mock contest data
  const contest = {
    id,
    title: 'Monday Night Mayhem',
    description: 'Weekly contest featuring high-volatility tech stocks with special Monday Night Football bonus multipliers',
    prize: '$5,000',
    entries: '127/200',
    fee: '$25',
    status: 'open' as const,
    timeLeft: '2h 15m',
    startDate: 'Mon, Oct 14, 2024 6:00 PM EST',
    endDate: 'Fri, Oct 18, 2024 4:00 PM EST',
    difficulty: 'Beginner',
    rules: {
      maxPicks: 10,
      minPicks: 5,
      weightConstraint: '100% total allocation',
      scoringRule: 'Weighted returns with S&P 500 baseline'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="glass p-8 rounded-xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Link to="/contests" className="text-slate-400 hover:text-white transition-colors">
                  ← Back to Contests
                </Link>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{contest.title}</h1>
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">{contest.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatItem label="Prize Pool" value={contest.prize} color="text-football-gold" />
                <StatItem label="Entries" value={contest.entries} color="text-white" />
                <StatItem label="Entry Fee" value={contest.fee} color="text-white" />
                <StatItem label="Time Left" value={contest.timeLeft} color="text-red-400" />
              </div>
            </div>

            {/* Action Panel */}
            <div className="w-full lg:w-80">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold gradient-text mb-2">{contest.prize}</div>
                  <div className="text-slate-400">Total Prize Pool</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Entry Fee</span>
                    <span className="text-white font-semibold">{contest.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Starts</span>
                    <span className="text-white text-sm">{contest.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ends</span>
                    <span className="text-white text-sm">{contest.endDate}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to={`/contest/${id}/draft`}
                    className="block w-full bg-gradient-to-r from-football-gold to-yellow-500 text-slate-900 py-3 rounded-lg font-bold text-center hover:shadow-lg transition-all hover:scale-105"
                  >
                    🏆 Enter Contest
                  </Link>
                  <button className="w-full glass text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                    💾 Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="flex border-b border-slate-700">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </TabButton>
            <TabButton
              active={activeTab === 'leaderboard'}
              onClick={() => setActiveTab('leaderboard')}
            >
              🏆 Leaderboard
            </TabButton>
            <TabButton
              active={activeTab === 'rules'}
              onClick={() => setActiveTab('rules')}
            >
              📋 Rules
            </TabButton>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && <OverviewTab contest={contest} />}
            {activeTab === 'leaderboard' && <LeaderboardTab />}
            {activeTab === 'rules' && <RulesTab contest={contest} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  )
}

function TabButton({ active, onClick, children }: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-6 py-4 font-semibold transition-all ${
        active
          ? 'bg-football-gold text-slate-900'
          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
      }`}
    >
      {children}
    </button>
  )
}

function OverviewTab({ contest }: { contest: any }) {
  return (
    <div className="space-y-8">
      {/* Contest Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Contest Details</h3>
          <div className="space-y-4">
            <DetailRow label="Contest Type" value="Weekly Portfolio Challenge" />
            <DetailRow label="Market Focus" value="High-volatility Tech Stocks" />
            <DetailRow label="Difficulty" value={contest.difficulty} />
            <DetailRow label="Max Participants" value="200 players" />
            <DetailRow label="Entry Deadline" value="Monday 6:00 PM EST" />
            <DetailRow label="Settlement" value="Friday 4:00 PM EST" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Prize Structure</h3>
          <div className="space-y-3">
            <PrizeRow place="1st" prize="$2,000" percentage="40%" />
            <PrizeRow place="2nd" prize="$1,000" percentage="20%" />
            <PrizeRow place="3rd" prize="$500" percentage="10%" />
            <PrizeRow place="4th-10th" prize="$214 each" percentage="30%" />
          </div>
        </div>
      </div>

      {/* Participants Preview */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Recent Participants</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ParticipantCard name="TraderMike22" joinedAt="2 min ago" />
          <ParticipantCard name="StockSavvy" joinedAt="5 min ago" />
          <ParticipantCard name="BullRunBetty" joinedAt="8 min ago" />
          <ParticipantCard name="ChartChaser" joinedAt="12 min ago" />
        </div>
      </div>
    </div>
  )
}

function LeaderboardTab() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Current Leaderboard</h3>
      <div className="bg-slate-800/50 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <p className="text-slate-400 text-center">Contest hasn't started yet</p>
          <p className="text-slate-300 text-center text-sm mt-2">
            Leaderboard will be available once the contest begins
          </p>
        </div>
      </div>
    </div>
  )
}

function RulesTab({ contest }: { contest: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Game Rules</h3>
        <div className="space-y-4">
          <RuleItem
            title="Portfolio Construction"
            description={`Select ${contest.rules.minPicks}-${contest.rules.maxPicks} stocks with ${contest.rules.weightConstraint}`}
          />
          <RuleItem
            title="Scoring System"
            description={contest.rules.scoringRule}
          />
          <RuleItem
            title="Draft Period"
            description="From contest open until Monday 6:00 PM EST"
          />
          <RuleItem
            title="Lock Period"
            description="No changes allowed once contest starts"
          />
          <RuleItem
            title="Settlement"
            description="Final scores calculated at Friday market close"
          />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Bonus Multipliers</h3>
        <div className="space-y-3">
          <div className="glass p-4 rounded-lg">
            <div className="font-semibold text-football-gold mb-2">🏈 Monday Night Bonus</div>
            <div className="text-slate-300 text-sm">
              Stocks that gain {'>'} 5% on Monday get a 1.2x multiplier
            </div>
          </div>
          <div className="glass p-4 rounded-lg">
            <div className="font-semibold text-football-gold mb-2">🎯 Perfect Pick Bonus</div>
            <div className="text-slate-300 text-sm">
              Additional 10% bonus if all picks are profitable
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}

function PrizeRow({ place, prize, percentage }: { place: string; prize: string; percentage: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-700 last:border-b-0">
      <span className="text-slate-300">{place}</span>
      <div className="text-right">
        <div className="text-football-gold font-semibold">{prize}</div>
        <div className="text-slate-400 text-sm">{percentage}</div>
      </div>
    </div>
  )
}

function ParticipantCard({ name, joinedAt }: { name: string; joinedAt: string }) {
  return (
    <div className="glass p-4 rounded-lg">
      <div className="font-semibold text-white">{name}</div>
      <div className="text-slate-400 text-sm">{joinedAt}</div>
    </div>
  )
}

function RuleItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass p-4 rounded-lg">
      <div className="font-semibold text-white mb-2">{title}</div>
      <div className="text-slate-300 text-sm">{description}</div>
    </div>
  )
}