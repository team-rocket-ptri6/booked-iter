import React, { useState, useEffect } from 'react';
import Book from './Book';
import { useParams } from 'react-router-dom';

function BookList({ memberId, readingList, setUpdate, updateList }) {
  const params = useParams();
  // Can move this sort to the backend if there is time
  const [rank, setRank] = useState('');
  const [currentlyReading, setCurrentlyReading] = useState('');

  useEffect(() => {
    if (!Array.isArray(readingList)) return;
    const rankedList = readingList.filter(book => book.currently_reading === false).sort((a,b) => b.book_votes - a.book_votes);
    setRank(rankedList);
    setCurrentlyReading(readingList.filter(book => book.currently_reading)[0]);

  }, [readingList]);

  const readNow = (bookId) => {
    fetch(`http://localhost:8080/books/update/${bookId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clubId: params.id
      })
    }).then(response => response.json())
      .then(() => setUpdate(!updateList))
      .catch(err => console.warn(err));
  };

  const voteForBook = (bookId, memberId) => {
    console.log('memberId -->', memberId);
    fetch(`http://localhost:8080/books/vote/${bookId}/${memberId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clubId: params.id
      })
    }).then(response => response.json())
      .then(() => setUpdate(!updateList))
      .catch(err => console.warn(err));
  };

  return (

    <>
      {currentlyReading && typeof currentlyReading === 'object' &&
      <>
        <ul className='list-none'>
          <li>
            <label id="bookList">Currently Reading: </label>  <Book className ="clubName" title={currentlyReading.title} key={currentlyReading.book_id} bookId={currentlyReading.bookId} author={currentlyReading.authors} currentlyReading={true} thumbnail={currentlyReading.thumbnail ? currentlyReading.thumbnail.thumbnail : 'https://toppng.com/uploads/preview/book-cover-stock-photography-clip-art-stack-of-books-11563000775i3ijq3g55g.png'}/>
          </li>
        </ul>
      </>
      }

      {rank && rank.length > 0 &&
          <div>
            <p>What should we read next?</p>
            <ol>
              {rank.map(book => {
                return (<li key={book.google_book_id}>
                  <Book title={book.title} memberId={memberId} readNow={() => readNow(book.book_id)} votes={book.book_votes} voteForBook={() => voteForBook(book.book_id, memberId)} key={book.book_id} bookId={book.book_id} author={book.authors} currentlyReading={false} thumbnail={book.thumbnail ? book.thumbnail.thumbnail : 'https://toppng.com/uploads/preview/book-cover-stock-photography-clip-art-stack-of-books-11563000775i3ijq3g55g.png'}/>
                </li>);
              })}
            </ol> 
          </div>
      }
    </>
  );
};

export default BookList;