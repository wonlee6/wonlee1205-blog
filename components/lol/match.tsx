'use client'

import {API_KEY} from '@/lib/api-constant'
import {DetailMatch, Match} from '@/model/LOL.model'
import React, {useEffect} from 'react'

interface MatchProps {
  detailMatchList: PromiseSettledResult<DetailMatch | undefined>[]
}

export default function MatchComponent({detailMatchList}: MatchProps) {
  console.log(detailMatchList)

  return <div>Match</div>
}
