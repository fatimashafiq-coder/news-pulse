import { useQueries } from "@tanstack/react-query";
import { fetchNewsAPI } from "../api/newsApi";
import { fetchGuardianNews } from "../api/guardianApi";
import ArticleCard from "../components/ArticleCard";

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

  const newsAPIArticles = newsAPIQuery.data || [];
  const guardianArticles = guardianQuery.data || [];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        📰 Latest News from Multiple Sources
      </h1>
{/*  */}
      {newsAPIArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
            NewsAPI ({newsAPIArticles.length} articles)
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {newsAPIArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {guardianArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
            The Guardian ({guardianArticles.length} articles)
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {guardianArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsAPIPage;
