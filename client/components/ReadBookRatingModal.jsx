import React from "react";
import { useAuth } from "../auth/authContext";

export const ReadBookRatingModal = ({
  book,
  setUpdateReadBooksList,
  updateReadBooksList,
  setShowRatingModal,
  showRatingModal,
}) => {
  const auth = useAuth();

  const submitNewRating = (e) => {
    //fetch request to update rating and notes
    e.preventDefault();
    const selectedRating = document.getElementById(
      "selectRatingBox" + book.book_id
    ).value;
    const newNotes = document.getElementById(
      "notesInputBox" + book.book_id
    ).value;

    if (selectedRating === "DEFAULT" || selectedRating === "Select Rating") {
      alert("Please enter a valid rating");
    }
    // fetch request body and options
    const body = {
      bookId: book.book_id,
      username: auth.username,
      newRating: selectedRating,
      newNotes: newNotes,
    };
    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("http://localhost:8080/books/rating", options)
      .then((response) => {
        setUpdateReadBooksList(!updateReadBooksList);
        setShowRatingModal(!showRatingModal);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className="flex flex-col p-6 rounded-lg shadow-lg bg-gray-50 h-60 w-48 my-2">
      <h5 className="my-1 text-sm">Add new rating</h5>
      <div className="flex my-0 w-full justify-center items-center">
        <h5 className="text-xs">New Rating: </h5>
        <select
          id={"selectRatingBox" + book.book_id}
          className="form-select form-select-sm
              appearance-none
              block
              w-full
              h-6
              px-2
              py-1
              text-xs
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label=".form-select-sm example"
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT">Select rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="flex justify-center">
        <div className="mb-5 xl:w-96">
          <label
            htmlFor={"notesInputBox" + book.book_id}
            className="form-label inline-block text-gray-700 text-xs"
          >
            New notes:
          </label>
          <textarea
            className="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-xs
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
            id={"notesInputBox" + book.book_id}
            rows="4"
            placeholder="Your notes"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="inline-block px-1 py-0.5 border-2 border-red-600 cursor-pointer
       text-red-600 font-medium text-xs leading-tight
        uppercase rounded hover:bg-black hover:bg-opacity-5
         focus:outline-none focus:ring-0
         transition duration-150 ease-in-out"
          onClick={(e) => submitNewRating(e)}
        >
          Submit New Rating
        </button>
      </div>
    </div>
  );
};
