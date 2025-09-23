import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ContestsPage } from './pages/ContestsPage'
import { ContestPage } from './pages/ContestPage'
import { LivePage } from './pages/LivePage'
import { ProfilePage } from './pages/ProfilePage'
import { DraftRoomPage } from './pages/DraftRoomPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contests" element={<ContestsPage />} />
        <Route path="/contest/:id" element={<ContestPage />} />
        <Route path="/contest/:id/draft" element={<DraftRoomPage />} />
        <Route path="/live/:id" element={<LivePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  )
}

export default App