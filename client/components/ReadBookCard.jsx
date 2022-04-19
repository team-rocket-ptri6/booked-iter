import React, { useState } from "react";
import { useAuth } from "../auth/authContext";
import { ReadBookRatingModal } from "./ReadBookRatingModal";

export const ReadBookCard = ({
  book,
  readBooksList,
  setReadBooksList,
  setUpdateReadBooksList,
  updateReadBooksList,
}) => {
  const auth = useAuth();
  const timeConverter = (datetime) => {
    const date = new Date(datetime);
    return date.toDateString();
  };

  const [showRatingModal, setShowRatingModal] = useState(false);

  const deleteBook = (bookId) => {
    fetch(`http://localhost:8080/books/delete/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReadBooksList(readBooksList.filter((b) => b.book_id !== bookId));
        const idList = [];
        for (let i = 0; i < readBooksList.length; i++) {
          if (readBooksList[i]) idList.push(readBooksList[i].google_book_id);
        }
        setReadBookIds(idList);
        setUpdateReadBooksList(!updateReadBooksList);
      })
      .catch((err) => console.warn(err));
  };

  const openRatingModal = () => {};

  console.log("book object is:", book);

  return (
    <div className="flex justify-center">
      <div className="flex justify-center my-2">
        <div className="flex flex-col w-[60rem] md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
          <img
            className="w-full h-60 md:h-auto object-cover md:w-32 rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={
              book.thumbnail
                ? book.thumbnail.thumbnail
                : "https://toppng.com/uploads/preview/book-cover-stock-photography-clip-art-stack-of-books-11563000775i3ijq3g55g.png"
            }
            alt=""
          />
          {/* {"the text section of the card"} */}
          <div className="p-6 overflow-y-auto flex flex-col justify-start w-full h-60">
            <div className="flex justify-end items-end">
              <button
                className=" text-gray-200 bg-red-500 -mt-2 -mr-2 cursor-pointer"
                onClick={() => {
                  deleteBook(book.book_id);
                }}
              >
                X
              </button>
            </div>
            <h5 className="text-gray-900 text-xl font-semibold -mt-3 mb-0.5">
              {book.title}
            </h5>
            <p className="text-gray-700 text-base my-1">
              Author(s): {book.authors.join(", ")}
            </p>
            <p className="text-gray-600 text-sm my-1 h-5 ">
              Date completed:{" "}
              {book.date_read ? timeConverter(book.date_read) : "not available"}
            </p>
            <div className="flex items-center my-1 h-5">
              <p className="text-gray-600 text-sm">My rating: </p>
              {book.rating ? (
                <ul className="flex list-none">
                  {Array(book.rating)
                    .fill(1)
                    .map((n, index) => (
                      <li key={index + "star"}>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="heart"
                          className="w-3.5 text-red-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                          ></path>
                        </svg>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-sm ml-1">{" No rating yet"}</p>
              )}
            </div>
            {/* {"Average club rating text"} */}
            <div className="flex items-center my-1 h-5">
              <p className="text-gray-600 text-sm">Average club rating: </p>
              {book.avg_rating ? (
                <>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <p className="ml-2 text-sm font-bold text-gray-700">
                    {parseFloat(book.avg_rating).toFixed(2)}
                  </p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full "></span>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-700 underline hover:no-underline"
                  >
                    {book.num_rating} user ratings
                  </a>
                </>
              ) : (
                <p className="text-gray-600 text-sm ml-1">{" No rating yet"}</p>
              )}
            </div>
            <div className="flex -mt-2 mb-0 h-auto">
              <p className="text-gray-600 text-sm">My notes: </p>
              <p className="text-gray-600 text-sm ml-1">
                {book.review ? book.review : "No notes added"}
              </p>
            </div>
            <div className="flex justify-end my-1">
              <button
                type="button"
                className="inline-block px-1 py-0.5 border-1 border-blue-800 cursor-pointer
              text-blue-700 font-medium text-xs leading-tight uppercase rounded
              focus:outline-none focus:ring-0
              transition duration-150 ease-in-out"
                onClick={() => {
                  setShowRatingModal(!showRatingModal);
                }}
              >
                Edit my rating
              </button>
            </div>
          </div>
        </div>
      </div>
      {showRatingModal ? (
        <ReadBookRatingModal
          book={book}
          setUpdateReadBooksList={setUpdateReadBooksList}
          updateReadBooksList={updateReadBooksList}
          setShowRatingModal={setShowRatingModal}
          showRatingModal={showRatingModal}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
