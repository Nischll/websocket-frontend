import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import { apiService } from "../../../api";

interface UseGetApiConfig<TData = unknown> {
  queryParams?: Record<string, any>;
  enabled?: boolean;
  axiosConfig?: AxiosRequestConfig;
  staleTime?: number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  select?: UseQueryOptions<TData, Error>["select"];
  retry?: UseQueryOptions<TData, Error>["retry"];
}

export const useApiGet = <T>(
  endpoint: string | string[],
  config?: UseGetApiConfig<T>
) => {
  const {
    queryParams,
    enabled = true,
    axiosConfig,
    staleTime = 0, // ✅ force fresh fetch unless overridden
    refetchOnMount = true, // ✅ ensure it always refetches on component mount
    refetchOnWindowFocus = false,
    refetchOnReconnect = false,
    select,
    retry,
  } = config || {};

  const queryKey = [
    "GET",
    Array.isArray(endpoint) ? endpoint[0] : endpoint,
    queryParams ?? {},
  ];

  const options: UseQueryOptions<T, Error, T, typeof queryKey> = {
    queryKey,
    enabled,
    staleTime,
    refetchOnMount,
    refetchOnWindowFocus,
    refetchOnReconnect,
    select,
    retry,
    queryFn: async () => {
      try {
        const res = await apiService.get<T>(
          Array.isArray(endpoint) ? endpoint[0] : endpoint,
          {
            params: queryParams,
            ...axiosConfig,
          }
        );
        return res.data;
      } catch (error) {
        console.error("useApiGet error:", error);
        throw error;
      }
    },
  };

  return useQuery(options);
};
