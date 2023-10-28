export type ChampLotation = {
  freeChampionIds: number[]
  freeChampionIdsForNewPlayers: number[]
  maxNewPlayerLevel: number
}

export type ChampInfo = {
  version: number
  id: string
  key: string
  name: string
  title: string
  blurb: string
  info: string
  image: {
    full: string
  }
  tags: any[]
  partype: string
  stats: any
}

export type Summoner = {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}

export type SummonerLeague = {
  leagueId: string
  queueType: string
  tier: string
  rank: string
  summonerId: string
  summonerName: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export type League = {
  tier: string
  leagueId: string
  queue: string
  name: string
  entries: any[]
}

export type ChampMastories = {
  puuid: string
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: number
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  chestGranted: boolean
  tokensEarned: number
  summonerId: string
}
