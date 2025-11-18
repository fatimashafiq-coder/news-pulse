import { useState, useMemo } from "react";
import {type Article } from "../types/article";

interface AuthorFilterDropdownProps {
  articles: Article[];
  onFilter: (filtered: Article[]) => void;
}

const AuthorFilterDropdown = ({ articles, onFilter }: AuthorFilterDropdownProps) => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>("All");

  const authors = useMemo(() => {
    const authorSet = new Set<string>();
    articles.forEach((article) => {
      if (article.author && article.author.trim()) {
        authorSet.add(article.author);
      }
    });
    return ["All", ...Array.from(authorSet).sort()];
  }, [articles]);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const author = e.target.value;
    setSelectedAuthor(author);

    if (author === "All") {
      onFilter(articles);
    } else {
      const filtered = articles.filter((article) => article.author === author);
      onFilter(filtered);
    }
  };

  return (
    <div className="w-full md:w-48">
      <select
       className="border"
        value={selectedAuthor}
        onChange={handleAuthorChange}
      >
        {authors.map((author) => (
          <option key={author} value={author}>
            {author === "All" ? "All Authors" : author}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AuthorFilterDropdown;
