'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import {throttle} from 'lodash'

const useScrollDown = () => {
  const [isScrollDown, setIsScrollDown] = useState(true)

  const beforeScrollY = useRef(0)

  const scrollEvent = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY
        if (beforeScrollY.current < currentScrollY) {
          setIsScrollDown(false)
        } else {
          setIsScrollDown(true)
        }
        beforeScrollY.current = currentScrollY
      }, 300),
    [beforeScrollY]
  )

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent)
    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isScrollDown
}
export default useScrollDown
