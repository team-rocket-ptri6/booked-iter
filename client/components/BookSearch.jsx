import React, { useState, useEffect } from 'react';
import SearchSuggestions from './SearchSuggestions';

function BookSearch() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState('');


  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };

  const fetchBooks = (query) => {
    if (query === '') return;
    query = query.replace(' ', '+');
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=5&sorting=relevance&projection=lite&fields=items(id,volumeInfo(title, authors,imageLinks(thumbnail)))`)
      .then(response => response.json())
      .then(data => setSuggestions(data.items))
      .catch(err => {
        setSuggestions('No suggestions found!');
        console.log(err);
      });
  };

  useEffect(() => {
    debounce(fetchBooks(search), 100);
  }, [search]);




  return (
    <>
      <input type="search" placeholder='Search for a new book to read!' size='30' aria-label='Search for a new book to read!' value={search} onChange={e => setSearch(e.target.value)}/>
      {Array.isArray(suggestions) && search != '' && suggestions.map(suggestion => {
        return <SearchSuggestions title={suggestion.volumeInfo.title} author={suggestion.volumeInfo.authors}  key={suggestion.id}/>;
      })}
    </>
  );
}

export default BookSearch;
