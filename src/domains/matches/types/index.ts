export interface Match {
  id: string
  team1Id: string
  team2Id: string
  date: Date
  status: 'scheduled' | 'live' | 'completed' | 'cancelled'
  score?: MatchScore
  venue?: string
  tournamentId?: string
}

export interface MatchScore {
  team1Runs: number
  team1Wickets: number
  team1Overs: number
  team2Runs: number
  team2Wickets: number
  team2Overs: number
  winner?: string
}

