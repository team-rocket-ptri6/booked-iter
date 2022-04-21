import React, { useState, useEffect } from "react";
import SearchSuggestions from "./SearchSuggestions";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/authContext";

function BookSearch({ idList, setUpdate, updateList }) {
  const params = useParams();
  const auth = useAuth();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState("");

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
    if (query === "") return;
    query = query.replace(" ", "+");
    return fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=10&sorting=relevance&projection=lite&fields=items(id,volumeInfo(title, authors,imageLinks(thumbnail)))`
    )
      .then((response) => response.json())
      .then((data) => setSuggestions(data.items))
      .catch((err) => {
        setSuggestions("No suggestions found!");
        console.log(err);
      });
  };

  useEffect(() => {
    debounce(fetchBooks(search), 100);
  }, [search]);

  const saveBook = (bookId) => {
    const body = JSON.stringify({
      clubId: params.id,
      googleBookId: bookId,
    });

    fetch("http://localhost:8080/books", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then(() => setUpdate(!updateList))
      .catch((err) => console.warn(err));
  };

  return (
    <>
      <div id="searchCenter">
        <h2 style={{ margin: "auto" }}> Search for a new book to read! </h2>
      </div>

      <div id="searchCenter">
        <input
          className="input"
          type="search"
          id="search"
          size="30"
          aria-label="Search for a new book to read!"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {Array.isArray(suggestions) &&
        search != "" &&
        suggestions.map((suggestion) => {
          let inBookList = false;
          if (idList.includes(suggestion.id)) inBookList = true;
          return (
            <SearchSuggestions
              save={saveBook}
              inBookList={inBookList}
              title={suggestion.volumeInfo.title}
              author={suggestion.volumeInfo.authors}
              key={suggestion.id}
              googleBookId={suggestion.id}
            />
          );
        })}
      <br />
    </>
  );
}

export default BookSearch;
