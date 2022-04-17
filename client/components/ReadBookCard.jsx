import React from "react";

export const ReadBookCard = ({ book }) => {
  const timeConverter = (datetime) => {
    const date = new Date(datetime);
    return date.toDateString();
  };

  return (
    <div className="flex justify-center my-2">
      <div className="flex flex-col w-[40rem] md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
        <img
          className=" w-full h-48 md:h-auto object-cover md:w-32 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={
            book.thumbnail
              ? book.thumbnail.thumbnail
              : "https://toppng.com/uploads/preview/book-cover-stock-photography-clip-art-stack-of-books-11563000775i3ijq3g55g.png"
          }
          alt=""
        />
        <div className="p-6 flex flex-col justify-start">
          <h5 className="text-gray-900 text-xl font-semibold mb-2">
            {book.title}
          </h5>
          <p className="text-gray-700 text-base mb-4">
            Author(s): {book.authors.join(", ")}
          </p>
          <p className="text-gray-600 text-sm">
            Date completed:{" "}
            {book.date_read ? timeConverter(book.date_read) : "not available"}
          </p>
          <button className="absolute top-0 right-0 text-gray-200 bg-red-500">
            X
          </button>
        </div>
      </div>
    </div>
  );
};
