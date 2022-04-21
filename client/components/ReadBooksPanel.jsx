import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";
import { useParams } from "react-router-dom";

import { ReadBookCard } from "./ReadBookCard";

export const ReadBooksPanel = () => {
  const params = useParams();
  const auth = useAuth();

  const [readBooksList, setReadBooksList] = useState("");
  const [readBookIds, setReadBookIds] = useState("");
  const [updateReadBooksList, setUpdateReadBooksList] = useState(false);
  const [isLoadingReadBooks, setisLoadingReadBooks] = useState(true);

  useEffect(() => {
    // console.log("auth username is: ", auth.username);
    fetch(`http://localhost:8080/books/rating/${params.id}&${auth.username}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const idList = [];
        for (let i = 0; i < data.books.length; i++) {
          idList.push(data.books[i].google_book_id);
        }
        setReadBooksList(
          data.books
            .filter((b) => b.has_read)
            .sort((a, b) => {
              return a.book_id - b.book_id;
            })
        );
        setReadBookIds(idList);
        setisLoadingReadBooks(false);
      })
      .catch((err) => console.warn(err));
  }, [, updateReadBooksList]);

  return (
    <div>
      <div className=""></div>
      {isLoadingReadBooks ? (
        <div className="flex justify-center items-center">
          <p className="text-xl font-semibold text-gray-700">
            Fetching the list of read books, please wait ...
          </p>
        </div>
      ) : (
        readBooksList.map((readBook, index) => {
          return (
            <ReadBookCard
              key={readBook.book_id}
              book={readBook}
              setReadBooksList={setReadBooksList}
              readBooksList={readBooksList}
              setUpdateReadBooksList={setUpdateReadBooksList}
              updateReadBooksList={updateReadBooksList}
            ></ReadBookCard>
          );
        })
      )}
    </div>
  );
};
