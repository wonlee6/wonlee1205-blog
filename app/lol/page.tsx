import ChampRotation from '@/components/lol/champRotation'
import LoLSearch from '@/components/lol/search'
import {API_KEY, CHAMP_LIST, ROTATION} from '@/lib/api-constant'
import {ChampInfo, ChampLotation} from '@/model/LOL.model'

const fetchChampLotation = async () => {
  if (typeof API_KEY === 'undefined') return

  const response = await fetch(ROTATION, {
    method: 'GET',
    headers: {
      'X-Riot-Token': API_KEY
    }
  })
  const data: ChampLotation = await response.json()
  return data
}

const fetchChampionList = async () => {
  const response = await fetch(CHAMP_LIST, {
    method: 'GET'
  })
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
      champLotation.freeChampionIds.forEach((ele) => {
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
