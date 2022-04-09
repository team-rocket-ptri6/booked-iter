import React, { useState, useMemo } from 'react';

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
    query = query.replace(' ', '+');
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=5&sorting=relevance&projection=lite&fields=items(id,volumeInfo(title, authors,imageLinks(thumbnail)))`)
      .then(response => response.json())
      .then(data => setSuggestions(data))
      .catch(err => {
        setSuggestions('No suggestions found!');
        console.log(err);
      });
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    debounce(fetchBooks(search), 200);
  };

  return (
    <>
      <input type="search" placeholder='Search for a new book to read!' size='30' aria-label='Search for a new book to read!' value={search} onChange={e => updateSearch(e)}/>
    </>
  );
}

export default BookSearch;
