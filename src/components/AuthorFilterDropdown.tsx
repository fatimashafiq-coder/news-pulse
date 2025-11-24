import { useState } from "react";
import { TiTick } from "react-icons/ti";

interface AuthorFilterDropdownProps {
  authors: string[];
  onFilter: (author: string) => void;
}

const AuthorFilterDropdown = ({ authors, onFilter }: AuthorFilterDropdownProps) => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author);
    onFilter(author);
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
            {selectedAuthor || "All Authors"}
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
            <div
              onClick={() => handleAuthorChange("")}
              className="
                px-4
                py-3
                cursor-pointer
                hover:bg-blue-50
                transition-colors
                duration-150
                border-b
                border-gray-100
                flex
                items-center
                justify-between
              "
            >
              <span className="text-sm font-medium text-gray-700">All Authors</span>
              {!selectedAuthor && (
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
               <TiTick className="text-black w-6 h-6" />
                </svg>
              )}
            </div>

            {authors.map((author) => (
              <div
                key={author}
                onClick={() => handleAuthorChange(author)}
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
                <span className="text-sm text-gray-700 truncate">{author}</span>
                {selectedAuthor === author && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
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

export default AuthorFilterDropdown;
