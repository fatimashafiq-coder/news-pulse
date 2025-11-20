import { useState } from "react";

interface AuthorFilterDropdownProps {
  authors: string[];
  onFilter: (author: string) => void;
}

const AuthorFilterDropdown = ({ authors, onFilter }: AuthorFilterDropdownProps) => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>("All");
  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const author = e.target.value;
    setSelectedAuthor(author);
    onFilter(author);
  };

  return (
      <select
        className="border rounded m-2.5 mb-2"
        value={selectedAuthor}
        onChange={handleAuthorChange}
      >
        <option value="All">All Authors</option>
        {authors.map((author) => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>
  );
};

export default AuthorFilterDropdown;
