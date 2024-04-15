import React, { useState } from 'react';
import "./styles.css"



export function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const performSearch = () => {
  }

  return (
    <div className='search-container'>
      <input 
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder='Search...'
      />
      <button onClick={performSearch}>Search</button>
      <div>
      {searchResults.map((result, index) => (
        <div key={index}>{result}</div>
      ))}
      </div>
    </div>
  );
}


