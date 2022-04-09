import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import  BookSearch from './BookSearch';

function BookPanel() {
  const auth = useAuth();
  const params = useParams();

  const [readingList, setReadingList] = useState('');
  const [bookIds, setBookIds] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/books/${params.id}`, {
      headers: {
        'Authorization':`Bearer ${auth.token}`,
      }
    }).then(response => response.json())
      .then(data => {
        setReadingList(data);
        const idList = [];
        for (let i = 0; i < data.books.length; i++) {
          idList.push(data.books[i].google_book_id);
        };
        setBookIds(idList);
      })
      .catch(err => console.warn(err));
  }, []);

  return (
    <>
      <BookSearch idList={bookIds}/>
    </>
  );
}

export default BookPanel;