export interface Player {
  id: string
  name: string
  email?: string
  phone?: string
  dateOfBirth?: Date
  battingStyle?: 'right' | 'left'
  bowlingStyle?: 'right-arm' | 'left-arm' | 'none'
  preferredRole?: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper'
  statistics?: PlayerStatistics
}

export interface PlayerStatistics {
  matchesPlayed: number
  runs: number
  wickets: number
  battingAverage: number
  bowlingAverage: number
  strikeRate: number
  economyRate: number
}

