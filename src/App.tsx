import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import MatchesPage from '@/pages/matches/MatchesPage'
import PlayersPage from '@/pages/players/PlayersPage'
import TeamsPage from '@/pages/teams/TeamsPage'
import TournamentsPage from '@/pages/tournaments/TournamentsPage'
import StatisticsPage from '@/pages/statistics/StatisticsPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

