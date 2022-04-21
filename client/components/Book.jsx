import React, { useState, useEffect } from 'react';

function Book({title, authors, bookId, currentlyReading, thumbnail}) {
  return (
    <>
      <span >{title}</span> 
      
      {!currentlyReading && <button className = "voteButton" type='button'>Vote to read next!</button>} <div> <img src={thumbnail} style={{'maxHeight': '208px'}}/></div>
    </>
  );
}

export default Book;