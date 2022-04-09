import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import Book from './Book';

function BookList({ readingList }) {
  // Can move this sort to the backend if there is time
  const [rank, setRank] = useState('');
  const [currentlyReading, setCurrentlyReading] = useState('');

  useEffect(() => {
    if (!Array.isArray(readingList)) return;
    const rankedList = readingList.filter(book => book.currently_reading === false).sort((a,b) => b.book_votes - a.book_votes);
    setRank(rankedList);
    setCurrentlyReading(readingList.filter(book => book.currently_reading)[0]);

  }, [readingList]);

  return (

    <>
      {currentlyReading && currentlyReading.length > 0 &&
      <>
        <label id="bookList">Currently Reading: </label>  <Book className ="clubName" title={currentlyReading.title} key={currentlyReading.bookId} bookId={currentlyReading.bookId} author={currentlyReading.authors} currentlyReading={true} thumbnail={currentlyReading.thumbnail ? currentlyReading.thumbnail.thumbnail : 'https://toppng.com/uploads/preview/book-cover-stock-photography-clip-art-stack-of-books-11563000775i3ijq3g55g.png'}/>
      </>
      }

      {rank && rank.length > 0 &&
          <div>
            <p>What should we read next?</p>
            <ol>
              {rank.map(book => {
                return (<li key={book.google_book_id}>
                  <Book title={book.title} key={book.bookId} bookId={book.bookId} author={book.authors} currentlyReading={false} thumbnail={book.thumbnail ? book.thumbnail.thumbnail : 'https://toppng.com/uploads/preview/book-cover-stock-photography-clip-art-stack-of-books-11563000775i3ijq3g55g.png'}/>
                </li>);
              })}
            </ol> 
          </div>
      }
    </div>
  );
};

export default BookList;