import { useMixedNews } from "../hooks/useMixedNews";
import ArticleCard from "../components/ArticleCard";
import { useState } from "react";

const NewsAPIPage = () => {
  const [inputValue, setInputValue] = useState("bitcoin");
  const [searchQuery, setSearchQuery] = useState("bitcoin");
  const { mixedArticles, isLoading, hasError } = useMixedNews(searchQuery);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchQuery(inputValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (hasError) return <p className="text-white">Error loading news</p>;

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
            placeholder="Search news (sports, technology, bitcoin...)..."
            className="px-4 py-3 rounded w-80 outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {mixedArticles.length > 0 ? (
          mixedArticles.map((article) => (
            <ArticleCard key={`${article.source}-${article.id}`} article={article} />
          ))
        ) : (
          <p className="text-white col-span-full text-center">No articles found</p>
        )}
      </div>
    </>
  );
};

export default NewsAPIPage;
