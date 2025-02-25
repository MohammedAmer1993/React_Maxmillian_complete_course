import { useState, useEffect } from "react";

export function useFetch(fetchFn, url, initial) {
  const [fetchedData, setFetchedData] = useState(initial);
  const [isFethcing, setIsFetching] = useState(false);
  const [fetchingError, setFetchinError] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsFetching(true);
      try {
        const places = await fetchFn(url);
        setFetchedData(places);
      } catch (error) {
        setFetchinError({
          message: error.message || "Fetching Failed",
        });
      } finally {
        setIsFetching(false);
      }
    }
    getData();
  }, [fetchFn, url]);
  return { fetchedData, fetchingError, isFethcing, setFetchedData };
}
