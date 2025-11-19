import { useState, useMemo } from "react";
import { useMixedNews } from "../hooks/useMixedNews";
import { type Article } from "../../../types/article";
import ArticleCard from "../components/ArticleCard";
import SearchInput from "../../../components/Input";
import DateFilterDropdown from "../../../components/DateFilterDropdown";
import SourceFilterDropdown from "../../../components/SourceFilterDropdown";
import AuthorFilterDropdown from "../../../components/AuthorFilterDropdown";

const NewsAPIPage = () => {
  const [searchQuery, setSearchQuery] = useState("politician");
  const [filteredArticles, setFilteredArticles] = useState<Article[] | null>(null);
  const { mixedArticles, isLoading } = useMixedNews(searchQuery);

  const authors = useMemo(() => {
    const authorSet = new Set<string>();
    mixedArticles.forEach((article) => {
      if (article.author && article.author.trim()) {
        authorSet.add(article.author);
      }
    });
    return Array.from(authorSet).sort();
  }, [mixedArticles]);

  const handleFilter = (filtered: Article[]) => {
    setFilteredArticles(filtered);
  };

  const handleAuthorFilter = (author: string) => {
    if (author === "All") {
      setFilteredArticles(null);
    } else {
      const filtered = mixedArticles.filter((article) => article.author === author);
      setFilteredArticles(filtered);
    }
  };

  const displayArticles = filteredArticles ?? mixedArticles;

  return (
    <div className="min-h-screen bg-gray-50 px-12 py-12 ">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-black">📰 Mixed News Feed</h1>
          <SearchInput onSearch={setSearchQuery} />
        </div>

        <div className="mb-8 space-y-4 flex gap-3 ">
          <DateFilterDropdown articles={mixedArticles} onFilter={handleFilter} />
          <SourceFilterDropdown articles={mixedArticles} onFilter={handleFilter} />
          <AuthorFilterDropdown authors={authors} onFilter={handleAuthorFilter} />
        </div>

        {isLoading && mixedArticles.length === 0 && (
          <p className="text-center text-gray-600 py-8">Loading...</p>
        )}

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
