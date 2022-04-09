import React, { useState } from 'react';

function SearchSuggestions({ title, author, googleBookId, save, inBookList }) {
  const [saved, setSaved] = useState(false);

  function saveSuggestion() {
    save(googleBookId);
    setSaved(true);
  }
  return (
    <div className='bg-white border-none'>
      <span>{title} by {author}</span> {saved || inBookList ? <span className="green">Book Saved! ✅</span> : <button type='button' onClick={saveSuggestion}>Save to reading list!</button>}
    </div>
  );
};

export default SearchSuggestions;