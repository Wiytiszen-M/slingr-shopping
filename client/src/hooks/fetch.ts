import { apiClient } from "@/api/apiClient";
import { useState, useEffect, useMemo } from "react";

export const useGet = <T>(
  url: string,
  params?: Record<string, any>,
  config = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);
  const memoizedConfig = useMemo(() => config, [JSON.stringify(config)]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<{ data: T }>(url, {
          params: memoizedParams,
          ...memoizedConfig,
        });
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, memoizedParams, memoizedConfig]);

  return { data, loading, error };
};

export const usePut = <T>(
  url: string,
  data?: Record<string, any>,
  config = {}
) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const putData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.put<T>(url, data, { ...config });
      setResponse(result.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { putData, response, loading, error };
};

export const useDelete = <T>(url: string, config = {}) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.delete<T>(url, { ...config });
      setResponse(result.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, response, loading, error };
};
