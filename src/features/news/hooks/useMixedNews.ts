import { useQueries } from "@tanstack/react-query";
import { fetchNewsAPI } from "../api/newsApi";
import { fetchGuardianNews } from "../api/guardianApi";
import { useMemo } from "react";

export const useMixedNews = (query: string = "bitcoin") => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["newsapi", query],
        queryFn: () => fetchNewsAPI(query),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 2,
      },
      {
        queryKey: ["guardian", query],
        queryFn: () => fetchGuardianNews(query),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 2,
      },
    ],
  });

  const [newsAPIQuery, guardianQuery] = results;

  const isLoading = results.some((q) => q.isLoading);
  const hasError = results.some((q) => q.isError);

  const mixedArticles = useMemo(() => {
    const newsAPIArticles = newsAPIQuery.data || [];
    const guardianArticles = guardianQuery.data || [];

    const allArticles = [...newsAPIArticles, ...guardianArticles];

    const shuffled = [...allArticles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [newsAPIQuery.data, guardianQuery.data]);

  return { mixedArticles, isLoading, hasError };
};
