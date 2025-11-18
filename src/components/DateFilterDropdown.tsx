import { useState } from 'react';
import { type Article } from '../types/article';

interface DateFilterDropdownProps {
  articles: Article[];
  onFilter: (filtered: Article[]) => void;
}

const DateFilterDropdown = ({ articles, onFilter }: DateFilterDropdownProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert('Start date cannot be after end date');
      return;
    }
    end.setHours(23, 59, 59, 999);

    const filtered = articles.filter(article => {
      const articleDate = new Date(article.publishedAt);
      return articleDate >= start && articleDate <= end;
    });
    onFilter(filtered);
  };

  return (
    <div className="flex gap-4 items-center mb-6 flex-wrap">
      <input
       className="border"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}

      />
      <p className=" font-medium">to</p>
      <input
       className="border"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      
      />
      <button
       className="border"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default DateFilterDropdown;
