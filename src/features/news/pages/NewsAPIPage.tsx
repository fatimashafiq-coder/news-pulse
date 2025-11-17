import { useState, useEffect } from "react";
import { useMixedNews } from "../hooks/useMixedNews";
import {type Article } from "../../../types/article";
import ArticleCard from "../components/ArticleCard";
import SearchInput from "../../../components/Input";
import DateFilterDropdown from "../../../components/DateFilterDropdown";

const NewsAPIPage = () => {
  const [searchQuery, setSearchQuery] = useState("politician");
  const [displayArticles, setDisplayArticles] = useState<Article[]>([]);
  const { mixedArticles, isLoading, hasError } = useMixedNews(searchQuery);

  useEffect(() => {
    setDisplayArticles(mixedArticles);
  }, [mixedArticles]);

  const handleFilter = (filtered: Article[]) => {
    setDisplayArticles(filtered);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-white">📰 Mixed News Feed</h1>
        <SearchInput onSearch={setSearchQuery} />
      </div>

      <DateFilterDropdown 
        articles={mixedArticles} 
        onFilter={handleFilter} 
      />

      {isLoading && <p className="text-white">Loading...</p>}
      {hasError && <p className="text-white">Error loading news</p>}

      <div className="grid grid-cols-4">
        {displayArticles.length > 0 ? (
          displayArticles.map((article) => (
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
