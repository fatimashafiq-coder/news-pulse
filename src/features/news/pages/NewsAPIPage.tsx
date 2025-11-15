import { useNewsAPI } from "../hooks/useNewsAPI";
import ArticleCard from "../components/ArticleCard";

const NewsAPIPage = () => {
  const { data: articles, isLoading, error } = useNewsAPI();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-gray-600">Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📰 Latest News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsAPIPage;
