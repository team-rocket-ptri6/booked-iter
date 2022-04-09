import React, { useState, useEffect } from 'react';

function Book({title, authors, bookId, currentlyReading, thumbnail}) {
  return (
    <>
      {!currentlyReading && <button type='button'>Vote to read next!</button>} <span>{title}</span> <img src={thumbnail} style={{'maxHeight': '208px'}}/>
    </>
  );
}

export default Book;