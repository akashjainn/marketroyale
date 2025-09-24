import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Stadium lights effect */}
      <div className="fixed inset-0 stadium-lights pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-10 glass border-b border-football-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-football-gold to-yellow-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-slate-900 font-bold text-xl">🏈</span>
              </div>
              <div>
                <h1 className="gradient-text font-bold text-xl">Market Royale</h1>
                <p className="text-slate-400 text-xs">Fantasy Trading League</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" active={isActive('/')} exact>
                Home
              </NavLink>
              <NavLink to="/contests" active={isActive('/contests')}>
                Contests
              </NavLink>
              <NavLink to="/live" active={isActive('/live')}>
                Live
              </NavLink>
              <NavLink to="/profile" active={isActive('/profile')}>
                Profile
              </NavLink>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="glass px-3 py-1.5 rounded-lg">
                  <span className="text-football-gold font-semibold">$1,250</span>
                  <span className="text-slate-400 text-sm ml-1">Balance</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-football-gold to-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
                Join Contest
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-football-gold to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 font-bold">🏈</span>
                </div>
                <h3 className="gradient-text font-bold text-lg">Market Royale</h3>
              </div>
              <p className="text-slate-400 max-w-md">
                Where Wall Street meets the gridiron. Build your ultimate trading portfolio and compete against friends in weekly contests.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Game</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/contests" className="hover:text-football-gold transition-colors">Browse Contests</Link></li>
                <li><Link to="/live" className="hover:text-football-gold transition-colors">Live Scores</Link></li>
                <li><a href="#" className="hover:text-football-gold transition-colors">How to Play</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-football-gold transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-football-gold transition-colors">Rules</a></li>
                <li><a href="#" className="hover:text-football-gold transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Market Royale. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface NavLinkProps {
  to: string
  active: boolean
  exact?: boolean
  children: ReactNode
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
        active
          ? 'bg-football-gold text-slate-900 shadow-lg'
          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
      }`}
    >
      {children}
    </Link>
  )
}