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
  return (
    <div className="flex gap-2">
      <input
        className="
    w-72
    px-5 py-3
    rounded-2xl
    border border-gray-400
    shadow-sm
    focus:outline-none
    focus:ring-2 focus:ring-black focus:border-black
    text-sm
    transition-all duration-200
    placeholder:text-gray-400
  "
        type="text"
        placeholder="Search news..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="px-4 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200 text-base tracking-wide"
        onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
