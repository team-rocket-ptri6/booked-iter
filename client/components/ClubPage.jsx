import React, { useState } from 'react';
import ClubInfo from './ClubInfo';
import ClubQuestions from './ClubQuestions';
import ClubBookList from './ClubBookList';



function ClubPage() {
  const [isMember, setIsMember] = useState(true);

  return (
    
    <div>
      {!isMember ? 'We\'re sorry, but you are not a member of this club' :
     ( <span>
      <ClubInfo />
      {/* <ClubQuestions /> */}
      {/* <ClubBookList /> */}
      </span>)
      } 
    </div>
  );
}

export default ClubPage;
