import React , {useState}from 'react';

function ClubQuestions() {
  const [newQuestion, setNewQuestion] = useState('');

  return (
    <div>
      <label htmlFor="newQuestion">Post your question here...</label>
      <input type="text" />
    </div>
  );
}

export default ClubQuestions;
