import { useState, useEffect } from 'react'

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}
/**
 * Fetches data from an async function and tracks loading/error state
 * Cancels the update if the component unmounts or `fetchFn` changes
 * Before the request finishes, to avoid a "set state on unmounted component" warning
 *
 * @typeParam T - The shape of the data being fetched
 * @param fetchFn - A memoized (useCallback) function that returns a Promise with the data
 * @returns An object with `data`, `loading` and `error`
 */
function useFetch<T>(fetchFn: () => Promise<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFn()
        if (!cancelled) setData(result)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'An unknown error occurred')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [fetchFn])

  return { data, loading, error }
}

export default useFetch
