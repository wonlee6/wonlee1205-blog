import {League, Summoner, SummonerLeague} from '@/model/LOL.model'
import SummonerInfo from '../../../components/lol/summonerInfo'
import Search from '../../../components/lol/search'
import {
  API_KEY,
  CHAMP_MASTORY_LIST,
  LEAGUE,
  SUMMONER_LEAGUE,
  SUMMONER_NAME
} from '@/lib/api-constant'
import {redirect} from 'next/navigation'

const fetchSummonerName = async (
  name: string
): Promise<Summoner | undefined> => {
  if (typeof API_KEY === 'undefined' || typeof name !== 'string') return

  try {
    const url = SUMMONER_NAME + name
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Riot-Token': API_KEY
      }
    })
    const data = await response.json()
    return data
  } catch (e) {
    return undefined
  }
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

const fetchChampMastory = async (summonerId: string) => {
  if (!summonerId || !API_KEY) return

  const url = CHAMP_MASTORY_LIST + summonerId
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
  const summoner = await fetchSummonerName(params.summoner)
  if (typeof summoner === 'undefined') {
    alert('소환사 이름을 찾을 수 없습니다.')
    redirect('/lol')
  }
  const summonerLeague: SummonerLeague[] = await fetchSummonerLeagu(summoner.id)
  const leagueData: League = await fetchLeague(summonerLeague[0].leagueId)
  // const ChampMastoriesData: ChampMastories[] = await fetchChampMastory(
  //   summoner.id
  // )
  return (
    <>
      <Search />
      <SummonerInfo
        summoner={summoner}
        summonerLeague={summonerLeague[0]}
        leagueData={leagueData}
      />
      {/* <ChampMastory ChampMastoriesData={ChampMastoriesData} /> */}
    </>
  )
}
