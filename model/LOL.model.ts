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
