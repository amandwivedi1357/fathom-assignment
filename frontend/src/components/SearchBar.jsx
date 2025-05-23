import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-white p-4 pl-10 text-gray-900 focus:border-marine-medium focus:ring-marine-medium"
          placeholder="Search for ships by name, IMO number, or type..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2.5 top-2 rounded-lg bg-marine-medium px-4 py-2 text-sm font-medium text-white hover:bg-marine-dark focus:outline-none focus:ring-4 focus:ring-marine-light"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;