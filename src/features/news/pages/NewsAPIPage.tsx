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
    mixedArticles.forEach((a) => {
      if (a.author?.trim()) authorSet.add(a.author);
    });
    return Array.from(authorSet).sort();
  }, [mixedArticles]);

  const filterByAuthor = (author: string) => {
    if (author === "All") return setFilteredArticles(null);
    const filtered = mixedArticles.filter((a) => a.author === author);
    setFilteredArticles(filtered);
  };

  const filterBySource = (source: string) => {
    if (source === "All") return setFilteredArticles(null);
    const filtered = mixedArticles.filter((a) => a.source === source);
    setFilteredArticles(filtered);
  };

  const filterByDate = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return setFilteredArticles(null);
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const filtered = mixedArticles.filter((a) => {
      const articleDate = new Date(a.publishedAt);
      return articleDate >= start && articleDate <= end;
    });
    setFilteredArticles(filtered);
  };

  const displayArticles = filteredArticles ?? mixedArticles;

  return (
    <div className="min-h-screen bg-gray-50 px-12 py-12">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-black">📰 Mixed News Feed</h1>
          <SearchInput onSearch={setSearchQuery} />
        </div>
        <div className="mb-8 flex gap-3 space-y-4">
          <DateFilterDropdown onSelect={filterByDate} />
          <SourceFilterDropdown selectedSource="All" onSelect={filterBySource} />
          <AuthorFilterDropdown authors={authors} onFilter={filterByAuthor} />
        </div>
        {isLoading && mixedArticles.length === 0 && (
          <p className="text-center text-gray-600 py-8">Loading...</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
          {displayArticles.length > 0 ? (
            displayArticles.map((article) => (
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
