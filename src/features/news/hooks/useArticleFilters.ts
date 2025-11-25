import { useState, useMemo } from "react";
import { type Article } from "../../../types/article";

export const useArticleFilters = (mixedArticles: Article[]) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[] | null>(null);
  const authors = useMemo(() => {
    const set = new Set<string>();
    mixedArticles.forEach(a => {
      if (a.author?.trim()) set.add(a.author);
    });
    return Array.from(set).sort();
  }, [mixedArticles]);

  const filterByAuthor = (author: string) => {
    if (author === "All") return setFilteredArticles(null);
    setFilteredArticles(mixedArticles.filter(a => a.author === author));
  };

  const filterBySource = (source: string) => {
    if (source === "All") return setFilteredArticles(null);
    setFilteredArticles(mixedArticles.filter(a => a.source === source));
  };

  const filterByDate = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return setFilteredArticles(null);

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    setFilteredArticles(
      mixedArticles.filter(a => {
        const d = new Date(a.publishedAt);
        return d >= start && d <= end;
      })
    );
  };
  const displayArticles = filteredArticles ?? mixedArticles;
  return {
    authors,
    displayArticles,
    filterByAuthor,
    filterBySource,
    filterByDate,
  };
};
