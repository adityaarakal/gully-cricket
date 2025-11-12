import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Gully Cricket</h1>
        <nav className="layout-nav">
          <Link to="/">Dashboard</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/players">Players</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/tournaments">Tournaments</Link>
          <Link to="/statistics">Statistics</Link>
        </nav>
      </header>
      <main className="layout-main">
        {children}
      </main>
      <footer className="layout-footer">
        <p>&copy; 2024 Gully Cricket. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout

