import { useQuery } from "@tanstack/react-query";
import { fetchNewsAPI } from "../api/newsApi";
import { type Article } from "../../../types/article";

export const useNewsAPI = (query: string = "bitcoin") => {
  return useQuery<Article[], Error>({
    queryKey: ["newsapi", query],
    queryFn: () => fetchNewsAPI(query),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 2,
    retryDelay: 1000,
    enabled: query.trim().length > 0,
  });
};
