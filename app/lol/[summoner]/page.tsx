import {Summoner, SummonerLeague} from '@/model/LOL.model'
import SummonerInfo from '../../../components/lol/summonerInfo'
import Search from '../../../components/lol/search'
import {
  API_KEY,
  BASE_URL,
  LEAGUE,
  SUMMONER_LEAGUE,
  SUMMONER_NAME
} from '@/lib/api-constant'

const fetchSummonerName = async (name: string) => {
  if (
    typeof BASE_URL === 'undefined' ||
    typeof SUMMONER_NAME === 'undefined' ||
    typeof name !== 'string'
  )
    return
  try {
    const url = BASE_URL + SUMMONER_NAME + name
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Riot-Token': API_KEY as string
      }
    })
    const data = await response.json()
    return data
  } catch (e) {
    console.error('fetch summoner name', e)
  }
}

const fetchSummonerLeagu = async (summonerId: string) => {
  if (
    typeof BASE_URL === 'undefined' ||
    typeof SUMMONER_LEAGUE === 'undefined' ||
    typeof summonerId !== 'string'
  )
    return

  const url = BASE_URL + SUMMONER_LEAGUE + summonerId

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Riot-Token': API_KEY as string
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('summoner league error', error)
  }
}

const fetchLeague = async (leagueId: string) => {
  if (!BASE_URL || !LEAGUE || !leagueId) return
  try {
    const url = BASE_URL + LEAGUE + leagueId
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Riot-Token': API_KEY as string
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('league error', error)
  }
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
