import React , {useState} from 'react';
import ClubInfo from './ClubInfo';
import ClubQuestions from './ClubQuestions';
import ClubBookList from './ClubBookList';

function ClubPage () {
    return (
        <div>
          <ClubInfo />
          <ClubQuestions />
          <ClubBookList />         
        </div>
    )
}

export default ClubPage;
