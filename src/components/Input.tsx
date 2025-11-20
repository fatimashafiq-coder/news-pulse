import { useState } from "react";
import type { InputHTMLAttributes } from "react";
interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void;
  label?: string;
  error?: string;
}

const SearchInput = ({
  onSearch,
  label,
  error,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    const query = inputValue.trim();
    if (query) {
      onSearch(query);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
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
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default SearchInput;
