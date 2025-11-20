import { useState } from "react";
import { useMixedNews } from "../hooks/useMixedNews";
import ArticleCard from "../components/ArticleCard";
import SearchInput from "../../../components/Input";
import DateFilterDropdown from "../../../components/DateFilterDropdown";
import SourceFilterDropdown from "../../../components/SourceFilterDropdown";
import AuthorFilterDropdown from "../../../components/AuthorFilterDropdown";
import { useArticleFilters } from "../hooks/useArticleFilters";

const NewsAPIPage = () => {
  const [searchQuery, setSearchQuery] = useState("politician");
  const { mixedArticles, isLoading } = useMixedNews(searchQuery);

  const {
    authors,
    displayArticles,
    filterByAuthor,
    filterBySource,
    filterByDate,
  } = useArticleFilters(mixedArticles);

  return (
    <div className="min-h-screen bg-gray-50 px-12 py-12">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-black">📰 Mixed News Feed</h1>
          <SearchInput
            onSearch={setSearchQuery}
          />
        </div>

        <div className="mb-8 flex gap-3 space-y-4">
          <DateFilterDropdown onSelect={filterByDate} />
          <SourceFilterDropdown selectedSource="null" onSelect={filterBySource} />
          <AuthorFilterDropdown authors={authors} onFilter={filterByAuthor} />
        </div>

        {isLoading && mixedArticles.length === 0 && (
          <p className="text-center text-gray-600 py-8">Loading...</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
          {displayArticles.length > 0 ? (
            displayArticles.map(article => (
              <ArticleCard key={`${article.source}-${article.id}`} article={article} />
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
