export interface MatchInvitation {
  id: string
  matchId: string
  invitedPlayerId: string
  invitedTeamId?: string
  status: 'pending' | 'accepted' | 'declined'
  createdAt: Date
}

export interface PlayerConnection {
  id: string
  player1Id: string
  player2Id: string
  status: 'pending' | 'connected' | 'blocked'
  createdAt: Date
}

