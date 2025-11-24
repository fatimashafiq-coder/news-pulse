import { useState, useEffect } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 15;
  
  useEffect(() => {
    setCurrentPage(1);
  }, [displayArticles]);

  const totalPages = Math.ceil(displayArticles.length / articlesPerPage);
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = displayArticles.slice(indexOfFirst, indexOfLast);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
              {currentArticles.length > 0 ? (
                currentArticles.map(article => ( 
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

            {displayArticles.length > articlesPerPage && (
              <div className="flex justify-center items-center gap-2 mt-6 mb-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded border bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = idx + 1;
                  } else {
                    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                    pageNum = start + idx;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-4 py-2 rounded border ${
                        currentPage === pageNum 
                          ? "bg-blue-500 text-white" 
                          : "bg-gray-200 hover:bg-gray-300"
                      } transition-colors`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded border bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsAPIPage;