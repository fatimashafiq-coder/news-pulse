import { useState } from "react";
import { ArticleSource } from "../types/article";

interface SourceFilterDropdownProps {
  selectedSource?: string;
  onSelect: (source: string) => void;
}

const sources = ["All Sources", ...Object.values(ArticleSource)];

const SourceFilterDropdown = ({ selectedSource = "All", onSelect }: SourceFilterDropdownProps) => {
  const [currentSource, setCurrentSource] = useState<string>(selectedSource);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (source: string) => {
    setCurrentSource(source);
    onSelect(source);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="relative w-full sm:w-64">
        <button
          onClick={toggleDropdown}
          className="
            w-full
            px-4 py-3
            rounded-xl
            border border-gray-300
            bg-white
            shadow-sm
            hover:shadow-md
            focus:outline-none
            focus:ring-2
            focus:ring-black
            focus:border-black
            transition-all
            duration-200
            text-sm
            text-gray-700
            font-medium
            flex
            items-center
            justify-between
            cursor-pointer
            hover:bg-gray-50
          "
        >
          <span className="truncate">
            {currentSource === "null" ? "All Sources" : currentSource}
          </span>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path  strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="
            absolute
            top-full
            left-0
            right-0
            mt-2
            bg-white
            border
            border-gray-200
            rounded-xl
            shadow-lg
            z-10
            max-h-60
            overflow-y-auto
            animate-fadeIn
          ">
            {sources.map((source) => (
              <div
                key={source}
                onClick={() => handleSelect(source)}
                className="
                  px-4
                  py-3
                  cursor-pointer
                  hover:bg-blue-50
                  transition-colors
                  duration-150
                  border-b
                  border-gray-100
                  last:border-b-0
                  flex
                  items-center
                  justify-between
                "
              >
                <span className="text-sm text-gray-700 truncate">
                  {source}
                </span>
              </div>
            ))}
          </div>
        )}
        {isOpen && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SourceFilterDropdown;
