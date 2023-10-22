import {ChampInfo, ChampLotation} from '@/model/LOL.model'
import LoLSearch from '../../components/lol/search'
import ChampRotation from '../../components/lol/champRotation'

const fetchChampLotation = async () => {
  if (
    typeof process.env.NEXT_PUBLIC_RIOT_GAMES_BASE_URL === 'undefined' ||
    typeof process.env.NEXT_PUBLIC_RIOT_GAMES_KEY === 'undefined'
  )
    return

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RIOT_GAMES_BASE_URL}/lol/platform/v3/champion-rotations`,
    {
      method: 'GET',
      headers: {
        'X-Riot-Token': process.env.NEXT_PUBLIC_RIOT_GAMES_KEY
      }
    }
  )
  const data: ChampLotation = await response.json()
  return data
}

const fetchChampionList = async () => {
  const response = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/champion.json',
    {
      method: 'GET'
    }
  )
  const data = await response.json()
  return data
}

export default async function LoLPage() {
  const [champInfo, champLotation] = await Promise.all([
    fetchChampionList(),
    fetchChampLotation()
  ])

  const champInfoList: ChampInfo[] = []
  for (const key in champInfo.data) {
    champInfoList.push(champInfo.data[key])
  }

  let filteredChampLotationInfo: ChampInfo[] = []
  if (
    champLotation?.freeChampionIds &&
    champLotation.freeChampionIds.length > 0
  ) {
    filteredChampLotationInfo = champInfoList.filter((item) => {
      let flag = false
      champLotation.freeChampionIds.map((ele) => {
        if (item.key === String(ele)) {
          flag = true
        }
      })
      return flag
    })
  }

  return (
    <>
      <LoLSearch />
      <ChampRotation filteredLotationList={filteredChampLotationInfo} />
    </>
  )
}
