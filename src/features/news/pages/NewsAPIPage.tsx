import { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const {
    authors,
    displayArticles,
    filterByAuthor,
    filterBySource,
    filterByDate,
  } = useArticleFilters(mixedArticles);


  const articlesPerPage = 20;
  const totalPages = Math.ceil(displayArticles.length / articlesPerPage);

  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = displayArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [displayArticles]);


  return (
    <div className="min-h-screen bg-grey">
      <div className="mx-auto">
        <div className="flex justify-between px-6">
          <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold text-black pt-4">📰 News</h1>
          <SearchInput onSearch={setSearchQuery} />
        </div>

        <div className="flex -ml-5 px-12">
          <SourceFilterDropdown selectedSource="null" onSelect={filterBySource} />
          <AuthorFilterDropdown authors={authors} onFilter={filterByAuthor} />
        </div>

        <div className="flex justify-between px-12">
          <DateFilterDropdown onSelect={filterByDate} />
        </div>

        {isLoading ? (
          <p className="text-center text-gray-600 py-8">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16 px-12 py-4">
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map(article => (
                  <ArticleCard
                    key={`${article.source}-${article.id}-${article.title}`}
                    article={article}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600 py-12">
                  No articles found
                </p>
              )}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default NewsAPIPage;
