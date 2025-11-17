import { useQueries } from "@tanstack/react-query";
import { fetchNewsAPI } from "../api/newsApi";
import { fetchGuardianNews } from "../api/guardianApi";
import {fetchNewsDataAPI } from "../api/worldNewsApi";           
import { useMemo } from "react";

export const useMixedNews = (query: string = "politician") => {
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
      {
        queryKey: ["newsdata", query],
        queryFn: () => fetchNewsDataAPI(query),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 2,
      },
    ],
  });

  const [newsAPIQuery, guardianQuery, newsDataQuery] = results;

  const isLoading = results.some((q) => q.isLoading);
  const hasError = results.some((q) => q.isError);

  const mixedArticles = useMemo(() => {
    const newsAPIArticles = newsAPIQuery.data ?? [];
    const guardianArticles = guardianQuery.data ?? [];
    const newsDataArticles = newsDataQuery.data ?? [];

    const all = [...newsAPIArticles, ...guardianArticles, ...newsDataArticles];

    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }

    console.log("Total Articles:", all.length);
    return all;
  }, [newsAPIQuery.data, guardianQuery.data, newsDataQuery.data]);

  return { mixedArticles, isLoading, hasError };
};