import React, { useState, useEffect } from "react";

function Book({
  title,
  authors,
  bookId,
  memberId,
  currentlyReading,
  thumbnail,
  readNow,
  voteForBook,
  votes,
}) {
  return (
    <>
      <span className="font-semibold text-lg">{title}</span>
      {!currentlyReading ? (
        <>
          <button
            className="voteButton"
            onClick={() => voteForBook()}
            type="button"
          >
            Vote to read next!
          </button>{" "}
          <button onClick={readNow} className="voteButton" type="button">
            We are reading this!
          </button>
          <span>Votes: {votes} </span>
          <div className="flex">
            <img src={thumbnail} style={{ maxHeight: "208px" }} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <img src={thumbnail} style={{ maxHeight: "208px" }} />
        </div>
      )}
    </>
  );
}

export default Book;
