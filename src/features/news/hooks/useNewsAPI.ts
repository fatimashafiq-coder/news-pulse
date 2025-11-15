import { useQuery } from "@tanstack/react-query";
import { fetchNewsAPI } from "../api/newsApi";
import { type Article } from "../../../types/article";

export const useNewsAPI = (query: string = "latest") => {
  return useQuery<Article[], Error>({
    queryKey: ["newsapi", query],
    queryFn: () => fetchNewsAPI(query),
    staleTime: 1000 * 60 * 5,
  });
};
