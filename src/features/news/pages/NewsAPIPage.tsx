import { useMixedNews } from "../hooks/useMixedNews";
import ArticleCard from "../components/ArticleCard";

const NewsAPIPage = () => {
  const { mixedArticles, isLoading, hasError } = useMixedNews("bitcoin");

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Error loading news</p>;

  return (
    <>
     <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold text-white">
          📰 Mixed News Feed
        </h1>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search news..."
          className="px-4 py-3 rounded w-80 outline-none"
        />
        <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded hover:bg-blue-600">
          Search
        </button>
      </div>
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
