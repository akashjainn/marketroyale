import { useState } from 'react'

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview')

  const userStats = {
    username: 'TradingChamp',
    joinDate: 'March 2024',
    totalEarnings: '$3,247',
    contestsWon: 12,
    contestsPlayed: 47,
    winRate: 25.5,
    avgReturn: 8.3,
    bestFinish: 1,
    currentStreak: 3
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="glass p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-football-gold to-yellow-500 rounded-full flex items-center justify-center text-4xl font-bold text-slate-900">
              TC
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{userStats.username}</h1>
              <p className="text-slate-400 mb-4">Member since {userStats.joinDate}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBadge label="Total Earnings" value={userStats.totalEarnings} color="text-football-gold" />
                <StatBadge label="Contests Won" value={userStats.contestsWon.toString()} color="text-green-400" />
                <StatBadge label="Win Rate" value={`${userStats.winRate}%`} color="text-blue-400" />
                <StatBadge label="Current Streak" value={userStats.currentStreak.toString()} color="text-purple-400" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="bg-gradient-to-r from-football-gold to-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                Edit Profile
              </button>
              <button className="glass text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                Share Profile
              </button>
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
              active={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
            >
              📈 Contest History
            </TabButton>
            <TabButton
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </TabButton>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && <OverviewTab stats={userStats} />}
            {activeTab === 'history' && <HistoryTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBadge({ label, value, color }: { label: string; value: string; color: string }) {
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

function OverviewTab({ stats }: { stats: any }) {
  return (
    <div className="space-y-8">
      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Performance Overview</h3>
          <div className="space-y-4">
            <PerformanceRow label="Contests Played" value={stats.contestsPlayed} />
            <PerformanceRow label="Contests Won" value={stats.contestsWon} />
            <PerformanceRow label="Win Rate" value={`${stats.winRate}%`} />
            <PerformanceRow label="Average Return" value={`${stats.avgReturn}%`} />
            <PerformanceRow label="Best Finish" value={`#${stats.bestFinish}`} />
            <PerformanceRow label="Current Streak" value={stats.currentStreak} />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-3">
            <ActivityItem
              contest="Monday Night Mayhem"
              result="2nd Place"
              earnings="+$500"
              date="2 days ago"
              resultColor="text-green-400"
            />
            <ActivityItem
              contest="Weekend Warrior"
              result="15th Place"
              earnings="+$25"
              date="5 days ago"
              resultColor="text-green-400"
            />
            <ActivityItem
              contest="Friday Night Special"
              result="45th Place"
              earnings="$0"
              date="1 week ago"
              resultColor="text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">🏆 Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Achievement
            icon="🥇"
            title="First Victory"
            description="Win your first contest"
            earned={true}
          />
          <Achievement
            icon="🔥"
            title="Hot Streak"
            description="Win 3 contests in a row"
            earned={true}
          />
          <Achievement
            icon="💰"
            title="Big Winner"
            description="Earn $1000+ in a single contest"
            earned={true}
          />
          <Achievement
            icon="📈"
            title="Consistent Trader"
            description="Finish top 10 in 5 contests"
            earned={false}
          />
          <Achievement
            icon="🎯"
            title="Perfect Portfolio"
            description="Have all picks profitable"
            earned={false}
          />
          <Achievement
            icon="⚡"
            title="Speed Demon"
            description="Submit portfolio in under 5 minutes"
            earned={false}
          />
        </div>
      </div>
    </div>
  )
}

function HistoryTab() {
  const contestHistory = [
    { id: 1, name: 'Monday Night Mayhem', date: '2024-10-14', rank: 2, earnings: '$500', participants: 200 },
    { id: 2, name: 'Weekend Warrior', date: '2024-10-10', rank: 15, earnings: '$25', participants: 150 },
    { id: 3, name: 'Friday Night Special', date: '2024-10-04', rank: 45, earnings: '$0', participants: 120 },
    { id: 4, name: 'Tech Tuesday', date: '2024-09-30', rank: 1, earnings: '$1200', participants: 180 },
    { id: 5, name: 'Crypto Crusher', date: '2024-09-25', rank: 8, earnings: '$100', participants: 100 },
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Contest History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 text-slate-400">Contest</th>
              <th className="text-left py-3 text-slate-400">Date</th>
              <th className="text-left py-3 text-slate-400">Rank</th>
              <th className="text-left py-3 text-slate-400">Earnings</th>
              <th className="text-left py-3 text-slate-400">Participants</th>
            </tr>
          </thead>
          <tbody>
            {contestHistory.map((contest) => (
              <tr key={contest.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                <td className="py-4 text-white font-semibold">{contest.name}</td>
                <td className="py-4 text-slate-300">{contest.date}</td>
                <td className="py-4">
                  <span className={`font-semibold ${contest.rank <= 3 ? 'text-football-gold' : 'text-slate-300'}`}>
                    #{contest.rank}
                  </span>
                </td>
                <td className="py-4">
                  <span className={contest.earnings === '$0' ? 'text-slate-400' : 'text-green-400'}>
                    {contest.earnings}
                  </span>
                </td>
                <td className="py-4 text-slate-300">{contest.participants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Account Settings</h3>
        <div className="space-y-6">
          <SettingItem
            label="Email Notifications"
            description="Receive updates about contests and results"
            type="toggle"
            defaultValue={true}
          />
          <SettingItem
            label="SMS Notifications"
            description="Get text alerts for contest deadlines"
            type="toggle"
            defaultValue={false}
          />
          <SettingItem
            label="Privacy"
            description="Show your profile on leaderboards"
            type="toggle"
            defaultValue={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Trading Preferences</h3>
        <div className="space-y-6">
          <SettingItem
            label="Default Portfolio Size"
            description="Preferred number of stocks to pick"
            type="select"
            options={['5', '7', '10']}
            defaultValue="7"
          />
          <SettingItem
            label="Risk Tolerance"
            description="Automatic portfolio suggestions"
            type="select"
            options={['Conservative', 'Moderate', 'Aggressive']}
            defaultValue="Moderate"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-700">
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  )
}

function PerformanceRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  )
}

function ActivityItem({ contest, result, earnings, date, resultColor }: {
  contest: string
  result: string
  earnings: string
  date: string
  resultColor: string
}) {
  return (
    <div className="glass p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-white">{contest}</div>
          <div className={`text-sm ${resultColor}`}>{result}</div>
        </div>
        <div className="text-right">
          <div className="text-slate-300">{earnings}</div>
          <div className="text-slate-400 text-sm">{date}</div>
        </div>
      </div>
    </div>
  )
}

function Achievement({ icon, title, description, earned }: {
  icon: string
  title: string
  description: string
  earned: boolean
}) {
  return (
    <div className={`p-4 rounded-lg border-2 ${
      earned 
        ? 'bg-slate-800/50 border-football-gold/30' 
        : 'bg-slate-800/20 border-slate-700 opacity-50'
    }`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-semibold text-white mb-1">{title}</div>
      <div className="text-slate-400 text-sm">{description}</div>
      {earned && (
        <div className="text-football-gold text-xs font-semibold mt-2">EARNED</div>
      )}
    </div>
  )
}

function SettingItem({ label, description, type, defaultValue, options }: {
  label: string
  description: string
  type: 'toggle' | 'select'
  defaultValue?: any
  options?: string[]
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="font-semibold text-white">{label}</div>
        <div className="text-slate-400 text-sm">{description}</div>
      </div>
      <div>
        {type === 'toggle' ? (
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={defaultValue} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-football-gold"></div>
          </label>
        ) : (
          <select
            defaultValue={defaultValue}
            className="bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-football-gold"
          >
            {options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}