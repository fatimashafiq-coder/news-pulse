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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search news..."
        className="px-4 py-3 rounded w-80 outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
