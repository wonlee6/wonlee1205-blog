import {
  DetailMatch,
  League,
  Match,
  Summoner,
  SummonerLeague
} from '@/model/LOL.model'
import SummonerInfo from '../../../components/lol/summonerInfo'
import Search from '../../../components/lol/search'
import {
  API_KEY,
  LEAGUE,
  MATCH,
  SUMMONER_LEAGUE,
  SUMMONER_NAME
} from '@/lib/api-constant'
import {redirect} from 'next/navigation'
import MatchComponent from '@/components/lol/match'

const fetchSummonerName = async (
  name: string
): Promise<Summoner | undefined> => {
  if (typeof API_KEY === 'undefined' || typeof name !== 'string') return

  const url = SUMMONER_NAME + name
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': API_KEY
    }
  })
  if (response.status === 200) {
    return await response.json()
  }
  return undefined
}

const fetchSummonerLeague = async (summonerId: string) => {
  if (typeof API_KEY === 'undefined' || typeof summonerId !== 'string') return

  const url = SUMMONER_LEAGUE + summonerId

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': API_KEY
    }
  })
  const data = await response.json()
  return data
}

const fetchLeague = async (leagueId: string) => {
  if (!API_KEY || !leagueId) return

  const url = LEAGUE + leagueId
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': API_KEY
    }
  })
  const data = await response.json()
  return data
}

// const fetchChampMastory = async (summonerId: string) => {
//   if (!summonerId || !API_KEY) return

//   const url = CHAMP_MASTORY_LIST + summonerId
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'X-Riot-Token': API_KEY
//     }
//   })
//   const data = await response.json()
//   return data
// }

const fetchMatch = async (puuid: string): Promise<Match | []> => {
  if (typeof API_KEY === 'undefined') return []

  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': API_KEY
    }
  })

  if (response.status === 200) {
    return await response.json()
  }

  return []
}

const fetchDetailMatch = async (
  match: string
): Promise<DetailMatch | undefined> => {
  if (typeof API_KEY === 'undefined') return

  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${match}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': API_KEY
    }
  })

  if (response.status === 200) {
    return await response.json()
  }

  return undefined
}

export default async function SummonerPage({
  params
}: {
  params: {summoner: string}
}) {
  const summoner = await fetchSummonerName(params.summoner)
  if (typeof summoner === 'undefined') {
    redirect('/lol')
  }
  const summonerLeague: SummonerLeague[] = await fetchSummonerLeague(
    summoner.id
  )
  const leagueData: League = await fetchLeague(summonerLeague[0].leagueId)
  // const ChampMastoriesData = await fetchChampMastory(summoner.id)

  const matchData = await fetchMatch(summoner.puuid)
  const covertMatchData = matchData.map((i) => fetchDetailMatch(i))
  const detailMatchList = await Promise.allSettled(covertMatchData)
  const covertMatchList = detailMatchList.filter(
    (item) => item.status === 'fulfilled'
  )

  return (
    <>
      <Search />
      <SummonerInfo
        summoner={summoner}
        summonerLeague={summonerLeague[0]}
        leagueData={leagueData}
      />
      <MatchComponent detailMatchList={covertMatchList} />
      {/* <ChampMastory ChampMastoriesData={ChampMastoriesData} /> */}
    </>
  )
}
