import {Summoner, SummonerLeague} from '@/model/LOL.model'
import SummonerInfo from '../../../components/lol/summonerInfo'
import Search from '../../../components/lol/search'
import {
  API_KEY,
  LEAGUE,
  SUMMONER_LEAGUE,
  SUMMONER_NAME
} from '@/lib/api-constant'

const fetchSummonerName = async (name: string) => {
  if (typeof API_KEY === 'undefined' || typeof name !== 'string') return

  const url = SUMMONER_NAME + name
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Riot-Token': API_KEY
    }
  })
  const data = await response.json()
  return data
}

const fetchSummonerLeagu = async (summonerId: string) => {
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

export default async function SummonerPage({
  params
}: {
  params: {summoner: string}
}) {
  const summoner: Summoner = await fetchSummonerName(params.summoner)
  const summonerLeague: SummonerLeague[] = await fetchSummonerLeagu(summoner.id)
  const leagueData = await fetchLeague(summonerLeague[0].leagueId)
  return (
    <>
      <Search />
      <SummonerInfo
        summoner={summoner}
        summonerLeague={summonerLeague[0]}
        leagueData={leagueData}
      />
    </>
  )
}
