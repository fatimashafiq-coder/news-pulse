import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

const SearchInput = ({ onSearch }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    const query = inputValue.trim();
    if (query) {
      onSearch(query);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
       className="border rounded-2xl"
        type="text"
        placeholder="Search news..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
       className="border"
        onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
