import React, { useState, useEffect } from 'react';

function Book({title, authors, bookId, currentlyReading, thumbnail, readNow}) {
  return (
    <>
      <span >{title}</span> 
      
      {!currentlyReading &&
      <>
        <button className = "voteButton" type='button'>Vote to read next!</button> <button onClick={readNow} className = "voteButton" type='button'>We are reading this!</button>
      </> 
      } <div> <img src={thumbnail} style={{'maxHeight': '208px'}}/></div>
    </>
  );
}

export default Book;