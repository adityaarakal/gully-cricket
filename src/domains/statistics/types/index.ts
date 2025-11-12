export interface Statistics {
  playerId?: string
  teamId?: string
  matchId?: string
  tournamentId?: string
  battingStats?: BattingStatistics
  bowlingStats?: BowlingStatistics
  fieldingStats?: FieldingStatistics
}

export interface BattingStatistics {
  runs: number
  balls: number
  fours: number
  sixes: number
  strikeRate: number
  average: number
  highestScore: number
  fifties: number
  hundreds: number
}

export interface BowlingStatistics {
  wickets: number
  runs: number
  overs: number
  economyRate: number
  average: number
  strikeRate: number
  bestFigures: string
  fiveWicketHauls: number
}

export interface FieldingStatistics {
  catches: number
  stumpings: number
  runOuts: number
}

