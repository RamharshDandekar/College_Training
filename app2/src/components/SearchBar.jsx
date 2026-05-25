import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </div>
    </form>
  );
}
