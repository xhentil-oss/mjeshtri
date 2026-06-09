import { useState, useEffect, useCallback, useRef } from 'react';

// Runs an async function and tracks { data, loading, error }. Re-runs when any
// value in `deps` changes. Returns `reload()` to refetch on demand (e.g. after
// a mutation). The fn is given an AbortSignal-friendly "isStale" guard via the
// ref so late responses from a previous deps value are ignored.
export function useAsync(fn, deps = [], { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fnRef.current();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return undefined;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!immediate) return;
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fnRef.current();
        if (active) setData(result);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, reload: run, setData };
}
