import {ChampInfo, ChampLotation} from '@/model/LOL.model'
import LoLSearch from './search'
import ChampRotation from './champRotation'

export default async function LoLPage() {
  const fetchChampion = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/champion.json',
    {
      method: 'GET'
    }
  )
  const championData = await fetchChampion.json()
  const champInfoList: ChampInfo[] = []
  for (const key in championData.data) {
    champInfoList.push(championData.data[key])
  }

  const fetchChampLotations = await fetch(
    `${process.env.NEXT_PUBLIC_RIOT_GAMES_BASE_URL}/lol/platform/v3/champion-rotations`,
    {
      method: 'GET',
      headers: {
        'X-Riot-Token': process.env.NEXT_PUBLIC_RIOT_GAMES_KEY!
      }
    }
  )
  const champLotationData: ChampLotation = await fetchChampLotations.json()

  const filteredChampLotationInfo = champInfoList.filter((item) => {
    let flag = false
    champLotationData.freeChampionIds.forEach((ele) => {
      if (item.key === String(ele)) {
        flag = true
      }
    })
    return flag
  })

  return (
    <>
      <LoLSearch />
      <ChampRotation filteredLotationList={filteredChampLotationInfo} />
    </>
  )
}
