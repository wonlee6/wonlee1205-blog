import {ChampInfo, ChampLotation} from '@/model/LOL.model'
import LoLSearch from './search'
import ChampRotation from './champRotation'

const fetchChampLotation = async () => {
  if (
    typeof process.env.NEXT_PUBLIC_RIOT_GAMES_BASE_URL === 'undefined' ||
    typeof process.env.NEXT_PUBLIC_RIOT_GAMES_KEY === 'undefined'
  )
    return

  try {
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
  } catch (error) {
    console.error(error)
  }
}

const fetchChampionList = async () => {
  try {
    const response = await fetch(
      'https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/champion.json',
      {
        method: 'GET'
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
export default async function LoLPage() {
  const getChampionData = fetchChampionList()
  const getChampLotationData = fetchChampLotation()

  let filteredChampLotationInfo: ChampInfo[] = []
  try {
    const [champInfo, champLotation] = await Promise.all([
      getChampionData,
      getChampLotationData
    ])

    const champInfoList: ChampInfo[] = []
    for (const key in champInfo.data) {
      champInfoList.push(champInfo.data[key])
    }

    if (champLotation) {
      filteredChampLotationInfo = champInfoList.filter((item) => {
        let flag = false
        champLotation.freeChampionIds.forEach((ele) => {
          if (item.key === String(ele)) {
            flag = true
          }
        })
        return flag
      })
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <>
      <LoLSearch />
      <ChampRotation filteredLotationList={filteredChampLotationInfo} />
    </>
  )
}