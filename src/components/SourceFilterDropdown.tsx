import { useState } from "react";
import {type Article } from "../types/article";

interface SourceFilterDropdownProps {
  articles: Article[];
  onFilter: (filtered: Article[]) => void;
}

type SourceType = "All Source" | "NewsAPI" | "Guardian" | "NewsData";
const SOURCES: SourceType[] = ["All Source", "NewsAPI", "Guardian", "NewsData"];

const SourceFilterDropdown = ({ articles, onFilter }: SourceFilterDropdownProps) => {
  const [selectedSource, setSelectedSource] = useState<SourceType>("All Source");

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const source = e.target.value as SourceType;
    setSelectedSource(source);

    if (source === "All Source") {
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
