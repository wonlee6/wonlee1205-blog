'use client'

import {useMemo} from 'react'
import {StaticImageData} from 'next/image'
import type {EChartsOption} from 'echarts'
import {Card, CardFooter, Image} from '@nextui-org/react'
import PreviewChart from '@/app/chart/previewChart'
import {PROFILE_ICON} from '@/lib/api-constant'
import {League, Summoner, SummonerLeague} from '@/model/LOL.model'

import iron from '/public/images/ranked-emblem/emblem-iron.png'
import bronze from '/public/images/ranked-emblem/emblem-bronze.png'
import silver from '/public/images/ranked-emblem/emblem-silver.png'
import gold from '/public/images/ranked-emblem/emblem-gold.png'
import platinum from '/public/images/ranked-emblem/emblem-platinum.png'
import emerald from '/public/images/ranked-emblem/emblem-emerald.png'
import diamond from '/public/images/ranked-emblem/emblem-diamond.png'
import master from '/public/images/ranked-emblem/emblem-master.png'
import grandmaster from '/public/images/ranked-emblem/emblem-grandmaster.png'
import challenger from '/public/images/ranked-emblem/emblem-challenger.png'

interface Props {
  summoner: Summoner
  summonerLeague: SummonerLeague
  leagueData: League
}

const tierImage: Record<string, StaticImageData> = {
  IRON: iron,
  BRONZE: bronze,
  SILVER: silver,
  GOLD: gold,
  PLATINUM: platinum,
  EMERALD: emerald,
  DIAMOND: diamond,
  MASTER: master,
  GRANDMASTER: grandmaster,
  CHALLENGER: challenger
}

export default function SummonerInfo({
  summoner,
  summonerLeague,
  leagueData
}: Props) {
  const filteredRecord: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          itemStyle: {
            borderRadius: 10,
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'inner'
          },
          type: 'pie',
          data: [
            {
              value: summonerLeague.wins ?? 0,
              name: '승',
              itemStyle: {color: '#5383e8'}
            },
            {
              value: summonerLeague.losses ?? 0,
              name: '패',
              itemStyle: {color: '#e84057'}
            }
          ]
        }
      ]
    }
  }, [summonerLeague])

  const filteredTierImg = useMemo(() => {
    if (!summonerLeague) return ''

    return tierImage[summonerLeague.tier].src
  }, [summonerLeague])

  return (
    <div className='w-full flex justify-evenly py-8 px-4 gap-x-8'>
      <div className='w-1/5'>
        <Card
          isFooterBlurred
          isPressable
          radius='lg'
          className='border-none w-full h-[200px]'>
          <Image
            src={`${PROFILE_ICON}${summoner.profileIconId}.png`}
            alt='summoner icon'
            className='z-0 w-full h-full object-cover'
            height={200}
            width={200}
            removeWrapper
            isZoomed
          />
          <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
            <p className='text-tiny text-white/80'>{summoner.name ?? ''}</p>
            <div className='bg-default-700 rounded-lg px-1'>
              <span className='text-tiny text-white'>
                L.{summoner.summonerLevel ?? ''}
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className='w-2/5 relative'>
        <Image
          className='absolute left-44 top-12'
          src={filteredTierImg}
          alt='tier'
          width={400}
          height={300}
        />
        <Card
          radius='lg'
          className='border-none w-full h-[200px] bg-default-100/25 hover:bg-default-100 dark:bg-default-100/25 dark:hover:bg-default-200 flex-row'>
          <div className='w-1/2 h-full flex flex-col'>
            <PreviewChart option={filteredRecord} height='100%' />
            <p className='font-medium text-inherit text-center'>
              승률 :{' '}
              <span className='text-teal-400 hover:text-teal-600'>
                {(
                  (summonerLeague.wins /
                    (summonerLeague.wins + summonerLeague.losses)) *
                  100
                ).toFixed(0)}
                %
              </span>
            </p>
          </div>
          <div className='w-1/2 h-full flex flex-col justify-start items-center gap-y-1 pt-5'>
            <p className='text-lg font-semibold text-teal-400 hover:text-teal-600'>
              {summonerLeague.queueType}
            </p>
            <p className='text-teal-400 hover:text-teal-600'>
              {summonerLeague.tier} {summonerLeague.rank}-
              {summonerLeague.leaguePoints}
            </p>
            <p className='text-teal-400 hover:text-teal-600'>
              {leagueData.name}
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
