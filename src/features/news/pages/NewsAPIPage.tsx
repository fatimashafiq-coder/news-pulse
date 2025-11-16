import { useMixedNews } from "../hooks/useMixedNews";
import ArticleCard from "../components/ArticleCard";
const NewsAPIPage = () => {
  const { mixedArticles, isLoading, hasError } = useMixedNews("bitcoin");

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Error loading news</p>;

  return (
     <>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          📰 Mixed News Feed
        </h1>
      </div>
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
      {mixedArticles.map((article) => (
        <ArticleCard key={`${article.source}-${article.id}`} article={article} />
      ))}
    </div>
     </>
  );
};

export default NewsAPIPage;
