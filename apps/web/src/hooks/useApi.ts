/**
 * Hook for API calls with loading states
 */

import { useState, useCallback } from 'react';
import { ApiResponse } from '@/types';

interface UseApiOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

export function useApi<T = unknown>(options: UseApiOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const makeRequest = useCallback(
    async (apiCall: () => Promise<ApiResponse<T>>): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiCall();
        
        if (response.success && response.data) {
          setData(response.data);
          options.onSuccess?.(response.data);
          return response.data;
        } else {
          const errorMessage = response.error || 'An unknown error occurred';
          setError(errorMessage);
          options.onError?.(errorMessage);
          return null;
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Network error';
        setError(errorMessage);
        options.onError?.(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    makeRequest,
    reset,
  };
}