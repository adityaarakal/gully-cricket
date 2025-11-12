export interface Tournament {
  id: string
  name: string
  startDate: Date
  endDate?: Date
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  teamIds: string[]
  matchIds: string[]
  format: 'round-robin' | 'knockout' | 'league'
  winnerId?: string
}

export interface TournamentStanding {
  teamId: string
  matchesPlayed: number
  matchesWon: number
  matchesLost: number
  matchesDrawn: number
  points: number
  netRunRate: number
  position: number
}

