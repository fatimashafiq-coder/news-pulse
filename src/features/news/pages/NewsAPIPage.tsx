import { useState } from "react";
import { useMixedNews } from "../hooks/useMixedNews";
import ArticleCard from "../components/ArticleCard";
import SearchInput from "../../../components/Input";

const NewsAPIPage = () => {
  const [searchQuery, setSearchQuery] = useState("bitcoin");
  const { mixedArticles, isLoading, hasError } = useMixedNews(searchQuery);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-white">📰 Mixed News Feed</h1>
        <SearchInput onSearch={setSearchQuery} />
      </div>

      {isLoading && <p className="text-white">Loading...</p>}
      {hasError && <p className="text-white">Error loading news</p>}

      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {mixedArticles.length > 0 ? (
          mixedArticles.map((article) => (
            <ArticleCard
              key={`${article.source}-${article.id}`}
              article={article}
            />
          ))
        ) : (
          <p className="text-white col-span-full text-center">
            No articles found
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsAPIPage;
