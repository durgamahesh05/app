export interface Group { id: string; name: string; members: string[]; settled: boolean; inviteCode?: string; lastSettledAt?: string }
export interface Friend { id: string; name: string; balance: number }
