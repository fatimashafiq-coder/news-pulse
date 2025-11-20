import { useState } from "react";
import { ArticleSource } from "../types/article";

interface SourceFilterDropdownProps {
  selectedSource?: string;
  onSelect: (source: string) => void;
}
const sources = ["All", ...Object.values(ArticleSource)];
const SourceFilterDropdown = ({ selectedSource = "null", onSelect }: SourceFilterDropdownProps) => {
  const [currentSource, setCurrentSource] = useState<string>(selectedSource);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const source = e.target.value;
    setCurrentSource(source);
    onSelect(source);
  };

  return (
   
      <select
        className="border p-2 rounded"
        value={currentSource}
        onChange={handleChange}
      >
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
  
  );
};

export default SourceFilterDropdown;
