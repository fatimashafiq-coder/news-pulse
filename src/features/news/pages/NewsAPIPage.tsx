import { useQueries } from "@tanstack/react-query";
import { fetchNewsAPI } from "../api/newsApi";
import { fetchGuardianNews } from "../api/guardianApi";
import ArticleCard from "../components/ArticleCard";
import { type Article } from "../../../types/article";
import { useMemo } from "react";

const NewsAPIPage = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["newsapi", "bitcoin"],
        queryFn: () => fetchNewsAPI("bitcoin"),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 2,
      },
      {
        queryKey: ["guardian", "bitcoin"],
        queryFn: () => fetchGuardianNews("bitcoin"),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        retry: 2,
      },
    ],
  });

  const [newsAPIQuery, guardianQuery] = results;

  const isLoading = results.some((query) => query.isLoading);
  const hasError = results.some((query) => query.isError);

  const getMixedArticles = (): Article[] => {
    const newsAPIArticles = newsAPIQuery.data || [];
    const guardianArticles = guardianQuery.data || [];

    const allArticles = [...newsAPIArticles, ...guardianArticles];

    const shuffledArticles = [...allArticles];
    for (let i = shuffledArticles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArticles[i], shuffledArticles[j]] = [shuffledArticles[j], shuffledArticles[i]];
    }

    return shuffledArticles;
  };

  const mixedArticles = useMemo(() => getMixedArticles(), [newsAPIQuery.data, guardianQuery.data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-cyan-400 text-xl">Loading news from multiple sources...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Error loading some news sources</p>
          {newsAPIQuery.isError && (
            <p className="text-red-400">NewsAPI Error: {newsAPIQuery.error?.message}</p>
          )}
          {guardianQuery.isError && (
            <p className="text-red-400">Guardian Error: {guardianQuery.error?.message}</p>
          )}
        </div>
      </div>
    );
  }

  const totalArticles = mixedArticles.length;

  return (
    <div className="min-h-screen p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          📰 Mixed News Feed
        </h1>
      </div>

      {totalArticles > 0 ? (
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {mixedArticles.map((article) => (
            <ArticleCard
              key={`${article.source}-${article.id}`}
              article={article}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-xl mt-20">
          No articles found from any source.
        </div>
      )}

    </div>
  );
};

export default NewsAPIPage;
