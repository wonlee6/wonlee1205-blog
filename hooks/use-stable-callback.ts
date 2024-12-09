import { useCallback, useRef } from 'react'

export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  return useCallback((...args: any[]) => {
    return callbackRef.current(...args)
  }, []) as T
}

export function useEvent<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const stableCallback = useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args)
  }, [])

  return stableCallback as T
}
