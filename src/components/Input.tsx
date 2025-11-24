import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void;
  error?: string;
}

const SearchInput = ({ onSearch, error, }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    const query = inputValue.trim();
    if (query) {
      onSearch(query);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col gap-1 p-4 sm:p-6">
      <div className="flex justify-end">
        <div className="relative w-full sm:w-64">
          <input
            className="
                       w-full
                       px-3 sm:px-5 py-2 sm:py-3
                       rounded-full
                       border border-gray-400
                       shadow-sm
                       focus:outline-none
                       focus:ring-2 focus:ring-black focus:border-black
                       text-xs sm:text-sm
                       transition-all duration-200
                     placeholder:text-gray-400
                       pr-10
                       "
            type="text"
           placeholder="Search news..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              p-2
              bg-black
              text-white
              rounded-full
              hover:bg-gray-800
              transition-colors duration-200
              flex items-center
            "
          >
            <FaSearch className="cursor-pointer w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default SearchInput;
