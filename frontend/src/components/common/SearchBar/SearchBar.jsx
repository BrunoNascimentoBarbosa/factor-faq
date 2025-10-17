import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchBar = ({ onSearch, placeholder = 'Pesquise sua dúvida...' }) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors text-base text-gray-900 placeholder:text-gray-400"
      />
    </div>
  );
};
