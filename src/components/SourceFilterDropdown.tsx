import { useState } from "react";
import { ArticleSource } from "../types/article";

interface SourceFilterDropdownProps {
  selectedSource?: string;
  onSelect: (source: string) => void;
}
const sources = ["All", ...Object.values(ArticleSource)];
const SourceFilterDropdown = ({ selectedSource = "All", onSelect }: SourceFilterDropdownProps) => {
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
        {sources.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
  
  );
};

export default SourceFilterDropdown;
