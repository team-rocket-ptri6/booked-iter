import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext';

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
      <div>{currentlyReading.title}</div>
    </>
  );
};

export default BookList;