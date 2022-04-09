import React, { useState } from 'react';

function SearchSuggestions({ title, author }) {
  return (
    <div className='bg-white border-none'>
      <span>{title} by {author}</span>
    </div>
  );
};

export default SearchSuggestions;