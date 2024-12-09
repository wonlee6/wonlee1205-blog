import React from 'react'

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const callbackRef = React.useRef(callback)

  React.useLayoutEffect(() => {
    callbackRef.current = callback
  })

  let timer: ReturnType<typeof setTimeout>

  const naiveDebounce = (func: (...args: any[]) => void, delayMs: number, ...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delayMs)
  }

  return React.useMemo(
    () =>
      (...args: any) =>
        naiveDebounce(callbackRef.current, delay, ...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay]
  )
}
