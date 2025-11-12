export interface Team {
  id: string
  name: string
  captainId: string
  playerIds: string[]
  matchesPlayed: number
  matchesWon: number
  matchesLost: number
  matchesDrawn: number
  winPercentage: number
}

