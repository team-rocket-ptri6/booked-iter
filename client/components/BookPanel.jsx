import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import BookList from "./BookList";
import BookSearch from "./BookSearch";

function BookPanel({ memberId }) {
  const auth = useAuth();
  const params = useParams();

  const [readingList, setReadingList] = useState("");
  const [bookIds, setBookIds] = useState("");
  const [updateList, setUpdate] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    // abortcontroller is used to stop the fetch request if it has not been resolved when the component unmounts
    // this avoids us from changing state when component is no longer mounted
    let controller = new AbortController();
    let signal = controller.signal;
    const options = {
      signal,
    };
    fetch(`http://localhost:8080/books/read/${params.id}`, options)
      .then((response) => response.json())
      .then((data) => {
        // console.log("memberId -->", memberId);
        setReadingList(data.books);
        const idList = [];
        // console.log("in Book Panel, returned data is :", data);
        for (let i = 0; i < data.books.length; i++) {
          idList.push(data.books[i].google_book_id);
        }
        setBookIds(idList);
        setisLoading(false);
      })
      .catch((err) => console.warn(err));
    // this function will run when component unmounts
    return () => {
      controller.abort();
    };
  }, [, updateList]);

  return (
    <div>
      <div className="list">
        <BookSearch
          idList={bookIds}
          setUpdate={setUpdate}
          updateList={updateList}
        />
      </div>
      <br />
      <div className="list">
        {isLoading && (
          <div className="flex justify-center items-center">
            <p className="text-xl font-semibold text-gray-700">
              Book list is loading, please wait...
            </p>
          </div>
        )}
        {readingList.length >= 1 && (
          <BookList
            memberId={memberId}
            readingList={readingList}
            setUpdate={setUpdate}
            updateList={updateList}
          />
        )}
      </div>
    </div>
  );
}

export default BookPanel;
