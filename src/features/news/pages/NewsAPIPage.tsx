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
    <div className="min-h-screen p-8 ">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        📰 Latest News
      </h1>

      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
export default NewsAPIPage;
