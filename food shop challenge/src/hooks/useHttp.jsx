import { useState, useEffect, useCallback } from "react";

async function sendReq(url, config) {
  const response = await fetch(url, config);
  if (!response.ok) {
    const errorData = response.json();
    throw new Error(errorData.message || "something went wrong");
  }
  const data = await response.json();
  return data;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(
    async (body) => {
      setIsLoading(true);
      try {
        config.body = body;
        const data = await sendReq(url, config);
        setData(data);
        setError(false);
      } catch (err) {
        setError(err.message || "there is something wrong in your conection");
        setData(initialData);
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  function resetState() {
    setError(false);
    setData(initialData);
  }

  useEffect(() => {
    if (
      !config ||
      (config && config.method === "GET") ||
      (config && !config.method)
    ) {
      sendRequest();
    }
  }, [sendRequest]);

  return { data, isLoading, error, sendRequest, resetState };
}
