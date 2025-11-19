import { useState } from "react";
import { ArticleSource, type Article } from "../types/article";

interface SourceFilterDropdownProps {
  articles: Article[];
  onFilter: (filtered: Article[]) => void;
}

const SOURCES = ["All", ...Object.values(ArticleSource)];

const SourceFilterDropdown = ({ articles, onFilter }: SourceFilterDropdownProps) => {
  const [selectedSource, setSelectedSource] = useState<string>("All");

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const source = e.target.value;
    setSelectedSource(source);

    if (source === "All") {
      onFilter(articles);
    } else {
      const filtered = articles.filter(
        (article) => article.source === source
      );
      onFilter(filtered);
    }
  };

  return (
    <div className="w-full md:w-48">
      <select
        className="border p-2 rounded"
        value={selectedSource}
        onChange={handleSourceChange}
      >
        {SOURCES.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SourceFilterDropdown;
