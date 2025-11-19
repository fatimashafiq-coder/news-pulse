import { useState } from "react";
import { type Article } from "../types/article";

interface SourceFilterDropdownProps {
  articles: Article[];
  onFilter: (filtered: Article[]) => void;
}

const FilterSource = {
  ALL: "All Source",
  NEWS_API: "NewsAPI",
  GUARDIAN: "Guardian",
  NEWS_DATA: "NewsData"
} as const;

const SOURCES = Object.values(FilterSource);

const SourceFilterDropdown = ({ articles, onFilter }: SourceFilterDropdownProps) => {
  const [selectedSource, setSelectedSource] = useState<string>(FilterSource.ALL);

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const source = e.target.value;
    setSelectedSource(source);

    if (source === FilterSource.ALL) {
      onFilter(articles);
    } else {
      const filtered = articles.filter((article) => article.source === source);
      onFilter(filtered);
    }
  };

  return (
    <div className="w-full md:w-48">
      <select
        className="border"
        value={selectedSource}
        onChange={handleSourceChange}
      >
        {SOURCES.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SourceFilterDropdown;
