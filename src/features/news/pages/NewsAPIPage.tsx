import { useState, useEffect } from "react";
import { useMixedNews } from "../hooks/useMixedNews";
import { type Article } from "../../../types/article";
import ArticleCard from "../components/ArticleCard";
import SearchInput from "../../../components/Input";
import DateFilterDropdown from "../../../components/DateFilterDropdown";
import SourceFilterDropdown from "../../../components/SourceFilterDropdown";
import AuthorFilterDropdown from "../../../components/AuthorFilterDropdown";

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
     <div className="min-h-screen bg-gray-50 px-12 py-12 ">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-black">📰 Mixed News Feed</h1>
          <SearchInput onSearch={setSearchQuery} />
        </div>

        <div className="mb-8 space-y-4 flex gap-3 ">
          <DateFilterDropdown
            articles={mixedArticles}
            onFilter={handleFilter}
          />

          <SourceFilterDropdown
            articles={mixedArticles}
            onFilter={handleFilter}
          />

          <AuthorFilterDropdown 
            articles={mixedArticles} 
            onFilter={handleFilter} 
          />
        </div>

        {isLoading && <p className="text-center text-gray-600 py-8">Loading...</p>}
        {hasError && <p className="text-center text-red-600 py-8">Error loading news</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16 ">
          {displayArticles.length > 0 ? (
            displayArticles.map((article) => (
              <ArticleCard
                key={`${article.source}-${article.id}`}
                article={article}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 py-12">
              No articles found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsAPIPage;
