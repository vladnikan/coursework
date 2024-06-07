import React, { useState, ChangeEvent} from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Вызываем onSearch при каждом изменении текста
  };
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
