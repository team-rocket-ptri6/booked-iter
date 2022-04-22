import React, { useState, useEffect } from "react";
import Book from "./Book";
import { useParams } from "react-router-dom";

function BookList({ memberId, readingList, setUpdate, updateList }) {
  const params = useParams();
  // Can move this sort to the backend if there is time
  const [rank, setRank] = useState('');
  const [currentlyReading, setCurrentlyReading] = useState('');

  useEffect(() => {
    if (!Array.isArray(readingList)) return;
    const rankedList = readingList
      .filter(
        (book) => book.currently_reading === false && book.has_read === false
      )
      .sort((a, b) => b.book_votes - a.book_votes);
    setRank(rankedList);
    setCurrentlyReading(
      readingList.filter((book) => book.currently_reading)[0]
    );
    // setisLoading(!isLoading);
  }, [readingList]);

  const updateBooks = (bookId, action) => {
    let urlModifier;
    if (action === "setCurrentlyReading") urlModifier = "";
    if (action === "markAsRead") urlModifier = "Read";

    fetch(`http://localhost:8080/books/update${urlModifier}/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clubId: params.id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setUpdate(!updateList);
      })
      .catch((err) => console.warn(err));
  };

  const voteForBook = (bookId, memberId) => {
    console.log("onClick voteForBook memberId -->", memberId);
    fetch(`http://localhost:8080/books/vote/${bookId}/${memberId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clubId: params.id,
      }),
    })
      .then((response) => response.json())
      .then(() => setUpdate(!updateList))
      .catch((err) => console.warn(err));
  };

  return (
    <>
      {currentlyReading && typeof currentlyReading === "object" && (
        <div className="flex flex-col items-center justify-center">
          <ul className="list-none">
            <li>
              <label id="bookList">Currently Reading: </label>{' '}
              <Book
                className="clubName"
                title={currentlyReading.title}
                key={currentlyReading.book_id}
                bookId={currentlyReading.bookId}
                author={currentlyReading.authors}
                currentlyReading={true}
                thumbnail={
                  currentlyReading.thumbnail
                    ? currentlyReading.thumbnail.thumbnail
                    : "https://toppng.com/uploads/preview/book-cover-stock-photography-clip-art-stack-of-books-11563000775i3ijq3g55g.png"
                }
              />
            </li>
          </ul>
          <button
            type="button"
            className="inline-block my-1 ml-2 w-2/12 px-1 py-1 bg-blue-500 text-white
        font-medium text-sm leading-tight rounded shadow-md
        hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg
        focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-lg
        transition duration-150 ease-in-out"
            onClick={() => {
              updateBooks(currentlyReading.book_id, "markAsRead");
            }}
          >
            Mark book as read
          </button>
        </div>
      )}

      {rank && rank.length > 0 && (
        <div>
          <p className="text-xl ml-3">What should we read next?</p>
          <ol>
            {rank.map((book) => {
              return (
                <li key={book.google_book_id}>
                  <Book
                    title={book.title}
                    memberId={memberId}
                    // readNow={() => readNow(book.book_id)}
                    votes={book.book_votes}
                    readNow={() =>
                      updateBooks(book.book_id, "setCurrentlyReading")
                    }
                    key={book.book_id}
                    voteForBook={() => voteForBook(book.book_id, memberId)}
                    bookId={book.book_id}
                    author={book.authors}
                    currentlyReading={false}
                    thumbnail={
                      book.thumbnail
                        ? book.thumbnail.thumbnail
                        : "https://toppng.com/uploads/preview/book-cover-stock-photography-clip-art-stack-of-books-11563000775i3ijq3g55g.png"
                    }
                  />
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </>
  );
}

export default BookList;
