import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import BookList from './BookList';
import  BookSearch from './BookSearch';

function BookPanel() {
  const auth = useAuth();
  const params = useParams();

  const [readingList, setReadingList] = useState('');
  const [bookIds, setBookIds] = useState('');
  const [updateList, setUpdate] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/books/${params.id}`, {
      headers: {
        'Authorization':`Bearer ${auth.token}`,
      }
    }).then(response => response.json())
      .then(data => {
        setReadingList(data.books);
        const idList = [];
        for (let i = 0; i < data.books.length; i++) {
          idList.push(data.books[i].google_book_id);
        };
        setBookIds(idList);
      })
      .catch(err => console.warn(err));
  }, [ ,updateList]);

  return (
    <div >
      <div className="list">
        <BookSearch idList={bookIds} setUpdate={setUpdate} updateList={updateList}/>
      </div>
      <br/>
      <div className="list">
        {(readingList.length >= 1) && <BookList readingList={readingList} setUpdate={setUpdate} updateList={updateList}  />}
      </div>
    </div>
  );
}

export default BookPanel;